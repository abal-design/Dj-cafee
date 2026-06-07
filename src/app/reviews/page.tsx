import { ReviewForm } from "@/components/forms/review-form";
import { ReviewCard } from "@/components/shared/review-card";
import { SectionTitle } from "@/components/shared/section-title";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { isApproved: true },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle title="Reviews" subtitle="Real experiences from DJ Coffee guests." />
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.user.name}
              rating={review.rating}
              comment={review.comment}
              createdAt={review.createdAt.toLocaleDateString()}
            />
          ))}
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <h3 className="mb-4 text-xl font-semibold">Share Your Review</h3>
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}
