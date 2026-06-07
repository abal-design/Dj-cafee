import { NextResponse } from "next/server";
import slugify from "slugify";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function checkAdmin() {
  const session = await getAuthSession();
  return session?.user?.role === "ADMIN";
}

export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const items = await prisma.menuItem.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const item = await prisma.menuItem.create({
    data: {
      name: body.name,
      slug: slugify(body.name, { lower: true, strict: true }),
      description: body.description,
      price: Number(body.price),
      image: body.image,
      categoryId: body.categoryId,
      isAvailable: Boolean(body.isAvailable),
      isFeatured: Boolean(body.isFeatured),
    },
  });
  return NextResponse.json(item);
}

export async function PATCH(req: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const item = await prisma.menuItem.update({
    where: { id: body.id },
    data: {
      name: body.name,
      slug: slugify(body.name, { lower: true, strict: true }),
      description: body.description,
      price: Number(body.price),
      image: body.image,
      categoryId: body.categoryId,
      isAvailable: Boolean(body.isAvailable),
      isFeatured: Boolean(body.isFeatured),
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const body = (await req.json()) as { id: string };
  await prisma.menuItem.delete({ where: { id: body.id } });
  return NextResponse.json({ success: true });
}
