import { RevenueChart } from "@/components/admin/revenue-chart";
import { StatCard } from "@/components/shared/stat-card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [users, orders, reservations, reviews, revenueData] = await Promise.all([
    prisma.user.count(),
    prisma.order.findMany(),
    prisma.reservation.count(),
    prisma.review.count(),
    prisma.order.findMany({
      select: { createdAt: true, totalAmount: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const revenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
  const monthly = new Map<string, number>();

  for (const item of revenueData) {
    const month = new Date(item.createdAt).toLocaleString("en-US", { month: "short" });
    monthly.set(month, (monthly.get(month) ?? 0) + Number(item.totalAmount));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Users" value={String(users)} />
        <StatCard title="Orders" value={String(orders.length)} />
        <StatCard title="Reservations" value={String(reservations)} />
        <StatCard title="Reviews" value={String(reviews)} />
        <StatCard title="Revenue" value={`Rs ${revenue.toFixed(2)}`} />
      </div>
      <RevenueChart
        data={Array.from(monthly.entries()).map(([month, value]) => ({ month, revenue: Number(value.toFixed(2)) }))}
      />
    </div>
  );
}
