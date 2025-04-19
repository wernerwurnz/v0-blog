import Link from "next/link"
import { BlogLayout } from "@/components/layout/blog-layout"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { Separator } from "@/components/ui/separator"

export default function TagsPage() {
  // This would normally be fetched from a database
  const tags = [
    { name: "Wedding Planning", slug: "wedding-planning", count: 8 },
    { name: "Budget Tips", slug: "budget-tips", count: 12 },
    { name: "Decoration Ideas", slug: "decoration-ideas", count: 15 },
    { name: "Virtual Events", slug: "virtual-events", count: 10 },
    { name: "Catering", slug: "catering", count: 7 },
    { name: "Entertainment", slug: "entertainment", count: 9 },
    { name: "Venue Selection", slug: "venue-selection", count: 11 },
    { name: "Guest Management", slug: "guest-management", count: 6 },
    { name: "Photography", slug: "photography", count: 5 },
    { name: "Invitations", slug: "invitations", count: 4 },
    { name: "Wedding Dress", slug: "wedding-dress", count: 7 },
    { name: "Flowers", slug: "flowers", count: 6 },
    { name: "Music", slug: "music", count: 8 },
    { name: "Honeymoon", slug: "honeymoon", count: 5 },
    { name: "Corporate Events", slug: "corporate-events", count: 9 },
    { name: "Birthday Parties", slug: "birthday-parties", count: 10 },
    { name: "Baby Showers", slug: "baby-showers", count: 6 },
    { name: "Graduation Parties", slug: "graduation-parties", count: 4 },
    { name: "Holiday Parties", slug: "holiday-parties", count: 7 },
    { name: "Outdoor Events", slug: "outdoor-events", count: 8 },
  ]

  // Sort tags by count (most popular first)
  const sortedTags = [...tags].sort((a, b) => b.count - a.count)

  return (
    <BlogLayout sidebar={<BlogSidebar />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Tags</h1>
          <p className="text-muted-foreground">Browse all our event planning topics</p>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-3">
          {sortedTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tag/${tag.slug}`}
              className="inline-flex items-center justify-between rounded-lg border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
            >
              <span className="mr-2">{tag.name}</span>
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs text-primary">{tag.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </BlogLayout>
  )
}
