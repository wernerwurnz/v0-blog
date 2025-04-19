import { redis } from "@/lib/redis"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

// Keys for Redis
const KEYS = {
  ACTIVE_VISITORS: "active_visitors",
  VISITOR_LAST_SEEN: (id: string) => `visitor:${id}:last_seen`,
  VISITOR_PAGES: (id: string) => `visitor:${id}:pages`,
  TOTAL_VISITORS_TODAY: (date: string) => `visitors:${date}`,
}

// Time in seconds that a visitor is considered active
const ACTIVE_THRESHOLD = 5 * 60 // 5 minutes

// Track a visitor
export async function trackVisitor(page: string) {
  try {
    // Get or create visitor ID
    let visitorId = cookies().get("visitor_id")?.value

    if (!visitorId) {
      visitorId = uuidv4()
      cookies().set("visitor_id", visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
        sameSite: "lax",
      })
    }

    const now = Math.floor(Date.now() / 1000)
    const today = new Date().toISOString().split("T")[0]

    // Update last seen time
    await redis.set(KEYS.VISITOR_LAST_SEEN(visitorId), now, { ex: ACTIVE_THRESHOLD })

    // Add to active visitors set with expiration
    await redis.sadd(KEYS.ACTIVE_VISITORS, visitorId)

    // Track page visit
    await redis.sadd(KEYS.VISITOR_PAGES(visitorId), page)

    // Increment daily visitor count
    await redis.pfadd(KEYS.TOTAL_VISITORS_TODAY(today), visitorId)

    return visitorId
  } catch (error) {
    console.error("Error tracking visitor:", error)
    return null
  }
}

// Get active visitor count
export async function getActiveVisitorCount(): Promise<number> {
  try {
    // Clean up expired visitors first
    const visitors = await redis.smembers(KEYS.ACTIVE_VISITORS)
    const now = Math.floor(Date.now() / 1000)

    // Check each visitor's last seen time
    for (const visitorId of visitors) {
      const lastSeen = await redis.get<number>(KEYS.VISITOR_LAST_SEEN(visitorId))

      // If last seen is older than threshold, remove from active set
      if (!lastSeen || now - lastSeen > ACTIVE_THRESHOLD) {
        await redis.srem(KEYS.ACTIVE_VISITORS, visitorId)
      }
    }

    // Get updated count
    return await redis.scard(KEYS.ACTIVE_VISITORS)
  } catch (error) {
    console.error("Error getting active visitor count:", error)
    return 0
  }
}

// Get daily visitor count
export async function getDailyVisitorCount(date?: string): Promise<number> {
  try {
    const targetDate = date || new Date().toISOString().split("T")[0]
    return await redis.pfcount(KEYS.TOTAL_VISITORS_TODAY(targetDate))
  } catch (error) {
    console.error("Error getting daily visitor count:", error)
    return 0
  }
}

// Get visitor stats for the last 7 days
export async function getVisitorStats(): Promise<{ date: string; count: number }[]> {
  try {
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    const stats = await Promise.all(
      dates.map(async (date) => {
        const count = await getDailyVisitorCount(date)
        return { date, count }
      }),
    )

    return stats
  } catch (error) {
    console.error("Error getting visitor stats:", error)
    return []
  }
}
