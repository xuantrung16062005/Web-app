"use client";

import { FormEvent, useEffect, useState } from "react";
import { formatPrice } from "@/data/menu";

interface Booking {
  id: number;
  name: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  guests: number;
  area: string;
  note: string | null;
  created_at: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  name: string;
  phone: string;
  fulfillment: string;
  address: string | null;
  note: string | null;
  items_json: string;
  total: number;
  created_at: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<"bookings" | "orders">("bookings");

  async function loadData() {
    const res = await fetch("/api/admin/data");
    if (res.status === 401) {
      setAuthed(false);
      setChecking(false);
      return;
    }
    const data = await res.json();
    setBookings(data.bookings || []);
    setOrders(data.orders || []);
    setAuthed(true);
    setChecking(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error || "Đăng nhập thất bại.");
      return;
    }
    setPassword("");
    await loadData();
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  if (checking) {
    return <div className="mx-auto max-w-md px-4 py-24 text-center text-sm text-brown-500">Đang tải...</div>;
  }

  if (!authed) {
    return (
      <section className="mx-auto max-w-sm px-4 py-24 sm:px-6">
        <h1 className="font-serif text-xl font-semibold text-brown-900">Đăng nhập quản trị</h1>
        <form onSubmit={onLogin} className="mt-6 space-y-4 rounded-2xl border border-brown-100 bg-cream-50 p-6">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brown-700">
              Mật khẩu quản trị
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-brown-100 bg-cream-50 px-3 py-2.5 text-sm text-brown-900 focus:border-maroon-600 focus:outline-none"
            />
          </div>
          {loginError && <p className="text-sm text-maroon-600">{loginError}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-cream-50 hover:bg-maroon-700"
          >
            Đăng nhập
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-brown-900">Trang quản trị</h1>
        <button onClick={onLogout} className="text-sm font-semibold text-maroon-600 hover:text-maroon-700">
          Đăng xuất
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        <TabButton active={tab === "bookings"} onClick={() => setTab("bookings")}>
          Đặt bàn ({bookings.length})
        </TabButton>
        <TabButton active={tab === "orders"} onClick={() => setTab("orders")}>
          Đơn hàng ({orders.length})
        </TabButton>
      </div>

      {tab === "bookings" ? (
        <div className="overflow-x-auto rounded-2xl border border-brown-100 bg-cream-50">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-brown-100 text-xs uppercase text-brown-500">
              <tr>
                <th className="p-3">Khách</th>
                <th className="p-3">SĐT</th>
                <th className="p-3">Ngày giờ</th>
                <th className="p-3">Số người</th>
                <th className="p-3">Khu vực</th>
                <th className="p-3">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brown-100">
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="p-3 font-medium text-brown-900">{b.name}</td>
                  <td className="p-3 text-brown-700">{b.phone}</td>
                  <td className="p-3 text-brown-700">{b.booking_date} {b.booking_time}</td>
                  <td className="p-3 text-brown-700">{b.guests}</td>
                  <td className="p-3 text-brown-700">{b.area}</td>
                  <td className="p-3 text-brown-500">{b.note || "-"}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-brown-500">Chưa có lượt đặt bàn nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => {
            const items: OrderItem[] = JSON.parse(o.items_json);
            return (
              <div key={o.id} className="rounded-2xl border border-brown-100 bg-cream-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-brown-900">#{o.id} — {o.name} ({o.phone})</p>
                  <p className="text-sm font-semibold text-maroon-600">{formatPrice(o.total)}</p>
                </div>
                <p className="mt-1 text-xs text-brown-500">
                  {o.fulfillment === "giao-tan-noi" ? `Giao tận nơi: ${o.address}` : "Nhận tại quán"}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-brown-700">
                  {items.map((i) => (
                    <li key={i.id}>{i.name} × {i.quantity}</li>
                  ))}
                </ul>
              </div>
            );
          })}
          {orders.length === 0 && (
            <p className="rounded-2xl border border-brown-100 bg-cream-50 p-6 text-center text-brown-500">
              Chưa có đơn hàng nào.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium ${
        active ? "border-maroon-600 bg-maroon-600 text-cream-50" : "border-brown-100 bg-cream-50 text-brown-700"
      }`}
    >
      {children}
    </button>
  );
}
