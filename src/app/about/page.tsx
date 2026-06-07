import { SectionTitle } from "@/components/shared/section-title";
import { businessInfo } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6">
      <SectionTitle title="About DJ Coffee" subtitle="Where modern coffee culture meets local warmth in Letang, Nepal." />
      <div className="space-y-4 rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
        <p>
          DJ Coffee is a premium coffee shop designed for comfort, quality, and convenience. We proudly serve dine-in guests and takeaway customers with carefully curated coffee, beverages, and food.
        </p>
        <p>
          Our location at {businessInfo.address} makes us a trusted stop for local residents, travelers, and cafe lovers seeking a warm and elegant atmosphere.
        </p>
        <p>
          With a rating of {businessInfo.rating}/5 and price range of {businessInfo.priceRange}, our mission is simple: exceptional value with a luxurious yet practical experience.
        </p>
      </div>
    </div>
  );
}
