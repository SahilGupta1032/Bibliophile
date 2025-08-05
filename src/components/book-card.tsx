"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Book, BookOpen, Star, MoreVertical, Edit, Trash2 } from "lucide-react"
import { toggleBookStatus } from "@/lib/actions/books"
import { toast } from "sonner"
import { EditBookDialog } from "@/components/edit-book-dialog"
import { DeleteBookDialog } from "@/components/delete-book-dialog"

interface BookCardProps {
  book: {
    id: string
    title: string
    author: string
    genre: string
    publishedYear: number
    rating?: number | null
    isRead: boolean
    description?: string | null
  }
}

export function BookCard({ book }: BookCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleToggleStatus = async () => {
    setIsToggling(true)
    try {
      const result = await toggleBookStatus(book.id)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.error)
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg leading-tight truncate" title={book.title}>
                  {book.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1" title={book.author}>
                  by {book.author}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {book.genre.replace('_', ' ')}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {book.publishedYear}
                </span>
              </div>

              {book.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="text-sm font-medium">{book.rating}/5</span>
                </div>
              )}

              {book.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              onClick={handleToggleStatus}
              disabled={isToggling}
              variant={book.isRead ? "secondary" : "default"}
              size="sm"
              className="w-full"
            >
              {book.isRead ? (
                <>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Mark as Unread
                </>
              ) : (
                <>
                  <Book className="mr-2 h-4 w-4" />
                  Mark as Read
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <EditBookDialog
        book={book}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />

      <DeleteBookDialog
        book={book}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  )
}
