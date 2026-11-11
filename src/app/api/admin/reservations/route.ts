import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_PASSCODES = ["STASH2026", "85990", "stash-admin-key-2026"];

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const adminKey = req.headers.get("x-admin-key");
  const cookieKey = req.cookies.get("stash_admin_key")?.value;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    if (ADMIN_PASSCODES.includes(token)) return true;
  }

  if (adminKey && ADMIN_PASSCODES.includes(adminKey.trim())) return true;
  if (cookieKey && ADMIN_PASSCODES.includes(cookieKey.trim())) return true;

  return false;
}

const DATA_FILE = path.join(process.cwd(), "data", "reservations.json");

interface ReservationRecord {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes?: string;
  status: "pending" | "confirmed" | "seated" | "completed" | "cancelled";
  table?: string;
}

function readReservations(): ReservationRecord[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading reservations file:", err);
    return [];
  }
}

function writeReservations(data: ReservationRecord[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET: Fetch reservations & computed hostess metrics
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Secret Stash Admin passcode required." },
      { status: 401 }
    );
  }

  const reservations = readReservations();

  // Compute metrics
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const todayReservations = reservations.filter((r) => r.date === todayStr);

  const totalCoversToday = todayReservations
    .filter((r) => r.status !== "cancelled")
    .reduce((sum, r) => sum + (parseInt(r.guests, 10) || 2), 0);

  const pendingCount = reservations.filter((r) => r.status === "pending").length;
  const confirmedCount = reservations.filter((r) => r.status === "confirmed").length;
  const seatedCount = reservations.filter((r) => r.status === "seated").length;
  const completedCount = reservations.filter((r) => r.status === "completed").length;
  const cancelledCount = reservations.filter((r) => r.status === "cancelled").length;

  return NextResponse.json({
    success: true,
    metrics: {
      totalBookings: reservations.length,
      todayBookingsCount: todayReservations.length,
      totalCoversToday,
      pendingCount,
      confirmedCount,
      seatedCount,
      completedCount,
      cancelledCount,
    },
    reservations: reservations.sort((a, b) => {
      // Sort primarily by date then time
      const dateA = `${a.date} ${a.time}`;
      const dateB = `${b.date} ${b.time}`;
      return dateA.localeCompare(dateB);
    }),
  });
}

// PATCH: Update reservation status or assigned table
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, status, table, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing reservation ID." },
        { status: 400 }
      );
    }

    const reservations = readReservations();
    const index = reservations.findIndex((r) => r.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Reservation not found." },
        { status: 404 }
      );
    }

    if (status) reservations[index].status = status;
    if (table !== undefined) reservations[index].table = table;
    if (notes !== undefined) reservations[index].notes = notes;

    writeReservations(reservations);

    return NextResponse.json({
      success: true,
      message: `Reservation ${id} updated successfully.`,
      reservation: reservations[index],
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to update reservation: " + String(err) },
      { status: 500 }
    );
  }
}

// POST: Add manual phone or walk-in reservation from host desk
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { name, phone, email, date, time, guests, occasion, notes, table, status } = body;

    if (!name || !phone || !date || !time) {
      return NextResponse.json(
        { success: false, message: "Name, phone, date, and time are required." },
        { status: 400 }
      );
    }

    const newReservation: ReservationRecord = {
      id: `res-host-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      name,
      phone,
      email: email || "",
      date,
      time,
      guests: String(guests || "2"),
      occasion: occasion || "Dinner Gathering",
      notes: notes || "",
      status: status || "confirmed",
      table: table || "Unassigned",
    };

    const reservations = readReservations();
    reservations.push(newReservation);
    writeReservations(reservations);

    return NextResponse.json({
      success: true,
      message: "Reservation logged into host registry.",
      reservation: newReservation,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to create reservation: " + String(err) },
      { status: 500 }
    );
  }
}

// DELETE: Remove a test or obsolete booking
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing reservation ID." },
        { status: 400 }
      );
    }

    const reservations = readReservations();
    const filtered = reservations.filter((r) => r.id !== id);

    if (filtered.length === reservations.length) {
      return NextResponse.json(
        { success: false, message: "Reservation not found." },
        { status: 404 }
      );
    }

    writeReservations(filtered);

    return NextResponse.json({
      success: true,
      message: `Reservation ${id} deleted.`,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to delete reservation: " + String(err) },
      { status: 500 }
    );
  }
}
