import { auth } from "@/lib/auth"
import { LandingPage } from "@/components/landing-page"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (session?.user?.id) {
    redirect("/dashboard")
  }

  return <LandingPage />
}
