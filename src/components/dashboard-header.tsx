"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { CreateBookDialog } from "@/components/create-book-dialog"
import { PlusCircle, LogOut } from "lucide-react"

export function DashboardHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold tracking-tight">My Library</h1>
      <div className="flex items-center space-x-4">
        <Button onClick={() => setShowCreateDialog(true)}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Book
        </Button>
        <Button variant="outline" onClick={() => signOut()}>
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
      <CreateBookDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </header>
  )
}
