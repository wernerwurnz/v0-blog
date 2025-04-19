import { Redis } from "@upstash/redis"
import { fallbackCache } from "./fallback"

// Try to create a Redis client, fall back to in-memory implementation if it fails
let redisClient: Redis | typeof fallbackCache

try {
  // Only initialize Redis if the required environment variables are available
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redisClient = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
    console.log("Redis client initialized successfully")
  } else {
    console.warn("Redis environment variables not found, using fallback cache")
    redisClient = fallbackCache
  }
} catch (error) {
  console.error("Failed to initialize Redis client:", error)
  redisClient = fallbackCache
}

export const redis = redisClient

// Helper function to check if Redis is available
export async function isRedisAvailable() {
  try {
    const result = await redis.ping()
    return result === "PONG"
  } catch (error) {
    console.error("Redis connection error:", error)
    return false
  }
}

// Helper function to check if we're using the real Redis or the fallback
export function isUsingRealRedis() {
  return redis !== fallbackCache
}
