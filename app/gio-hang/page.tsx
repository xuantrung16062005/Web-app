"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { useCart } from "@/lib/cart-context";
import { menuItems, formatPrice } from "@/data/menu";

export default function CartPage() {
  const { lines, setQuantity, removeItem, totalPrice } = useCart();

  const resolved = lines
    .map((l) => {
      const item = menuItems.find((m) => m.id === l.itemId);
      return item ? { ...l, item } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <>
      <PageHero eyebrow="Giỏ hàng" title="Giỏ hàng của bạn" />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {resolved.length === 0 ? (
          <div className="rounded-2xl border border-brown-100 bg-cream-50 p-10 text-center">
            <p className="text-sm text-brown-700">Giỏ hàng của bạn đang trống.</p>
            <Link
              href="/menu"
              className="mt-4 inline-block rounded-full bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-cream-50 hover:bg-maroon-700"
            >
              Xem menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="divide-y divide-brown-100 rounded-2xl border border-brown-100 bg-cream-50">
              {resolved.map(({ item, quantity }) => (
                <div key={item.id} className="flex items-center gap-4 p-4">
                  <div className="flex-1">
                    <p className="font-serif text-sm font-semibold text-brown-900">{item.name}</p>
                    <p className="text-xs text-brown-500">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-brown-100 text-brown-700 hover:border-maroon-600 hover:text-maroon-600"
                      aria-label="Giảm số lượng"
                    >
                      –
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-brown-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-brown-100 text-brown-700 hover:border-maroon-600 hover:text-maroon-600"
                      aria-label="Tăng số lượng"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs font-medium text-maroon-600 hover:text-maroon-700"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-brown-100 bg-cream-50 p-5">
              <span className="text-sm font-semibold text-brown-900">Tạm tính</span>
              <span className="font-serif text-lg font-semibold text-maroon-600">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <Link
              href="/thanh-toan"
              className="block w-full rounded-full bg-maroon-600 px-6 py-3 text-center text-sm font-semibold text-cream-50 transition-colors hover:bg-maroon-700"
            >
              Tiến hành thanh toán
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
