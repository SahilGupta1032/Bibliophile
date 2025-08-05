import { Suspense } from "react"
import { redirect } from "next/navigation"
import { BookList, BookListSkeleton } from "@/components/book-list"
import { DashboardHeader } from "@/components/dashboard-header"
import { auth } from "@/lib/auth"

export default async function DashboardPage({ searchParams }: {
  searchParams?: Promise<{
    page?: string;
    q?: string;
    genre?: string;
    status?: string;
  }>
}) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const params = await searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <Suspense fallback={<BookListSkeleton />}>
        <BookList
          currentPage={Number(params?.page) || 1}
          query={params?.q}
          genre={params?.genre}
          status={params?.status}
        />
      </Suspense>
    </div>
  )
}
