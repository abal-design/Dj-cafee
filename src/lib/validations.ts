import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(7, "Phone is required"),
});

export const reservationSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  guests: z.coerce.number().int().min(1).max(15),
  reservationDate: z.string().min(1),
  reservationTime: z.string().min(1),
  message: z.string().max(300).optional(),
});

export const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(5).max(400),
});

export const orderSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  orderType: z.enum(["TAKEAWAY", "DINE_IN"]),
  deliveryAddress: z.string().max(250).optional(),
  items: z
    .array(
      z.object({
        menuItemId: z.string().min(1),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1),
});
