import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await getAuthSession();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const body = (await req.json()) as { id: string; status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED" };
  await prisma.reservation.update({ where: { id: body.id }, data: { status: body.status } });
  return NextResponse.json({ success: true });
}
