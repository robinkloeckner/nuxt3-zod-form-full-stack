import { z } from "zod"

// Define zod schemas for data validation.
export const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid E-Mail address." }),
    age: z.number({ message: "Enter a number." }).int().positive({ message: "Enter a number greater than 0." }),
    message: z.string().min(10, { message: "Please enter a message." }),
})

// Define types.
export type FormData = z.infer<typeof formSchema>
export type FormErrors = Partial<Record<keyof FormData, string>>
