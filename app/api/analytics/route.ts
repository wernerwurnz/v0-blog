import { type NextRequest, NextResponse } from "next/server"
import { getAnalyticsData, getPopularPosts } from "@/lib/analytics"
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
    // Get analytics data
    const analyticsData = await getAnalyticsData()

    // Get popular posts
    const popularPosts = await getPopularPosts(10)

    // Return combined data
    return NextResponse.json({
      ...analyticsData,
      popularPosts,
    })
  } catch (error) {
    console.error("Error in analytics API:", error)
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 })
  }
}
