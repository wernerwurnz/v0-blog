import { type NextRequest, NextResponse } from "next/server"
import { getPopularPosts } from "@/lib/analytics"
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
    // Get popular posts (limit to 5)
    const popularPosts = await getPopularPosts(5)

    // Return data
    return NextResponse.json(popularPosts)
  } catch (error) {
    console.error("Error in popular posts API:", error)
    return NextResponse.json({ error: "Failed to fetch popular posts" }, { status: 500 })
  }
}
