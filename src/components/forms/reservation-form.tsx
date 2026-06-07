"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { reservationSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Values = z.output<typeof reservationSchema>;
type InputValues = z.input<typeof reservationSchema>;

export function ReservationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputValues, unknown, Values>({ resolver: zodResolver(reservationSchema) });

  const onSubmit = async (values: Values) => {
    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      toast.success("Reservation submitted");
      reset();
    } else {
      toast.error("Please login to reserve");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <Input placeholder="Full Name" {...register("fullName")} />
        {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p> : null}
      </div>
      <div>
        <Input placeholder="Phone" {...register("phone")} />
        {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
      </div>
      <div>
        <Input type="number" placeholder="Guests" {...register("guests")} />
        {errors.guests ? <p className="mt-1 text-xs text-red-600">{errors.guests.message}</p> : null}
      </div>
      <div>
        <Input type="date" {...register("reservationDate")} />
      </div>
      <div>
        <Input type="time" {...register("reservationTime")} />
      </div>
      <div className="md:col-span-2">
        <Textarea placeholder="Special request (optional)" {...register("message")} />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Reserve Table"}
        </Button>
      </div>
    </form>
  );
}
