import Link from "next/link";
import { MenuCard } from "@/components/shared/menu-card";
import { SectionTitle } from "@/components/shared/section-title";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const [categories, items] = await Promise.all([
    prisma.menuCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.menuItem.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q } },
              { description: { contains: q } },
            ],
          }
        : {},
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle title="Menu" subtitle="Luxury coffee, refreshing drinks, and satisfying cafe plates." />
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form className="w-full md:max-w-sm">
          <Input name="q" placeholder="Search menu..." defaultValue={q} />
        </form>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category.id} href={`/menu/${category.slug}`} className="rounded-full border border-zinc-300 px-4 py-1 text-sm hover:bg-zinc-100">
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      {items.length === 0 ? (
        <p className="rounded-2xl border border-zinc-200 bg-white p-8 text-zinc-500">No menu items found.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuCard
              key={item.id}
              item={{
                id: item.id,
                name: item.name,
                description: item.description,
                image: item.image,
                price: Number(item.price),
                isAvailable: item.isAvailable,
                isFeatured: item.isFeatured,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
