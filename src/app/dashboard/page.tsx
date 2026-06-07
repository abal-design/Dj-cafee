import { StatCard } from "@/components/shared/stat-card";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getAuthSession();
  const userId = session!.user.id;

  const [orders, reservations, favorites] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.reservation.count({ where: { userId } }),
    prisma.favorite.count({ where: { userId } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Welcome, {session?.user.name}</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="My Orders" value={String(orders)} />
        <StatCard title="Reservations" value={String(reservations)} />
        <StatCard title="Favorites" value={String(favorites)} />
      </div>
    </div>
  );
}
