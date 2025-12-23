import { z } from "zod";
import { phoneNumberSchema } from "./common.validation";

export const productRequestSchema = z.object({
  title: z.string().min(2, {
    message: "Product Name must be at least 2 characters.",
  }),
  quantity: z.number().int().positive({
    message: "Quantity must be a positive integer.",
  }),
  phone: phoneNumberSchema,
  address: z.string().min(10, {
    message: "Delivery Address must be at least 10 characters.",
  }),
  district: z.string().min(3, {
    message: "District must be at least 3 characters.",
  }),
  thana: z.string().min(3, {
    message: "Thana must be at least 3 characters.",
  }),
  description: z.string().optional(),
  file: z
    .instanceof(File)

    .refine(
      (file) =>
        !file ||
        (file &&
          ["image/jpeg", "image/png", "application/pdf"].includes(file.type)),
      `File must be an image (JPEG/PNG) or a PDF.`
    )
    .refine(
      (file) => {
        const limit =
          file.type === "application/pdf" ? 10 * 1024 * 1024 : 1 * 1024 * 1024; // 10MB for PDF, 1MB for images
        return file.size <= limit;
      },
      {
        message: "File size exceeds the allowed limit.",
      }
    ),
});

export type ProductRequestType = z.infer<typeof productRequestSchema>;
