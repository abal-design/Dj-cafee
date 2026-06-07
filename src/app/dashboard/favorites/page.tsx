import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardFavoritesPage() {
  const session = await getAuthSession();
  const favorites = await prisma.favorite.findMany({
    where: { userId: session!.user.id },
    include: { menuItem: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-semibold">My Favorites</h1>
      <div className="space-y-3">
        {favorites.length === 0 ? <p className="text-zinc-500">No favorite items yet.</p> : null}
        {favorites.map((favorite) => (
          <div key={favorite.id} className="rounded-xl border border-zinc-200 p-4">
            <p className="font-medium">{favorite.menuItem.name}</p>
            <p className="text-sm text-zinc-600">Rs {Number(favorite.menuItem.price).toFixed(2)}</p>
            <Link href="/menu" className="text-sm text-amber-700">Order now</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
