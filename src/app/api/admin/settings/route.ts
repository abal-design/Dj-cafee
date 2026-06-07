import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await getAuthSession();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const body = (await req.json()) as {
    cafeName: string;
    phone: string;
    address: string;
    openingHours: string;
    heroTitle: string;
    heroSubtitle: string;
    aboutText: string;
  };

  const first = await prisma.siteSetting.findFirst();
  if (!first) return NextResponse.json({ message: "Missing settings" }, { status: 404 });

  await prisma.siteSetting.update({ where: { id: first.id }, data: body });
  return NextResponse.json({ success: true });
}
