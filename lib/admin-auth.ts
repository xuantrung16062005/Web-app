import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "cafe_admin_session";

function getSecret() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function signToken(): string {
  const secret = getSecret();
  return crypto.createHmac("sha256", secret).update("admin-session").digest("hex");
}

export async function createAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, signToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!getSecret()) return false;
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return !!value && value === signToken();
}
