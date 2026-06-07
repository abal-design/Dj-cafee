import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MenuCard } from "@/components/shared/menu-card";
import { ReviewCard } from "@/components/shared/review-card";
import { SectionTitle } from "@/components/shared/section-title";
import { businessInfo } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredItems, reviews] = await Promise.all([
    prisma.menuItem.findMany({ where: { isFeatured: true }, take: 3, orderBy: { createdAt: "desc" } }),
    prisma.review.findMany({ where: { isApproved: true }, include: { user: true }, take: 3, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div>
      <section className="luxury-hero relative overflow-hidden px-4 py-20 text-amber-50 md:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <Badge className="bg-amber-500/20 text-amber-200">Luxury Cafe Experience in Letang</Badge>
            <h1 className="text-4xl leading-tight md:text-6xl">DJ Coffee</h1>
            <p className="max-w-xl text-amber-100/90">
              Premium handcrafted drinks, elegant comfort food, and cozy moments for dine-in and takeaway.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/menu"><Button size="lg">Explore Menu</Button></Link>
              <Link href="/reservations"><Button size="lg" variant="outline" className="border-amber-200 text-amber-100 hover:bg-amber-900/50">Book a Table</Button></Link>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 text-sm md:grid-cols-4">
              <div><p className="text-2xl font-semibold">{businessInfo.rating}</p><p className="text-amber-100/75">Rating</p></div>
              <div><p className="text-2xl font-semibold">{businessInfo.priceRange}</p><p className="text-amber-100/75">Price</p></div>
              <div><p className="text-2xl font-semibold">Dine-in</p><p className="text-amber-100/75">Service</p></div>
              <div><p className="text-2xl font-semibold">8 PM</p><p className="text-amber-100/75">Closing</p></div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80"
            alt="DJ Coffee premium interior"
            className="h-105 w-full rounded-3xl object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <SectionTitle title="Featured Highlights" subtitle="Our most loved specialties and signature choices." />
        <div className="grid gap-5 md:grid-cols-3">
          {featuredItems.map((item) => (
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
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6">
        <SectionTitle title="Why Choose DJ Coffee" subtitle="A premium yet practical experience for your daily coffee ritual." />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { title: "Luxury Ambience", text: "Warm matte interiors, cozy seating, and calm premium atmosphere." },
            { title: "Quality Ingredients", text: "Carefully selected coffee beans, fresh dairy, and local favorites." },
            { title: "Fast Takeaway", text: "Reliable pickup flow for busy mornings and evening cravings." },
          ].map((feature) => (
            <div key={feature.title} className="soft-card rounded-2xl border border-amber-100 p-6">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-zinc-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6">
        <SectionTitle title="Guest Testimonials" />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.user.name}
              rating={review.rating}
              comment={review.comment}
              createdAt={review.createdAt.toLocaleDateString()}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
