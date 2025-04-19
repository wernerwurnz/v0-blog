import { notFound } from "next/navigation"
import { BlogLayout } from "@/components/layout/blog-layout"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getTagBySlug, getTags, getPostsByTagSlug } from "@/actions/tags"
import { getCategories } from "@/actions/categories"

interface TagPageProps {
  params: {
    slug: string
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = await getTagBySlug(params.slug)

  if (!tag) {
    notFound()
  }

  const tagPosts = await getPostsByTagSlug(params.slug)
  const categories = await getCategories()
  const tags = await getTags()

  return (
    <BlogLayout sidebar={<BlogSidebar categories={categories} tags={tags} />}>
      <Section size="sm" className="px-0">
        <SectionHeader
          title={`#${tag.name}`}
          description={`Articles and resources related to ${tag.name.toLowerCase()} for your event planning needs.`}
          align="left"
        />
      </Section>

      <Separator className="my-8" />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tagPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {tagPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found with this tag.</p>
        </div>
      )}

      {tagPosts.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Button size="lg">Load More Posts</Button>
        </div>
      )}
    </BlogLayout>
  )
}
