"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export function VisitorCounter() {
  const [activeVisitors, setActiveVisitors] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVisitorCount() {
      try {
        const response = await fetch("/api/analytics/visitors")
        if (!response.ok) throw new Error("Failed to fetch visitor count")
        const data = await response.json()
        setActiveVisitors(data.activeVisitors)
      } catch (error) {
        console.error("Error fetching visitor count:", error)
      } finally {
        setLoading(false)
      }
    }

    // Fetch initially
    fetchVisitorCount()

    // Set up polling every 30 seconds
    const interval = setInterval(fetchVisitorCount, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Visitors</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? <span className="animate-pulse">...</span> : activeVisitors}
        </div>
        <CardDescription>People currently browsing the site</CardDescription>
      </CardContent>
    </Card>
  )
}
