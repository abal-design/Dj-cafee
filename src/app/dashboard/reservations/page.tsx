import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardReservationsPage() {
  const session = await getAuthSession();
  const reservations = await prisma.reservation.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-semibold">My Reservations</h1>
      <div className="space-y-4">
        {reservations.length === 0 ? <p className="text-zinc-500">No reservations yet.</p> : null}
        {reservations.map((reservation) => (
          <div key={reservation.id} className="rounded-xl border border-zinc-200 p-4">
            <p className="font-medium">{reservation.fullName} - {reservation.guests} guests</p>
            <p className="text-sm text-zinc-600">{new Date(reservation.reservationDate).toLocaleDateString()} at {reservation.reservationTime}</p>
            <p className="text-xs text-zinc-500">Status: {reservation.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
