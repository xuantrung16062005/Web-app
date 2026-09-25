import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

interface BookingPayload {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  area: string;
  note?: string;
}

export async function POST(req: NextRequest) {
  let body: BookingPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { name, phone, date, time, guests, area, note } = body;

  if (!name?.trim() || !phone?.trim() || !date || !time || !area?.trim() || !guests) {
    return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin bắt buộc." }, { status: 400 });
  }

  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO bookings (name, phone, booking_date, booking_time, guests, area, note)
     VALUES (@name, @phone, @date, @time, @guests, @area, @note)`
  );

  const result = stmt.run({
    name: name.trim(),
    phone: phone.trim(),
    date,
    time,
    guests: Number(guests),
    area: area.trim(),
    note: note?.trim() || null,
  });

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
