import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.review.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSetting.deleteMany();

  const categories = await prisma.menuCategory.createMany({
    data: [
      { name: "Coffee", slug: "coffee", description: "Signature roasted coffee selections." },
      { name: "Cold Beverages", slug: "cold-beverages", description: "Chilled handcrafted refreshers." },
      { name: "Food", slug: "food", description: "Comforting cafe plates and quick bites." },
      { name: "Specials", slug: "specials", description: "Seasonal and premium chef highlights." },
    ],
  });

  if (!categories.count) throw new Error("Failed to seed categories");

  const allCategories = await prisma.menuCategory.findMany();
  const categoryMap = new Map(allCategories.map((c) => [c.slug, c.id]));

  const menuItems = [
    {
      name: "Cappuccino Grande",
      description: "Velvety foam over rich espresso and steamed milk.",
      price: 320,
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80",
      categorySlug: "coffee",
      isFeatured: true,
    },
    {
      name: "Caramel Latte",
      description: "Silky caramel with double-shot espresso.",
      price: 360,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
      categorySlug: "coffee",
      isFeatured: true,
    },
    {
      name: "Lassi",
      description: "Traditional chilled yogurt drink with a refined touch.",
      price: 180,
      image: "https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?auto=format&fit=crop&w=900&q=80",
      categorySlug: "cold-beverages",
      isFeatured: true,
    },
    {
      name: "Mojito Mocktail",
      description: "Mint, citrus, and sparkling coolness.",
      price: 240,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
      categorySlug: "cold-beverages",
      isFeatured: true,
    },
    {
      name: "Grilled Chicken Nanglo Set",
      description: "Locally loved platter with grilled chicken and signature sides.",
      price: 500,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
      categorySlug: "food",
      isFeatured: true,
    },
    {
      name: "Hazelnut Affogato",
      description: "Premium vanilla ice cream drowned in espresso.",
      price: 410,
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1fcef?auto=format&fit=crop&w=900&q=80",
      categorySlug: "specials",
      isFeatured: false,
    },
  ];

  await prisma.menuItem.createMany({
    data: menuItems.map((item) => ({
      name: item.name,
      slug: slugify(item.name, { lower: true, strict: true }),
      description: item.description,
      price: item.price,
      image: item.image,
      categoryId: categoryMap.get(item.categorySlug)!,
      isFeatured: item.isFeatured,
      isAvailable: true,
    })),
  });

  const adminPassword = await hash("admin12345", 10);
  const customerPassword = await hash("customer12345", 10);

  const admin = await prisma.user.create({
    data: {
      name: "DJ Coffee Admin",
      email: "admin@djcoffee.com",
      password: adminPassword,
      role: Role.ADMIN,
      phone: "986-0984547",
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Letang Customer",
      email: "customer@djcoffee.com",
      password: customerPassword,
      role: Role.CUSTOMER,
      phone: "9800000000",
    },
  });

  const firstItem = await prisma.menuItem.findFirstOrThrow();

  await prisma.review.createMany({
    data: [
      {
        userId: customer.id,
        rating: 5,
        comment: "Best coffee ambiance in Letang. The food is surprisingly premium.",
        isApproved: true,
      },
      {
        userId: admin.id,
        rating: 4,
        comment: "Warm service and excellent takeaway packaging.",
        isApproved: true,
      },
    ],
  });

  await prisma.favorite.create({
    data: {
      userId: customer.id,
      menuItemId: firstItem.id,
    },
  });

  await prisma.siteSetting.create({
    data: {
      cafeName: "DJ Coffee",
      phone: "986-0984547",
      address: "PGQ3+M36, Kanepokhari - Letang Road, Letang 56600, Nepal",
      openingHours: "Open, closes at 8 PM",
      heroTitle: "Luxury Coffee Moments In Letang",
      heroSubtitle: "Crafted drinks, premium comfort food, and a warm cafe atmosphere for dine-in and takeaway.",
      aboutText:
        "DJ Coffee blends modern cafe elegance with local warmth, serving handcrafted beverages and flavorful meals in the heart of Letang.",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
