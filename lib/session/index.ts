import { redis } from "@/lib/redis/client"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

// Session expiration time (7 days)
const SESSION_EXPIRATION = 60 * 60 * 24 * 7

// Session key prefix
const SESSION_PREFIX = "session:"

// Generate a session key
function getSessionKey(sessionId: string): string {
  return `${SESSION_PREFIX}${sessionId}`
}

// Create a new session
export async function createSession(data: Record<string, any> = {}): Promise<string> {
  try {
    // Generate a unique session ID
    const sessionId = uuidv4()
    const sessionKey = getSessionKey(sessionId)

    // Store session data in Redis
    await redis.set(sessionKey, JSON.stringify(data), { ex: SESSION_EXPIRATION })

    // Set session cookie
    cookies().set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_EXPIRATION,
      path: "/",
      sameSite: "lax",
    })

    return sessionId
  } catch (error) {
    console.error("Error creating session:", error)
    return ""
  }
}

// Get session data
export async function getSession<T = Record<string, any>>(): Promise<T | null> {
  try {
    // Get session ID from cookie
    const sessionId = cookies().get("sessionId")?.value

    if (!sessionId) {
      return null
    }

    // Get session data from Redis
    const sessionKey = getSessionKey(sessionId)
    const data = await redis.get<string>(sessionKey)

    if (!data) {
      return null
    }

    // Refresh session expiration
    await redis.expire(sessionKey, SESSION_EXPIRATION)

    // Refresh cookie expiration
    cookies().set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_EXPIRATION,
      path: "/",
      sameSite: "lax",
    })

    return JSON.parse(data) as T
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

// Update session data
export async function updateSession(data: Record<string, any>): Promise<boolean> {
  try {
    // Get session ID from cookie
    const sessionId = cookies().get("sessionId")?.value

    if (!sessionId) {
      return false
    }

    // Get current session data
    const sessionKey = getSessionKey(sessionId)
    const currentData = await redis.get<string>(sessionKey)

    if (!currentData) {
      return false
    }

    // Merge current data with new data
    const mergedData = {
      ...JSON.parse(currentData),
      ...data,
    }

    // Update session data in Redis
    await redis.set(sessionKey, JSON.stringify(mergedData), { ex: SESSION_EXPIRATION })

    return true
  } catch (error) {
    console.error("Error updating session:", error)
    return false
  }
}

// Delete session
export async function deleteSession(): Promise<boolean> {
  try {
    // Get session ID from cookie
    const sessionId = cookies().get("sessionId")?.value

    if (!sessionId) {
      return false
    }

    // Delete session data from Redis
    const sessionKey = getSessionKey(sessionId)
    await redis.del(sessionKey)

    // Delete session cookie
    cookies().delete("sessionId")

    return true
  } catch (error) {
    console.error("Error deleting session:", error)
    return false
  }
}
