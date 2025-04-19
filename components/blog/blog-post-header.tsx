import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface BlogPostHeaderProps {
  title: string
  excerpt?: string
  date: string
  readTime?: string
  category?: string
  author?: {
    name: string
    avatar?: string
    role?: string
  }
  tags?: string[]
}

export function BlogPostHeader({ title, excerpt, date, readTime, category, author, tags }: BlogPostHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Category */}
      {category && (
        <Link href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`} className="inline-block">
          <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-0">{category}</Badge>
        </Link>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h1>

      {/* Excerpt */}
      {excerpt && <p className="text-xl text-muted-foreground">{excerpt}</p>}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-6">
        {/* Author */}
        {author && (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{author.name}</div>
              {author.role && <div className="text-sm text-muted-foreground">{author.role}</div>}
            </div>
          </div>
        )}

        {/* Date and Read Time */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {date}
          </div>
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readTime}
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${tag.replace(/\s+/g, "-").toLowerCase()}`}>
              <Badge variant="outline" className="hover:bg-muted">
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogPostHeader
