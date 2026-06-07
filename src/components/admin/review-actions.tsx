"use client";

import { toast } from "sonner";

export function ReviewActions({ id, isApproved }: { id: string; isApproved: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded border border-zinc-300 px-2 py-1 text-xs"
        onClick={async () => {
          const res = await fetch("/api/reviews", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, isApproved: !isApproved }),
          });
          if (res.ok) toast.success("Review status updated");
          else toast.error("Update failed");
        }}
      >
        {isApproved ? "Hide" : "Approve"}
      </button>
      <button
        className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"
        onClick={async () => {
          const res = await fetch("/api/reviews", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });
          if (res.ok) toast.success("Review deleted");
          else toast.error("Delete failed");
        }}
      >
        Delete
      </button>
    </div>
  );
}
