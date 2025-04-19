import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Archive, Grid, Hash, Home, Users } from "lucide-react"

export function BlogNavigation() {
  const navItems = [
    { name: "Home", href: "/blog", icon: Home },
    { name: "Categories", href: "/blog/categories", icon: Grid },
    { name: "Tags", href: "/blog/tags", icon: Hash },
    { name: "Archive", href: "/blog/archive", icon: Archive },
    { name: "Authors", href: "/blog/authors", icon: Users },
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
      {navItems.map((item) => (
        <Button key={item.name} variant="ghost" size="sm" asChild className="gap-1">
          <Link href={item.href}>
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        </Button>
      ))}
    </div>
  )
}
