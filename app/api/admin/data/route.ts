import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const db = getDb();
  const bookings = db
    .prepare(`SELECT * FROM bookings ORDER BY created_at DESC LIMIT 100`)
    .all();
  const orders = db
    .prepare(`SELECT * FROM orders ORDER BY created_at DESC LIMIT 100`)
    .all();

  return NextResponse.json({ bookings, orders });
}
