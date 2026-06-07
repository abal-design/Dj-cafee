import { OrderClient } from "@/components/forms/order-client";
import { SectionTitle } from "@/components/shared/section-title";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OrderPage() {
  const items = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle title="Order Online" subtitle="Build your takeaway order and checkout instantly." />
      <OrderClient
        items={items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          price: Number(item.price),
          isAvailable: item.isAvailable,
          isFeatured: item.isFeatured,
        }))}
      />
    </div>
  );
}
