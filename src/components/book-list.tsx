import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { BookCard } from "@/components/book-card"
import { BookFilters } from "@/components/book-filters"
import { Pagination } from "@/components/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Genre } from "@prisma/client"

const BOOKS_PER_PAGE = 6

interface BookListProps {
  currentPage: number
  query?: string
  genre?: string
  status?: string
}

export async function BookList({ currentPage, query, genre, status }: BookListProps) {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const where = {
    userId: session.user.id,
    AND: [
      query ? {
        OR: [
          { title: { contains: query, mode: "insensitive" as const } },
          { author: { contains: query, mode: "insensitive" as const } },
        ],
      } : {},
      genre && genre !== "ALL" ? { genre: genre as Genre } : {},
      status ? { isRead: status.toLowerCase() === "read" } : {},
    ].filter(Boolean),
  }

  const [books, totalBooks] = await Promise.all([
    prisma.book.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * BOOKS_PER_PAGE,
      take: BOOKS_PER_PAGE,
    }),
    prisma.book.count({ where }),
  ])

  const totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE)

  return (
    <div className="space-y-6">
      <BookFilters />
      
      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No books found.</p>
          <p className="text-sm text-muted-foreground mt-2">
            {query || genre || status ? "Try adjusting your filters." : "Add your first book to get started!"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  )
}

export function BookListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    </div>
  )
}
