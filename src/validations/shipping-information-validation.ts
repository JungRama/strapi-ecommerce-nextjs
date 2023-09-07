import { z } from "zod";

/* --------------------------- SHIPPING INFORMATION VALIDATION -------------------------- */
export const ValidationShippingInformation = z.object({
  name: z.string().min(1, { message: "Email is required" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),

  phone_number: z.string().min(1, { message: "Phone number is required" }),

  street_address: z.string().min(1, { message: "Street address is required" }),

  country: z.string().min(1, { message: "Country is required" }),

  state: z.string().min(1, { message: "State is required" }),

  city: z.string().min(1, { message: "State is required" }),

  zip_code: z.string().min(1, { message: "Zip Code is required" }),
});

export type ValidationShippingInformationSchema = z.infer<
  typeof ValidationShippingInformation
>;
