"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FavoritesButtonProps {
  postId: string
  initialIsFavorite?: boolean
}

export function FavoritesButton({ postId, initialIsFavorite = false }: FavoritesButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const { toast } = useToast()

  const toggleFavorite = () => {
    const newState = !isFavorite
    setIsFavorite(newState)

    // Show toast notification
    toast({
      title: newState ? "Added to favorites" : "Removed from favorites",
      description: newState
        ? "This post has been added to your favorites."
        : "This post has been removed from your favorites.",
    })

    // In a real app, you would make an API call here to update the user's favorites
  }

  return (
    <Button variant="ghost" size="sm" className={`gap-1 ${isFavorite ? "text-primary" : ""}`} onClick={toggleFavorite}>
      <Heart className={`h-4 w-4 ${isFavorite ? "fill-primary" : ""}`} />
      {isFavorite ? "Saved" : "Save"}
    </Button>
  )
}
