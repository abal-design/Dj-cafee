"use client";

import { toast } from "sonner";

export function UserActions({ id, role, isBlocked }: { id: string; role: string; isBlocked: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded border border-zinc-300 px-2 py-1 text-xs"
        onClick={async () => {
          const nextRole = role === "ADMIN" ? "CUSTOMER" : "ADMIN";
          const res = await fetch("/api/admin/users", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, role: nextRole }),
          });
          if (res.ok) toast.success("Role updated");
          else toast.error("Action failed");
        }}
      >
        Toggle Role
      </button>
      <button
        className="rounded border border-zinc-300 px-2 py-1 text-xs"
        onClick={async () => {
          const res = await fetch("/api/admin/users", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, isBlocked: !isBlocked }),
          });
          if (res.ok) toast.success("User status updated");
          else toast.error("Action failed");
        }}
      >
        {isBlocked ? "Unblock" : "Block"}
      </button>
    </div>
  );
}
