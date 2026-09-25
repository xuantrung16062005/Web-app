import { NextRequest, NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "Chưa cấu hình ADMIN_PASSWORD trên server." },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  if (body.password !== adminPassword) {
    return NextResponse.json({ error: "Mật khẩu không đúng." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
