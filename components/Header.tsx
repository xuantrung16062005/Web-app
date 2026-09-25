"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/menu", label: "Menu" },
  { href: "/khong-gian", label: "Không gian" },
  { href: "/su-kien", label: "Sự kiện" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-brown-100 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-brown-900" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-maroon-600" : "text-brown-700 hover:text-maroon-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/gio-hang"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-brown-700 hover:bg-brown-100"
            aria-label="Giỏ hàng"
          >
            <CartIcon />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon-600 px-1 text-[11px] font-semibold text-cream-50">
                {totalCount}
              </span>
            )}
          </Link>

          <Link
            href="/dat-ban"
            className="hidden rounded-full bg-maroon-600 px-5 py-2 text-sm font-semibold text-cream-50 transition-colors hover:bg-maroon-700 sm:inline-flex"
          >
            Đặt bàn
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brown-700 hover:bg-brown-100 lg:hidden"
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-brown-100 bg-cream-50 px-4 py-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === link.href
                  ? "bg-brown-100 text-maroon-600"
                  : "text-brown-700 hover:bg-brown-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dat-ban"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-maroon-600 px-4 py-2 text-center text-sm font-semibold text-cream-50"
          >
            Đặt bàn ngay
          </Link>
        </nav>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 4h2l2.4 12.1a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="21" r="1.3" fill="currentColor" />
      <circle cx="17" cy="21" r="1.3" fill="currentColor" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
