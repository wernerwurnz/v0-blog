"use client"

import { Button } from "@/components/ui/button"
import { Share2, Bookmark, Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BlogPostActionsProps {
  postId: string
  title: string
  url: string
}

export function BlogPostActions({ postId, title, url }: BlogPostActionsProps) {
  const { toast } = useToast()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url)
        toast({
          title: "Link copied",
          description: "The post link has been copied to your clipboard.",
        })
      } catch (error) {
        console.error("Error copying to clipboard:", error)
        toast({
          title: "Error",
          description: "Failed to copy link. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleBookmark = () => {
    toast({
      title: "Post bookmarked",
      description: "This post has been added to your bookmarks.",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="gap-1" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <Button variant="ghost" size="sm" className="gap-1" onClick={handleBookmark}>
        <Bookmark className="h-4 w-4" />
        Bookmark
      </Button>
      <Button variant="ghost" size="sm" className="gap-1" onClick={handlePrint}>
        <Printer className="h-4 w-4" />
        Print
      </Button>
    </div>
  )
}

export default BlogPostActions
