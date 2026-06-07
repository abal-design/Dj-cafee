"use client";

import { useTransition } from "react";
import { toast } from "sonner";

const statuses = ["PENDING", "CONFIRMED", "PREPARING", "COMPLETED", "CANCELED"];

export function OrderStatusSelect({ id, value }: { id: string; value: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={value}
      disabled={pending}
      onChange={(e) => {
        startTransition(async () => {
          const res = await fetch("/api/admin/orders", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: e.target.value }),
          });
          if (res.ok) toast.success("Order updated");
          else toast.error("Update failed");
        });
      }}
      className="rounded border border-zinc-300 px-2 py-1 text-xs"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>{status}</option>
      ))}
    </select>
  );
}
