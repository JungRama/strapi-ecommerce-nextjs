import { z } from "zod";

/* ---------------------------- LOGIN VALIDATION ---------------------------- */
export const ValidationFormLogin = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),

  password: z.string().min(1, { message: "Password is required" }),
});

export type ValidationFormLoginSchema = z.infer<typeof ValidationFormLogin>;

/* --------------------------- REGISTER VALIDATION -------------------------- */
export const ValidationFormRegister = z
  .object({
    name: z.string().min(1, { message: "Email is required" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be a valid email" }),

    password: z.string().min(1, { message: "Password is required" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: `Password don't match`,
  });

export type ValidationFormRegisterSchema = z.infer<
  typeof ValidationFormRegister
>;
