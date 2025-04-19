"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, User } from "lucide-react"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

interface Comment {
  id: string
  content: string
  created_at: string
  user: {
    id: string
    full_name: string
    avatar_url?: string
  }
  likes: number
  isLiked?: boolean
  replies?: Comment[]
}

interface CommentsProps {
  postId: string
  initialComments: Comment[]
}

export function CommentsSection({ postId, initialComments }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const user = null // Replace with actual auth logic

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    setIsSubmitting(true)

    try {
      // Mock API call
      const newCommentObj = {
        id: Date.now().toString(),
        content: newComment,
        created_at: new Date().toISOString(),
        user: {
          id: "user-id",
          full_name: "Current User",
          avatar_url: "/placeholder.svg",
        },
        likes: 0,
        isLiked: false,
        replies: [],
      }

      setComments([...comments, newCommentObj])
      setNewComment("")
    } catch (error) {
      console.error("Failed to post comment", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

      {user ? (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            placeholder="Leave a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={!newComment.trim() || isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <div className="rounded-md bg-muted p-4 text-center">
          <p className="mb-2">Please sign in to leave a comment</p>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user.avatar_url || "/placeholder.svg"} alt={comment.user.full_name} />
                <AvatarFallback>{comment.user.full_name[0] || <User className="h-4 w-4" />}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{comment.user.full_name}</h4>
                    <p className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</p>
                  </div>
                </div>
                <div className="text-sm">{comment.content}</div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    <Heart className="mr-1 h-4 w-4" />
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentsSection
