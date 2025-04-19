import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo.svg" alt="#Ahem Logo" width={100} height={30} className="h-8 w-auto" />
            </Link>
            <div className="hidden md:block text-sm font-medium">Dashboard</div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden md:flex">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Website
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <nav className="h-full py-4 px-2 space-y-1">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/posts">
              <Button variant="ghost" className="w-full justify-start">
                Posts
              </Button>
            </Link>
            <Link href="/dashboard/media">
              <Button variant="ghost" className="w-full justify-start">
                Media
              </Button>
            </Link>
            <Link href="/dashboard/comments">
              <Button variant="ghost" className="w-full justify-start">
                Comments
              </Button>
            </Link>
            <Link href="/dashboard/events">
              <Button variant="ghost" className="w-full justify-start">
                Events
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:py-8">{children}</main>
      </div>
    </div>
  )
}
