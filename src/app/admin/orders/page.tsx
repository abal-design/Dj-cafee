import Link from "next/link";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; page?: string }>;
}) {
  const { q, sort, page } = await searchParams;
  const pageNum = Number(page ?? 1);
  const take = 12;
  const skip = (pageNum - 1) * take;

  const where = q
    ? {
        OR: [
          { fullName: { contains: q } },
          { phone: { contains: q } },
        ],
      }
    : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { user: true },
      orderBy: { createdAt: sort === "old" ? "asc" : "desc" },
      skip,
      take,
    }),
    prisma.order.count({ where }),
  ]);

  const pages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Manage Orders</h1>
      <form className="flex flex-wrap gap-2">
        <input name="q" placeholder="Search" defaultValue={q} className="h-10 rounded border border-zinc-300 px-3 text-sm" />
        <select name="sort" defaultValue={sort ?? "new"} className="h-10 rounded border border-zinc-300 px-3 text-sm">
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
        <button className="rounded bg-zinc-900 px-3 py-2 text-sm text-white">Apply</button>
      </form>
      <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4">
        {orders.map((order) => (
          <div key={order.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <p className="font-medium">{order.fullName} - Rs {Number(order.totalAmount).toFixed(2)}</p>
              <p className="text-xs text-zinc-500">{new Date(order.createdAt).toLocaleString()} • {order.orderType}</p>
            </div>
            <OrderStatusSelect id={order.id} value={order.status} />
          </div>
        ))}
        {orders.length === 0 ? <p className="text-sm text-zinc-500">No orders found.</p> : null}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: pages }).map((_, idx) => (
          <Link key={idx} href={`/admin/orders?page=${idx + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}${sort ? `&sort=${sort}` : ""}`} className="rounded border border-zinc-300 px-3 py-1 text-sm">
            {idx + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
