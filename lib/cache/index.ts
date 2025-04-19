import { redis } from "@/lib/redis/client"

// Default cache expiration time (24 hours)
const DEFAULT_EXPIRATION = 60 * 60 * 24

// Cache key prefix
const CACHE_PREFIX = "cache:"

// Generate a cache key
function getCacheKey(key: string): string {
  return `${CACHE_PREFIX}${key}`
}

// Set data in cache
export async function setCache<T>(key: string, data: T, expiration = DEFAULT_EXPIRATION): Promise<void> {
  try {
    const cacheKey = getCacheKey(key)
    await redis.set(cacheKey, JSON.stringify(data), { ex: expiration })
  } catch (error) {
    console.error("Error setting cache:", error)
  }
}

// Get data from cache
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const cacheKey = getCacheKey(key)
    const data = await redis.get<string>(cacheKey)

    if (!data) return null

    return JSON.parse(data) as T
  } catch (error) {
    console.error("Error getting cache:", error)
    return null
  }
}

// Delete data from cache
export async function deleteCache(key: string): Promise<void> {
  try {
    const cacheKey = getCacheKey(key)
    await redis.del(cacheKey)
  } catch (error) {
    console.error("Error deleting cache:", error)
  }
}

// Clear all cache
export async function clearCache(): Promise<void> {
  try {
    const keys = await redis.keys(`${CACHE_PREFIX}*`)

    if (keys.length > 0) {
      await redis.del(...keys)
    }
  } catch (error) {
    console.error("Error clearing cache:", error)
  }
}

// Cache wrapper function for async operations
export async function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  expiration = DEFAULT_EXPIRATION,
): Promise<T> {
  try {
    // Try to get data from cache
    const cachedData = await getCache<T>(key)

    // If data exists in cache, return it
    if (cachedData) {
      return cachedData
    }

    // If not in cache, fetch data
    const data = await fetchFn()

    // Store in cache for next time
    await setCache(key, data, expiration)

    return data
  } catch (error) {
    console.error("Error with cache operation:", error)
    // If cache fails, just execute the function
    return fetchFn()
  }
}
