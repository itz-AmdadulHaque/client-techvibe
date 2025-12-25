import { z } from "zod";
import { phoneNumberSchema } from "./common.validation";

export const profileSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  phone: phoneNumberSchema,
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export const addressSchema = z.object({
  address: z.string().min(5, "Please enter your detailed address"),
  district: z.string().min(5, "Please enter your district"),
  thana: z.string().min(5, "Please enter your thana"),
});

export type AddressSchema = z.infer<typeof addressSchema>;

export const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Please enter your current password."),
    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long")
      .refine((val) => {
        return /^(?=.*[A-Z])/.test(val);
      }, "Password must contain at least one uppercase letter")
      .refine((val) => {
        return /^(?=.*[a-z])/.test(val);
      }, "Password must contain at least one lowercase letter")
      .refine((val) => {
        return /^(?=.*[0-9])/.test(val);
      }, "Password must contain at least one number"),

    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type PasswordSchema = z.infer<typeof passwordSchema>;
