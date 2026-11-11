import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

// Zod Schema for Reservation Validation
const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  phone: z.string().min(8, "Please enter a valid phone number").max(20),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  date: z.string().min(8, "Date is required"),
  time: z.string().min(3, "Time is required"),
  guests: z.string().min(1, "Please select party size"),
  occasion: z.string().optional().default("Dinner Gathering"),
  notes: z.string().max(500).optional().default(""),
  honeypot: z.string().optional(),
});

// Simple in-memory rate limiting map (IP -> timestamp array)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local";

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many reservation attempts. Please call us directly or try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot check (anti-spam)
    if (body.honeypot && body.honeypot.trim() !== "") {
      // Silently accept bot submission
      return NextResponse.json({ success: true, message: "Reservation received." });
    }

    // Validate with Zod
    const validationResult = reservationSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json(
        { success: false, message: errorMsg },
        { status: 400 }
      );
    }

    const sanitizedData = {
      id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      table: "Unassigned",
      ...validationResult.data,
    };

    // Store reservation to a local JSON log file for persistence
    try {
      const storageDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
      }
      const filePath = path.join(storageDir, "reservations.json");
      let existing: unknown[] = [];
      if (fs.existsSync(filePath)) {
        try {
          existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch {
          existing = [];
        }
      }
      existing.push(sanitizedData);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    } catch (storageErr) {
      console.warn("Storage write warning:", storageErr);
      // Non-fatal, continue response
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your table reservation request has been received by our host desk.",
        reservationId: sanitizedData.id,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Reservation API Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please call +91 85990 00029." },
      { status: 500 }
    );
  }
}
