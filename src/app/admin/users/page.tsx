import Link from "next/link";
import { UserActions } from "@/components/admin/user-actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const pageNum = Number(page ?? 1);
  const take = 12;
  const skip = (pageNum - 1) * take;

  const where = q
    ? {
        OR: [
          { name: { contains: q } },
          { email: { contains: q } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.user.count({ where }),
  ]);

  const pages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Manage Users</h1>
      <form className="flex gap-2">
        <input name="q" defaultValue={q} placeholder="Search users" className="h-10 rounded border border-zinc-300 px-3 text-sm" />
        <button className="rounded bg-zinc-900 px-3 py-2 text-sm text-white">Search</button>
      </form>
      <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4">
        {users.map((user) => (
          <div key={user.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-zinc-500">{user.email} • {user.role} • {user.isBlocked ? "Blocked" : "Active"}</p>
            </div>
            <UserActions id={user.id} role={user.role} isBlocked={user.isBlocked} />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: pages }).map((_, idx) => (
          <Link key={idx} href={`/admin/users?page=${idx + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`} className="rounded border border-zinc-300 px-3 py-1 text-sm">
            {idx + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
