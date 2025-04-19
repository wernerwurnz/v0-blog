import { BlogPostCard } from "@/components/blog/blog-post-card"

interface RelatedPostsProps {
  posts: Array<{
    id: string
    title: string
    excerpt: string
    image: string
    date: string
    category?: string
  }>
  title?: string
}

export function RelatedPosts({ posts, title = "Related Posts" }: RelatedPostsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} variant="compact" />
        ))}
      </div>
    </div>
  )
}
