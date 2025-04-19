import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RelatedCategoriesProps {
  categories: {
    name: string
    slug: string
    count: number
  }[]
}

export function RelatedCategories({ categories }: RelatedCategoriesProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Related Categories</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-1">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="flex items-center justify-between py-1 text-sm hover:underline"
          >
            <span>{category.name}</span>
            <span className="text-muted-foreground text-xs">{category.count} posts</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
