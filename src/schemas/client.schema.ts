import * as z from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().min(8, "Phone number is too short"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type ClientFormData = z.infer<typeof clientSchema>;
