import { NextResponse } from "next/server"
import { isRedisAvailable, isUsingRealRedis } from "@/lib/redis"

export async function GET() {
  try {
    const connected = await isRedisAvailable()
    const usingRealRedis = isUsingRealRedis()

    return NextResponse.json({
      connected,
      usingRealRedis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error checking Redis status:", error)

    return NextResponse.json(
      {
        connected: false,
        usingRealRedis: false,
        error: "Failed to check Redis connection",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
