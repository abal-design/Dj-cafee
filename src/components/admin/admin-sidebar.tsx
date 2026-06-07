"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/reservations", label: "Reservations" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="px-3 pb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">Admin Panel</p>
      <div className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100",
              pathname === link.href && "bg-zinc-900 text-zinc-100",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
