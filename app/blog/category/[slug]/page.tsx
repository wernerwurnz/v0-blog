import { notFound } from "next/navigation"
import { BlogLayout } from "@/components/layout/blog-layout"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getCategoryBySlug, getCategories } from "@/actions/categories"
import { getPosts } from "@/actions/posts"
import { getTags } from "@/actions/tags"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const { posts: categoryPosts } = await getPosts({ categorySlug: params.slug })
  const categories = await getCategories()
  const tags = await getTags()

  return (
    <BlogLayout sidebar={<BlogSidebar categories={categories} tags={tags} />}>
      <Section size="sm" className="px-0">
        <SectionHeader
          title={`${category.name} Articles`}
          description={
            category.description ||
            `Expert tips, guides, and inspiration for planning perfect ${category.name.toLowerCase()} from the comfort of your home.`
          }
          align="left"
        />
      </Section>

      <Separator className="my-8" />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categoryPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {categoryPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found in this category.</p>
        </div>
      )}

      {categoryPosts.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Button size="lg">Load More Posts</Button>
        </div>
      )}
    </BlogLayout>
  )
}
