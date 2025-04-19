import { redis } from "@/lib/redis/client"
import { type NextRequest, NextResponse } from "next/server"

export interface RateLimitConfig {
  // Maximum number of requests allowed within the window
  limit: number
  // Time window in seconds
  window: number
  // Optional identifier for the rate limit (defaults to IP)
  identifier?: string
}

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig,
): Promise<{
  success: boolean
  limit: number
  remaining: number
  reset: number
}> {
  try {
    const { limit, window } = config

    // Get identifier (use IP if not provided)
    const identifier = config.identifier || request.ip || "anonymous"

    // Create a unique key for this rate limit
    const key = `rate-limit:${identifier}`

    // Get current count and timestamp
    const [count, timestamp] = await redis.mget<[number, number]>([key, `${key}:timestamp`])

    const currentTime = Math.floor(Date.now() / 1000)
    const reset = (timestamp || currentTime) + window

    // Check if window has expired
    if (timestamp && currentTime > timestamp + window) {
      // Window expired, reset counter
      await redis.set(key, 1, { ex: window })
      await redis.set(`${key}:timestamp`, currentTime, { ex: window })

      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset,
      }
    }

    // If first request in this window
    if (!count) {
      await redis.set(key, 1, { ex: window })
      await redis.set(`${key}:timestamp`, currentTime, { ex: window })

      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset,
      }
    }

    // Increment counter
    const newCount = count + 1

    // Check if over limit
    if (newCount > limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        reset,
      }
    }

    // Update counter
    await redis.incr(key)

    return {
      success: true,
      limit,
      remaining: limit - newCount,
      reset,
    }
  } catch (error) {
    console.error("Rate limit error:", error)

    // If Redis fails, allow the request
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: Math.floor(Date.now() / 1000) + config.window,
    }
  }
}

// Middleware for rate limiting
export function rateLimitMiddleware(config: RateLimitConfig) {
  return async function middleware(request: NextRequest) {
    const result = await rateLimit(request, config)

    // If rate limit exceeded
    if (!result.success) {
      return NextResponse.json(
        { error: "Too Many Requests", message: "Rate limit exceeded" },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit.toString(),
            "X-RateLimit-Remaining": result.remaining.toString(),
            "X-RateLimit-Reset": result.reset.toString(),
            "Retry-After": (result.reset - Math.floor(Date.now() / 1000)).toString(),
          },
        },
      )
    }

    // Continue with the request
    const response = NextResponse.next()

    // Add rate limit headers
    response.headers.set("X-RateLimit-Limit", result.limit.toString())
    response.headers.set("X-RateLimit-Remaining", result.remaining.toString())
    response.headers.set("X-RateLimit-Reset", result.reset.toString())

    return response
  }
}
