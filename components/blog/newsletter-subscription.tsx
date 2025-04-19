"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { subscribeToNewsletter } from "@/actions/newsletter"

interface NewsletterSubscriptionProps {
  variant?: "card" | "inline"
}

export function NewsletterSubscription({ variant = "card" }: NewsletterSubscriptionProps) {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await subscribeToNewsletter(email, name)

      if (result.error) {
        throw new Error(result.error.message)
      }

      toast({
        title: "Success",
        description: result.message || "Thank you for subscribing to our newsletter!",
      })

      setEmail("")
      setName("")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === "inline") {
    return (
      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-muted-foreground mb-4">
          Get the latest event planning tips, trends, and inspiration delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-evenizer-purple hover:bg-evenizer-purple/90" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter</CardTitle>
        <CardDescription>Get the latest updates in your inbox</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
