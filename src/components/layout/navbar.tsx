"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Coffee, Menu, ShoppingCart, UserCircle2, X } from "lucide-react";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-100 bg-[#1b120f]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-amber-50">
          <Coffee className="h-6 w-6 text-amber-400" />
          <span className="text-lg font-semibold tracking-wide">DJ Coffee</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-amber-50/80 transition hover:text-amber-200",
                pathname === item.href && "text-amber-200",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/order" className="relative rounded-full p-2 text-amber-100 hover:bg-amber-950/70">
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-semibold text-zinc-900">
                {items.length}
              </span>
            )}
          </Link>
          {session?.user ? (
            <>
              <Link href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"} className="hidden md:inline-flex">
                <Button size="sm" variant="outline" className="border-amber-300 text-amber-50 hover:bg-amber-900/40">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </Link>
              <Button size="sm" variant="secondary" className="hidden md:inline-flex" onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" className="hidden md:inline-flex">
              <Button size="sm">Login</Button>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex rounded-lg p-2 text-amber-100 hover:bg-amber-950/70 md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav className="border-t border-amber-100/20 px-4 py-3 md:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm text-amber-100/90 hover:bg-amber-950/70 hover:text-amber-100",
                  pathname === item.href && "bg-amber-950/60 text-amber-200",
                )}
              >
                {item.label}
              </Link>
            ))}

            {session?.user ? (
              <>
                <Link
                  href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-amber-100/90 hover:bg-amber-950/70 hover:text-amber-100"
                >
                  Account
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="rounded-lg px-3 py-2 text-left text-sm text-amber-100/90 hover:bg-amber-950/70 hover:text-amber-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-amber-100/90 hover:bg-amber-950/70 hover:text-amber-100"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
