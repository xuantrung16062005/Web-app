"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { useCart } from "@/lib/cart-context";
import { menuItems, formatPrice } from "@/data/menu";

export default function CheckoutPage() {
  const { lines, totalPrice, clear } = useCart();
  const [fulfillment, setFulfillment] = useState<"tai-quan" | "giao-tan-noi">("tai-quan");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  const resolved = lines
    .map((l) => {
      const item = menuItems.find((m) => m.id === l.itemId);
      return item ? { ...l, item } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      fulfillment,
      address: String(form.get("address") || ""),
      note: String(form.get("note") || ""),
      items: lines,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Đặt hàng thất bại, vui lòng thử lại.");
      setOrderId(data.id);
      setStatus("success");
      clear();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
    }
  }

  if (status === "success") {
    return (
      <>
        <PageHero eyebrow="Thanh toán" title="Đặt hàng thành công!" />
        <section className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
          <p className="text-sm text-brown-700">
            Mã đơn hàng của bạn là <span className="font-semibold text-maroon-600">#{orderId}</span>.
            Vui lòng thanh toán tại quầy khi nhận đồ uống.
          </p>
          <Link
            href="/menu"
            className="mt-6 inline-block rounded-full bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-cream-50 hover:bg-maroon-700"
          >
            Tiếp tục đặt món
          </Link>
        </section>
      </>
    );
  }

  if (resolved.length === 0) {
    return (
      <>
        <PageHero eyebrow="Thanh toán" title="Thanh toán" />
        <section className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
          <p className="text-sm text-brown-700">Giỏ hàng đang trống, hãy chọn món trước nhé.</p>
          <Link
            href="/menu"
            className="mt-6 inline-block rounded-full bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-cream-50 hover:bg-maroon-700"
          >
            Xem menu
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Thanh toán" title="Xác nhận đơn hàng" />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-brown-100 bg-cream-50 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Họ tên" name="name" required placeholder="Nguyễn Văn A" />
              <Field label="Số điện thoại" name="phone" type="tel" required placeholder="09xx xxx xxx" />
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brown-700">
                Phương thức nhận hàng
              </p>
              <div className="flex gap-3">
                <RadioCard
                  label="Đến quán"
                  checked={fulfillment === "tai-quan"}
                  onClick={() => setFulfillment("tai-quan")}
                />
                <RadioCard
                  label="Giao tận nơi"
                  checked={fulfillment === "giao-tan-noi"}
                  onClick={() => setFulfillment("giao-tan-noi")}
                />
              </div>
            </div>

            {fulfillment === "giao-tan-noi" && (
              <Field label="Địa chỉ giao hàng" name="address" required placeholder="Số nhà, đường, phường/xã..." />
            )}

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brown-700">
                Ghi chú thêm (nếu có)
              </label>
              <textarea
                name="note"
                rows={2}
                className="w-full rounded-xl border border-brown-100 bg-cream-50 px-3 py-2.5 text-sm text-brown-900 focus:border-maroon-600 focus:outline-none"
              />
            </div>

            <div className="rounded-xl border border-brown-100 bg-cream-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brown-700">
                Phương thức thanh toán
              </p>
              <p className="mt-1 text-sm text-brown-900">Tiền mặt / chuyển khoản tại quầy</p>
            </div>

            {error && <p className="text-sm text-maroon-600">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-maroon-600 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-maroon-700 disabled:opacity-60"
            >
              {status === "loading" ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </form>

          <div className="h-fit rounded-2xl border border-brown-100 bg-cream-50 p-6">
            <h3 className="font-serif text-base font-semibold text-brown-900">Đơn hàng</h3>
            <div className="mt-3 space-y-2 text-sm">
              {resolved.map(({ item, quantity }) => (
                <div key={item.id} className="flex justify-between text-brown-700">
                  <span>{item.name} × {quantity}</span>
                  <span>{formatPrice(item.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-brown-100 pt-4 text-sm font-semibold text-brown-900">
              <span>Tổng cộng</span>
              <span className="text-maroon-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        className="w-full rounded-xl border border-brown-100 bg-cream-50 px-3 py-2.5 text-sm text-brown-900 focus:border-maroon-600 focus:outline-none"
      />
    </div>
  );
}

function RadioCard({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
        checked
          ? "border-maroon-600 bg-maroon-600 text-cream-50"
          : "border-brown-100 bg-cream-50 text-brown-700 hover:border-maroon-600"
      }`}
    >
      {label}
    </button>
  );
}
