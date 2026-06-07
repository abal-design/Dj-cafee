"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CheckoutForm() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout(formData: FormData) {
    setLoading(true);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      orderType: String(formData.get("orderType") ?? "TAKEAWAY"),
      deliveryAddress: String(formData.get("deliveryAddress") ?? ""),
      items: items.map((item) => ({ menuItemId: item.menuItemId, quantity: item.quantity })),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Unable to place order. Please login first.");
      return;
    }

    clearCart();
    router.push(`/order/success?total=${total}`);
  }

  return (
    <form action={handleCheckout} className="space-y-4">
      <Input name="fullName" placeholder="Full Name" required />
      <Input name="phone" placeholder="Phone" required />
      <select name="orderType" className="h-10 w-full rounded-xl border border-zinc-300 px-3 text-sm" defaultValue="TAKEAWAY">
        <option value="TAKEAWAY">Takeaway</option>
        <option value="DINE_IN">Dine-in</option>
      </select>
      <Input name="deliveryAddress" placeholder="Delivery address (optional)" />
      <Button type="submit" disabled={loading || items.length === 0}>
        {loading ? "Placing order..." : "Place Order"}
      </Button>
    </form>
  );
}
