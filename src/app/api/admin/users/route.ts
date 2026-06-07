import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await getAuthSession();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const body = (await req.json()) as { id: string; role?: "CUSTOMER" | "ADMIN"; isBlocked?: boolean };

  await prisma.user.update({
    where: { id: body.id },
    data: {
      role: body.role,
      isBlocked: typeof body.isBlocked === "boolean" ? body.isBlocked : undefined,
    },
  });

  return NextResponse.json({ success: true });
}
