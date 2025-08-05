"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { deleteBook } from "@/lib/actions/books"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface DeleteBookDialogProps {
  book: {
    id: string
    title: string
    author: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteBookDialog({ book, open, onOpenChange }: DeleteBookDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteBook(book.id)
      if (result.success) {
        toast.success("Book deleted successfully!")
        onOpenChange(false)
      } else {
        toast.error(result.error)
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{book.title}&quot; by {book.author}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Book
          </Button>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
