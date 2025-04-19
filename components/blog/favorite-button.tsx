"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FavoriteButtonProps {
  postId: string
}

export function FavoriteButton({ postId }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleToggleFavorite = async () => {
    setIsLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newState = !isFavorited
      setIsFavorited(newState)

      toast({
        title: newState ? "Post saved" : "Post removed",
        description: newState
          ? "This post has been added to your saved posts."
          : "This post has been removed from your saved posts.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`gap-1 ${isFavorited ? "text-primary" : ""}`}
      onClick={handleToggleFavorite}
      disabled={isLoading}
    >
      <Bookmark className={`h-4 w-4 ${isFavorited ? "fill-primary" : ""}`} />
      {isFavorited ? "Saved" : "Save"}
    </Button>
  )
}

export default FavoriteButton
