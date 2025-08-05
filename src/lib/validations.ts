import { z } from "zod"
import { Genre } from "@prisma/client"

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.nativeEnum(Genre),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  rating: z.number().int().min(1).max(5).optional(),
  description: z.string().optional(),
  isRead: z.boolean().optional().default(false),
})

// Form schema for client-side forms (isRead required)
export const bookFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.nativeEnum(Genre),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  rating: z.number().int().min(1).max(5).optional(),
  description: z.string().optional(),
  isRead: z.boolean(),
})

export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
export type BookFormData = z.infer<typeof bookFormSchema>
