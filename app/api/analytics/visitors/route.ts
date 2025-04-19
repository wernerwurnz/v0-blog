import { type NextRequest, NextResponse } from "next/server"
import { getActiveVisitorCount, getDailyVisitorCount, getVisitorStats } from "@/lib/analytics/visitor-tracking"
import { rateLimitMiddleware } from "@/lib/rate-limit"

// Rate limit configuration: 60 requests per minute
const rateLimiter = rateLimitMiddleware({
  limit: 60,
  window: 60, // 1 minute
})

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await rateLimiter(request)

  // If rate limit response is not a NextResponse.next(), return it
  if (!(rateLimitResponse instanceof NextResponse && rateLimitResponse.status === 200)) {
    return rateLimitResponse
  }

  try {
    // Get visitor data
    const [activeVisitors, dailyVisitors, visitorStats] = await Promise.all([
      getActiveVisitorCount(),
      getDailyVisitorCount(),
      getVisitorStats(),
    ])

    // Return data
    return NextResponse.json({
      activeVisitors,
      dailyVisitors,
      visitorStats,
    })
  } catch (error) {
    console.error("Error in visitors API:", error)
    return NextResponse.json({ error: "Failed to fetch visitor data" }, { status: 500 })
  }
}
