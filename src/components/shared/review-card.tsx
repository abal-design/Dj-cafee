import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ReviewCard({
  name,
  rating,
  comment,
  createdAt,
}: {
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-medium text-zinc-900">{name}</p>
        <p className="text-xs text-zinc-500">{createdAt}</p>
      </div>
      <div className="flex items-center gap-1 text-amber-600">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} className={`h-4 w-4 ${idx < rating ? "fill-current" : ""}`} />
        ))}
      </div>
      <p className="text-sm text-zinc-600">{comment}</p>
    </Card>
  );
}
