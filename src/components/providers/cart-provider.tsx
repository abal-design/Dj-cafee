"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dj-cart");
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      localStorage.removeItem("dj-cart");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("dj-cart", JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addItem: (item) => {
        setItems((prev) => {
          const found = prev.find((p) => p.menuItemId === item.menuItemId);
          if (found) {
            return prev.map((p) => (p.menuItemId === item.menuItemId ? { ...p, quantity: p.quantity + 1 } : p));
          }
          return [...prev, { ...item, quantity: 1 }];
        });
      },
      removeItem: (menuItemId) => setItems((prev) => prev.filter((p) => p.menuItemId !== menuItemId)),
      updateQuantity: (menuItemId, quantity) =>
        setItems((prev) => prev.map((p) => (p.menuItemId === menuItemId ? { ...p, quantity: Math.max(1, quantity) } : p))),
      clearCart: () => setItems([]),
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
