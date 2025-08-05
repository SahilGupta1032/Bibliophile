"use server"

import { prisma } from "@/lib/prisma"
import { signUpSchema } from "@/lib/validations"
import bcrypt from "bcryptjs"

export async function signUpAction(formData: FormData) {
  const result = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid form data",
    }
  }

  const { name, email, password } = result.data

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        success: false,
        error: "User with this email already exists",
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return {
      success: true,
      message: "Account created successfully",
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}

// Sign in will be handled by NextAuth directly in the client component
