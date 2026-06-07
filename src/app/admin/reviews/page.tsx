import Link from "next/link";
import { ReviewActions } from "@/components/admin/review-actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ approved?: string; page?: string }>;
}) {
  const { approved, page } = await searchParams;
  const pageNum = Number(page ?? 1);
  const take = 12;
  const skip = (pageNum - 1) * take;

  const where = approved === "all" ? {} : { isApproved: approved === "true" };

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({ where, include: { user: true }, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.review.count({ where }),
  ]);

  const pages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Manage Reviews</h1>
      <form className="flex gap-2">
        <select name="approved" defaultValue={approved ?? "false"} className="h-10 rounded border border-zinc-300 px-3 text-sm">
          <option value="false">Pending</option>
          <option value="true">Approved</option>
          <option value="all">All</option>
        </select>
        <button className="rounded bg-zinc-900 px-3 py-2 text-sm text-white">Filter</button>
      </form>
      <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2 border-b border-zinc-100 pb-3">
            <p className="font-medium">{review.user.name} ({review.rating}/5)</p>
            <p className="text-sm text-zinc-600">{review.comment}</p>
            <ReviewActions id={review.id} isApproved={review.isApproved} />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: pages }).map((_, idx) => (
          <Link key={idx} href={`/admin/reviews?page=${idx + 1}${approved ? `&approved=${approved}` : ""}`} className="rounded border border-zinc-300 px-3 py-1 text-sm">
            {idx + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
