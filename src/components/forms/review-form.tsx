"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { reviewSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Values = z.output<typeof reviewSchema>;
type InputValues = z.input<typeof reviewSchema>;

export function ReviewForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputValues, unknown, Values>({ resolver: zodResolver(reviewSchema) });

  const onSubmit = async (values: Values) => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      toast.success("Review submitted for admin approval");
      reset();
    } else {
      toast.error("Please login to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input type="number" min={1} max={5} placeholder="Rating (1-5)" {...register("rating")} />
        {errors.rating ? <p className="mt-1 text-xs text-red-600">{errors.rating.message}</p> : null}
      </div>
      <div>
        <Textarea placeholder="Write your experience..." {...register("comment")} />
        {errors.comment ? <p className="mt-1 text-xs text-red-600">{errors.comment.message}</p> : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
