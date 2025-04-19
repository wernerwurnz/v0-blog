"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface PopularPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  image_url?: string
  created_at: string
  views: number
  category?: {
    name: string
    slug: string
  }
}

export function PopularPosts() {
  const [posts, setPosts] = useState<PopularPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPopularPosts() {
      try {
        const response = await fetch("/api/posts/popular")
        if (!response.ok) throw new Error("Failed to fetch popular posts")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching popular posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularPosts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Popular Posts</h3>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-muted rounded-md"></div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Popular Posts</h3>
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex">
              <div className="relative w-20 h-20">
                <Image
                  src={post.image_url || "/placeholder.svg?height=80&width=80&query=event"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-3 flex-1">
                <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{formatDate(post.created_at)}</span>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
