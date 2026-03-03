import { z } from "zod"
 

export const formSchema = z.object({
    courseName: z.string().min(2).max(150),
    slug: z.string().min(2).max(150)
})
