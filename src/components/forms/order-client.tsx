"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { MenuCard, type MenuCardData } from "@/components/shared/menu-card";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { Button } from "@/components/ui/button";
import { formatNpr } from "@/lib/utils";

export function OrderClient({ items }: { items: MenuCardData[] }) {
  const { items: cartItems, updateQuantity, removeItem, total } = useCart();

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div>
        <h3 className="mb-4 text-xl font-semibold">Build Your Takeaway</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5">
        <h3 className="text-xl font-semibold">Cart</h3>
        {cartItems.length === 0 ? (
          <p className="text-sm text-zinc-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.menuItemId} className="rounded-xl border border-zinc-200 p-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-zinc-500">{formatNpr(item.price)}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)} className="rounded bg-zinc-100 p-1" aria-label="decrease quantity">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)} className="rounded bg-zinc-100 p-1" aria-label="increase quantity">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <Button type="button" size="sm" variant="ghost" onClick={() => removeItem(item.menuItemId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <p className="text-lg font-semibold">Total: {formatNpr(total)}</p>
          </div>
        )}
        <CheckoutForm />
      </div>
    </div>
  );
}
