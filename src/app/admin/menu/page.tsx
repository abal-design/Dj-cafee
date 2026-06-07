import Link from "next/link";
import { MenuManager } from "@/components/admin/menu-manager";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNum = Number(page ?? 1);
  const pageSize = 10;
  const skip = (pageNum - 1) * pageSize;

  const [categories, items, total] = await Promise.all([
    prisma.menuCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.menuItem.findMany({ orderBy: { createdAt: "desc" }, skip, take: pageSize }),
    prisma.menuItem.count(),
  ]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Manage Menu</h1>
      <MenuManager
        categories={categories}
        items={items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: Number(item.price),
          image: item.image,
          isAvailable: item.isAvailable,
          isFeatured: item.isFeatured,
          categoryId: item.categoryId,
        }))}
      />
      <div className="flex gap-2">
        {Array.from({ length: pages }).map((_, idx) => (
          <Link key={idx} href={`/admin/menu?page=${idx + 1}`} className="rounded border border-zinc-300 px-3 py-1 text-sm">
            {idx + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
