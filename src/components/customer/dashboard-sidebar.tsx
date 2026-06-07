"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/orders", label: "My Orders" },
  { href: "/dashboard/reservations", label: "My Reservations" },
  { href: "/dashboard/favorites", label: "Favorites" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="px-3 pb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">Customer Area</p>
      <div className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100",
              pathname === link.href && "bg-amber-700 text-amber-50",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
