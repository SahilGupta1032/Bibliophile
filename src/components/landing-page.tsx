"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { Book, Library, Users } from "lucide-react"

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="flex items-center space-x-2">
            <Library className="h-6 w-6" />
            <span className="font-bold">Bibliophile</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/auth/signin"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className={buttonVariants({ variant: "default" })}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <motion.h1
              className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your personal library, beautifully organized.
            </motion.h1>
            <motion.p
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Bibliophile is a minimalist and elegant book tracker. Meticulously track, manage, and rediscover your book collection with a seamless and intuitive experience.
            </motion.p>
            <motion.div
              className="space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/auth/signup" className={buttonVariants({ size: "lg" })}>
                Get Started
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Bibliophile is packed with features to help you manage your library.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Book className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Book Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Add, edit, and delete books with a simple and intuitive interface.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Library className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Library View</h3>
                  <p className="text-sm text-muted-foreground">
                    View your entire library in a beautiful and customizable grid.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Users className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with other readers and discover new books.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
