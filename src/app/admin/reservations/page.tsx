import Link from "next/link";
import { ReservationStatusSelect } from "@/components/admin/reservation-status-select";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const { status, page } = await searchParams;
  const pageNum = Number(page ?? 1);
  const take = 12;
  const skip = (pageNum - 1) * take;

  const where = status && status !== "ALL" ? { status: status as never } : {};

  const [reservations, total] = await Promise.all([
    prisma.reservation.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.reservation.count({ where }),
  ]);

  const pages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Manage Reservations</h1>
      <form className="flex gap-2">
        <select name="status" defaultValue={status ?? "ALL"} className="h-10 rounded border border-zinc-300 px-3 text-sm">
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button className="rounded bg-zinc-900 px-3 py-2 text-sm text-white">Filter</button>
      </form>
      <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <p className="font-medium">{reservation.fullName} ({reservation.guests} guests)</p>
              <p className="text-xs text-zinc-500">{new Date(reservation.reservationDate).toLocaleDateString()} at {reservation.reservationTime}</p>
            </div>
            <ReservationStatusSelect id={reservation.id} value={reservation.status} />
          </div>
        ))}
        {reservations.length === 0 ? <p className="text-sm text-zinc-500">No reservations found.</p> : null}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: pages }).map((_, idx) => (
          <Link key={idx} href={`/admin/reservations?page=${idx + 1}${status ? `&status=${status}` : ""}`} className="rounded border border-zinc-300 px-3 py-1 text-sm">
            {idx + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
