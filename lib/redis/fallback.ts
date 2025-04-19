/**
 * A fallback implementation for when Redis is not available
 * This provides the same interface but uses in-memory storage
 */
class FallbackCache {
  private cache: Map<string, any> = new Map()

  async get(key: string) {
    return this.cache.get(key)
  }

  async set(key: string, value: any, options?: { ex?: number }) {
    this.cache.set(key, value)

    // If expiration is set, create a timeout to delete the key
    if (options?.ex) {
      setTimeout(() => {
        this.cache.delete(key)
      }, options.ex * 1000)
    }

    return "OK"
  }

  async incr(key: string) {
    const value = (this.cache.get(key) || 0) + 1
    this.cache.set(key, value)
    return value
  }

  async hset(key: string, field: string, value: any) {
    const hash = this.cache.get(key) || {}
    hash[field] = value
    this.cache.set(key, hash)
    return 1
  }

  async hget(key: string, field: string) {
    const hash = this.cache.get(key) || {}
    return hash[field]
  }

  async hgetall(key: string) {
    return this.cache.get(key) || {}
  }

  async hincrby(key: string, field: string, increment: number) {
    const hash = this.cache.get(key) || {}
    hash[field] = (hash[field] || 0) + increment
    this.cache.set(key, hash)
    return hash[field]
  }

  async del(key: string) {
    return this.cache.delete(key) ? 1 : 0
  }

  async ping() {
    return "PONG"
  }

  // Add other Redis methods as needed
}

export const fallbackCache = new FallbackCache()
