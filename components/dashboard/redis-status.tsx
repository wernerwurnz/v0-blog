"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export function RedisStatus() {
  const [status, setStatus] = useState<{
    state: "loading" | "connected" | "fallback" | "error"
    message?: string
  }>({ state: "loading" })

  useEffect(() => {
    async function checkRedisStatus() {
      try {
        const response = await fetch("/api/redis/status")
        if (response.ok) {
          const data = await response.json()
          if (data.connected && data.usingRealRedis) {
            setStatus({ state: "connected" })
          } else if (data.connected && !data.usingRealRedis) {
            setStatus({
              state: "fallback",
              message: "Using in-memory fallback (data will not persist between deployments)",
            })
          } else {
            setStatus({
              state: "error",
              message: data.error || "Unable to connect to Redis",
            })
          }
        } else {
          setStatus({ state: "error", message: "API response error" })
        }
      } catch (error) {
        console.error("Error checking Redis status:", error)
        setStatus({ state: "error", message: "Request failed" })
      }
    }

    checkRedisStatus()
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Redis Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {status.state === "loading" ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span>Checking connection...</span>
            </>
          ) : status.state === "connected" ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-500 font-medium">Connected</span>
            </>
          ) : status.state === "fallback" ? (
            <>
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span className="text-amber-500 font-medium">Fallback Mode</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-500 font-medium">Connection Error</span>
            </>
          )}
        </div>
        <CardDescription className="mt-1">
          {status.state === "connected"
            ? "Redis is properly configured and working"
            : status.state === "fallback"
              ? status.message
              : status.state === "error"
                ? status.message || "Check your Redis configuration"
                : "Verifying Redis connection"}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
