import * as z from "zod";

export const planSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  calories: z.coerce.number().min(0, "Calories must be positive"),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]),
});

export type PlanFormData = z.infer<typeof planSchema>;
