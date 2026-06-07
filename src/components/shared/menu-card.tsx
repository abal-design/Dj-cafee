"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useCart } from "@/components/providers/cart-provider";
import { formatNpr } from "@/lib/utils";

export type MenuCardData = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  isFeatured: boolean;
};

export function MenuCard({ item }: { item: MenuCardData }) {
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  async function toggleFavorite() {
    if (favoriteLoading) return;

    setFavoriteLoading(true);
    const response = await fetch("/api/favorites", {
      method: isFavorite ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ menuItemId: item.id }),
    });

    if (response.ok) {
      setIsFavorite((prev) => !prev);
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
    } else if (response.status === 401) {
      toast.error("Please login to use favorites");
    } else {
      toast.error("Unable to update favorites");
    }

    setFavoriteLoading(false);
  }

  return (
    <Card className="overflow-hidden p-0">
      <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{item.name}</CardTitle>
          <Badge>{formatNpr(item.price)}</Badge>
        </div>
        <CardDescription>{item.description}</CardDescription>
        <div className="flex items-center justify-between">
          <Button
            type="button"
            onClick={() => {
              addItem({ menuItemId: item.id, image: item.image, name: item.name, price: item.price });
              toast.success("Added to cart");
            }}
            disabled={!item.isAvailable}
          >
            {item.isAvailable ? "Add to Cart" : "Unavailable"}
          </Button>
          <button
            type="button"
            onClick={toggleFavorite}
            disabled={favoriteLoading}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100"
            aria-label="favorite item"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-amber-500 text-amber-600" : ""}`} />
          </button>
        </div>
      </div>
    </Card>
  );
}
