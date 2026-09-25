"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { menuItems } from "@/data/menu";

export interface CartLine {
  itemId: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clear: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cafe-mien-ky-uc-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  }, [lines, hydrated]);

  const addItem = useCallback((itemId: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.itemId === itemId);
      if (existing) {
        return prev.map((l) => (l.itemId === itemId ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...prev, { itemId, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setLines((prev) => prev.filter((l) => l.itemId !== itemId));
  }, []);

  const setQuantity = useCallback((itemId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.itemId !== itemId);
      return prev.map((l) => (l.itemId === itemId ? { ...l, quantity } : l));
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { totalCount, totalPrice } = useMemo(() => {
    let count = 0;
    let price = 0;
    for (const line of lines) {
      const item = menuItems.find((m) => m.id === line.itemId);
      if (!item) continue;
      count += line.quantity;
      price += item.price * line.quantity;
    }
    return { totalCount: count, totalPrice: price };
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({ lines, addItem, removeItem, setQuantity, clear, totalCount, totalPrice }),
    [lines, addItem, removeItem, setQuantity, clear, totalCount, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
