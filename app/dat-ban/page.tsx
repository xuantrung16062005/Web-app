"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";

const AREAS = ["Khu ngoài trời (View đẹp)", "Khu trong nhà", "Khu vực riêng tư", "Sân thượng hoàng hôn"];

export default function BookingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("loading");
    setError(null);

    const form = new FormData(formEl);
    const payload = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      date: String(form.get("date") || ""),
      time: String(form.get("time") || ""),
      guests: Number(form.get("guests") || 1),
      area: String(form.get("area") || ""),
      note: String(form.get("note") || ""),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Đặt bàn thất bại, vui lòng thử lại.");
      }
      setStatus("success");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Đặt bàn"
        title="Đặt bàn trước"
        description="Giữ chỗ trước để có vị trí đẹp nhất cho buổi hẹn của bạn."
      />

      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {status === "success" ? (
          <div className="rounded-2xl border border-brown-100 bg-cream-50 p-8 text-center">
            <h2 className="font-serif text-xl font-semibold text-brown-900">Đặt bàn thành công!</h2>
            <p className="mt-2 text-sm text-brown-700">
              Quán sẽ liên hệ xác nhận với bạn qua số điện thoại đã cung cấp.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-full bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-cream-50 hover:bg-maroon-700"
            >
              Đặt bàn khác
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-brown-100 bg-cream-50 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Họ tên" name="name" required placeholder="Nguyễn Văn A" />
              <Field label="Số điện thoại" name="phone" type="tel" required placeholder="09xx xxx xxx" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ngày đặt" name="date" type="date" required />
              <Field label="Giờ đặt" name="time" type="time" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Số người" name="guests" type="number" min={1} defaultValue={2} required />
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brown-700">
                  Khu vực
                </label>
                <select
                  name="area"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-brown-100 bg-cream-50 px-3 py-2.5 text-sm text-brown-900 focus:border-maroon-600 focus:outline-none"
                >
                  <option value="" disabled>Chọn khu vực</option>
                  {AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brown-700">
                Ghi chú thêm (nếu có)
              </label>
              <textarea
                name="note"
                rows={3}
                placeholder="Ví dụ: Ghế gần lan can, sinh nhật..."
                className="w-full rounded-xl border border-brown-100 bg-cream-50 px-3 py-2.5 text-sm text-brown-900 focus:border-maroon-600 focus:outline-none"
              />
            </div>

            {error && <p className="text-sm text-maroon-600">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-maroon-600 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-maroon-700 disabled:opacity-60"
            >
              {status === "loading" ? "Đang gửi..." : "Đặt bàn ngay"}
            </button>
          </form>
        )}
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  min,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  defaultValue?: string | number;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brown-700">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-brown-100 bg-cream-50 px-3 py-2.5 text-sm text-brown-900 focus:border-maroon-600 focus:outline-none"
      />
    </div>
  );
}
