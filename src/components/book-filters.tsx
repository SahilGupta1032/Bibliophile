"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Genre } from "@prisma/client"

export function BookFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      params.delete('page') // Reset to first page when filtering
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = (value: string) => {
    router.push(`/dashboard?${createQueryString('q', value)}`)
  }

  const handleGenreChange = (value: string) => {
    router.push(`/dashboard?${createQueryString('genre', value === 'ALL' ? '' : value)}`)
  }

  const handleStatusChange = (value: string) => {
    router.push(`/dashboard?${createQueryString('status', value === 'ALL' ? '' : value)}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by title or author..."
          className="pl-10"
          defaultValue={searchParams.get('q') ?? ''}
          onChange={(e) => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(() => handleSearch(e.target.value), 300)
          }}
        />
      </div>
      
      <Select
        defaultValue={searchParams.get('genre') ?? 'ALL'}
        onValueChange={handleGenreChange}
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Genres</SelectItem>
          {Object.values(Genre).map(genre => (
            <SelectItem key={genre} value={genre}>
              {genre.replace('_', ' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={searchParams.get('status') ?? 'ALL'}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Books" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Books</SelectItem>
          <SelectItem value="READ">Read</SelectItem>
          <SelectItem value="UNREAD">Unread</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
