"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { bookSchema } from "@/lib/validations"
import { auth } from "@/lib/auth"

export async function createBook(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const result = bookSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    genre: formData.get("genre"),
    publishedYear: parseInt(formData.get("publishedYear") as string),
    rating: formData.get("rating") ? parseInt(formData.get("rating") as string) : undefined,
    description: formData.get("description") || undefined,
    isRead: formData.get("isRead") === "true",
  })

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid form data",
    }
  }

  try {
    await prisma.book.create({
      data: {
        ...result.data,
        userId: session.user.id,
      },
    })

    revalidatePath("/dashboard")
    return {
      success: true,
      message: "Book added successfully",
    }
  } catch (error) {
    console.error("Create book error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}

export async function updateBook(bookId: string, formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const result = bookSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    genre: formData.get("genre"),
    publishedYear: parseInt(formData.get("publishedYear") as string),
    rating: formData.get("rating") ? parseInt(formData.get("rating") as string) : undefined,
    description: formData.get("description") || undefined,
    isRead: formData.get("isRead") === "true",
  })

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid form data",
    }
  }

  try {
    // Verify book belongs to user
    const existingBook = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: session.user.id,
      },
    })

    if (!existingBook) {
      return {
        success: false,
        error: "Book not found",
      }
    }

    await prisma.book.update({
      where: { id: bookId },
      data: result.data,
    })

    revalidatePath("/dashboard")
    return {
      success: true,
      message: "Book updated successfully",
    }
  } catch (error) {
    console.error("Update book error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}

export async function deleteBook(bookId: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  try {
    // Verify book belongs to user
    const existingBook = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: session.user.id,
      },
    })

    if (!existingBook) {
      return {
        success: false,
        error: "Book not found",
      }
    }

    await prisma.book.delete({
      where: { id: bookId },
    })

    revalidatePath("/dashboard")
    return {
      success: true,
      message: "Book deleted successfully",
    }
  } catch (error) {
    console.error("Delete book error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}

export async function toggleBookStatus(bookId: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  try {
    // Get current book status
    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: session.user.id,
      },
    })

    if (!book) {
      return {
        success: false,
        error: "Book not found",
      }
    }

    await prisma.book.update({
      where: { id: bookId },
      data: {
        isRead: !book.isRead,
      },
    })

    revalidatePath("/dashboard")
    return {
      success: true,
      message: `Book marked as ${!book.isRead ? "read" : "unread"}`,
    }
  } catch (error) {
    console.error("Toggle book status error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}
