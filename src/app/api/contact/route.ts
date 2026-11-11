import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().default(""),
  message: z.string().min(5, "Message must be at least 5 characters").max(1000),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ success: false, message: errorMsg }, { status: 400 });
    }

    const entry = {
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...validation.data,
    };

    try {
      const storageDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
      }
      const filePath = path.join(storageDir, "contact_messages.json");
      let existing: unknown[] = [];
      if (fs.existsSync(filePath)) {
        try {
          existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch {
          existing = [];
        }
      }
      existing.push(entry);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    } catch (storageErr) {
      console.warn("Storage write warning:", storageErr);
    }

    return NextResponse.json(
      { success: true, message: "Thank you. Your message has been sent to our team." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
