"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Facebook, Link2, Linkedin, Share2, Twitter } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface SharePopupProps {
  title: string
  url: string
}

export function SharePopup({ title, url }: SharePopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard.",
    })
  }

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "bg-[#1877F2] text-white hover:bg-[#1877F2]/90",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this article</DialogTitle>
          <DialogDescription>Share this article with your friends and colleagues</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input value={url} readOnly className="w-full" onClick={(e) => e.currentTarget.select()} />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopyLink}>
            <span className="sr-only">Copy</span>
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              className={link.color}
              onClick={() => {
                window.open(link.url, "_blank", "noopener,noreferrer")
                setIsOpen(false)
              }}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
