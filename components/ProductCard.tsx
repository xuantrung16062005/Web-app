"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice, type MenuItem } from "@/data/menu";

export function ProductCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-brown-100 bg-cream-50 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex aspect-square items-center justify-center bg-panel-gradient text-cream-100">
        <DrinkGlyph />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-serif text-base font-semibold text-brown-900">{item.name}</h3>
        <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-brown-500">
          {item.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-maroon-600">{formatPrice(item.price)}</span>
          <button
            type="button"
            onClick={() => addItem(item.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-maroon-600 text-cream-50 transition-colors hover:bg-maroon-700"
            aria-label={`Thêm ${item.name} vào giỏ`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function DrinkGlyph() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 8h10l-.9 9.2a2 2 0 0 1-2 1.8H8.9a2 2 0 0 1-2-1.8L6 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M16 9.5h1.5a2 2 0 1 1 0 4H15.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 5.5c.6-1 .2-1.6-.2-2.2M12 5.5c.6-1 .2-1.6-.2-2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
