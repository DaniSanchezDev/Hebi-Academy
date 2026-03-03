import { z } from "zod"

export const formSchema = z.object({
  title: z.string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(200, { message: "Title cannot exceed 200 characters" }),
  description: z.string()
    .min(2, { message: "Description must be at least 2 characters" })
    .max(400, { message: "Description cannot exceed 400 characters" }),
  isFree: z.boolean()
})
