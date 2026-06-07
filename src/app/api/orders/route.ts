import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const ids = parsed.data.items.map((item) => item.menuItemId);
  const menuItems = await prisma.menuItem.findMany({ where: { id: { in: ids } } });
  const menuMap = new Map(menuItems.map((item) => [item.id, Number(item.price)]));

  const total = parsed.data.items.reduce((sum, item) => {
    const price = menuMap.get(item.menuItemId) ?? 0;
    return sum + price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      orderType: parsed.data.orderType,
      deliveryAddress: parsed.data.deliveryAddress || null,
      totalAmount: new Prisma.Decimal(total),
      items: {
        create: parsed.data.items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: new Prisma.Decimal(menuMap.get(item.menuItemId) ?? 0),
        })),
      },
    },
  });

  return NextResponse.json(order);
}

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = session.user.role === "ADMIN";
  const orders = await prisma.order.findMany({
    where: isAdmin ? {} : { userId: session.user.id },
    include: {
      user: true,
      items: { include: { menuItem: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
