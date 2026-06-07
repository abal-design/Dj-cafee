import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  const data = parsed.data;

  await prisma.reservation.create({
    data: {
      userId: session.user.id,
      fullName: data.fullName,
      phone: data.phone,
      guests: data.guests,
      reservationDate: new Date(data.reservationDate),
      reservationTime: data.reservationTime,
      message: data.message,
    },
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = session.user.role === "ADMIN";
  const reservations = await prisma.reservation.findMany({
    where: isAdmin ? {} : { userId: session.user.id },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reservations);
}
