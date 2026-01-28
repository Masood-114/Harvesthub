import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["admin", "user"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: "confirmPassword",
  });
export const logInSchema = z.object({
  name: z.string.min(3, "Name is required"),
  password: z.string().min(6, "Min 6 characters"),
});
