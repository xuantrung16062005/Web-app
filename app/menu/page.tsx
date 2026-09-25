"use client";

import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { categories, menuItems, type MenuCategory } from "@/data/menu";

export default function MenuPage() {
  const [active, setActive] = useState<MenuCategory | "tat-ca">("tat-ca");

  const items = active === "tat-ca" ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <>
      <PageHero
        eyebrow="Thực đơn"
        title="Menu"
        description="Đa dạng cà phê, trà và đồ uống được pha chế từ nguyên liệu tuyển chọn."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterButton active={active === "tat-ca"} onClick={() => setActive("tat-ca")}>
            Tất cả
          </FilterButton>
          {categories.map((c) => (
            <FilterButton key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
              {c.label}
            </FilterButton>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-maroon-600 bg-maroon-600 text-cream-50"
          : "border-brown-100 bg-cream-50 text-brown-700 hover:border-maroon-600 hover:text-maroon-600"
      }`}
    >
      {children}
    </button>
  );
}
