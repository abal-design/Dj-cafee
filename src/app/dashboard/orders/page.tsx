import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardOrdersPage() {
  const session = await getAuthSession();
  const orders = await prisma.order.findMany({
    where: { userId: session!.user.id },
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-semibold">My Orders</h1>
      <div className="space-y-4">
        {orders.length === 0 ? <p className="text-zinc-500">No orders yet.</p> : null}
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-zinc-200 p-4">
            <p className="font-medium">Status: {order.status}</p>
            <p className="text-sm text-zinc-600">Total: Rs {Number(order.totalAmount).toFixed(2)}</p>
            <p className="text-xs text-zinc-500">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
