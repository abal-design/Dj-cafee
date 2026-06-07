import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { menuItemId: string };
  await prisma.favorite.upsert({
    where: {
      userId_menuItemId: {
        userId: session.user.id,
        menuItemId: body.menuItemId,
      },
    },
    create: {
      userId: session.user.id,
      menuItemId: body.menuItemId,
    },
    update: {},
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { menuItemId: string };
  await prisma.favorite.deleteMany({
    where: { userId: session.user.id, menuItemId: body.menuItemId },
  });

  return NextResponse.json({ success: true });
}
