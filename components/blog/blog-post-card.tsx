import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, User } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string
  image_url?: string
  created_at: string
  read_time?: string
  category?: {
    id: string
    name: string
  }
  author?: {
    id: string
    full_name: string
    avatar_url?: string
  }
}

interface BlogPostCardProps {
  post: Post
  variant?: "default" | "featured" | "compact"
}

export function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  return (
    <div className="h-full">
      <Card className="overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.image_url || "/placeholder.svg?height=400&width=600&query=event"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
          {post.category && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-md">
              {post.category.name}
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300 hover:text-primary">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3.5 w-3.5 text-primary" />
                {formatDate(post.created_at)}
              </div>
              {post.read_time && <div className="text-sm text-muted-foreground">{post.read_time} min read</div>}
            </div>

            <Link href={`/blog/${post.slug}`} className="group inline-flex items-center font-medium text-primary">
              <span className="relative">
                <span className="relative z-10">READ MORE</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </span>
              <span className="ml-2 inline-flex">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {post.author && variant !== "compact" && (
            <div className="flex items-center mt-4 pt-4 border-t">
              {post.author.avatar_url ? (
                <Image
                  src={post.author.avatar_url || "/placeholder.svg?height=32&width=32&query=person"}
                  alt={post.author.full_name || "Author"}
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                  <User className="h-4 w-4 text-primary" />
                </div>
              )}
              <span className="text-sm font-medium">{post.author.full_name}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogPostCard
