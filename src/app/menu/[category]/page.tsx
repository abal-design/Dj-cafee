import { notFound } from "next/navigation";
import { MenuCard } from "@/components/shared/menu-card";
import { SectionTitle } from "@/components/shared/section-title";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categoryData = await prisma.menuCategory.findUnique({ where: { slug: category } });
  if (!categoryData) return notFound();

  const items = await prisma.menuItem.findMany({
    where: { categoryId: categoryData.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle title={categoryData.name} subtitle={categoryData.description ?? "Category items"} />
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
    </div>
  );
}
