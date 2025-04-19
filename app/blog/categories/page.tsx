import Link from "next/link"
import { BlogLayout } from "@/components/layout/blog-layout"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CategoriesPage() {
  // This would normally be fetched from a database
  const categories = [
    {
      name: "Weddings",
      slug: "weddings",
      count: 12,
      description: "Planning guides and inspiration for your special day",
    },
    {
      name: "Corporate Events",
      slug: "corporate-events",
      count: 8,
      description: "Tips for successful business gatherings and conferences",
    },
    {
      name: "Birthday Parties",
      slug: "birthday-parties",
      count: 10,
      description: "Creative ideas for memorable birthday celebrations",
    },
    {
      name: "Virtual Events",
      slug: "virtual-events",
      count: 15,
      description: "How to plan and host engaging online gatherings",
    },
    {
      name: "Event Planning",
      slug: "event-planning",
      count: 20,
      description: "Professional advice on organizing any type of event",
    },
    { name: "Catering", slug: "catering", count: 7, description: "Food and beverage planning for your events" },
    { name: "Decorations", slug: "decorations", count: 14, description: "Design ideas and themes for any occasion" },
    {
      name: "Entertainment",
      slug: "entertainment",
      count: 9,
      description: "Music, performances, and activities for your guests",
    },
    { name: "Venues", slug: "venues", count: 11, description: "Finding and selecting the perfect location" },
    {
      name: "Budget Planning",
      slug: "budget-planning",
      count: 13,
      description: "Managing costs and getting the most value",
    },
  ]

  return (
    <BlogLayout sidebar={<BlogSidebar />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Categories</h1>
          <p className="text-muted-foreground">Browse all our event planning categories</p>
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <Card key={category.slug}>
              <CardHeader className="pb-3">
                <CardTitle>
                  <Link href={`/blog/category/${category.slug}`} className="hover:text-primary transition-colors">
                    {category.name}
                  </Link>
                </CardTitle>
                <CardDescription>{category.count} articles</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <Link
                  href={`/blog/category/${category.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View Articles
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BlogLayout>
  )
}
