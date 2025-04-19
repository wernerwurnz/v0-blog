"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Eye, Users, Activity } from "lucide-react"
import { VisitorCounter } from "@/components/analytics/visitor-counter"

interface AnalyticsData {
  totalViews: number
  uniqueVisitors: number
  dailyViews: { date: string; views: number }[]
  popularPosts: {
    title: string
    slug: string
    views: number
  }[]
  visitorStats?: { date: string; count: number }[]
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [visitorData, setVisitorData] = useState<{
    activeVisitors: number
    dailyVisitors: number
    visitorStats: { date: string; count: number }[]
  } | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [analyticsResponse, visitorResponse] = await Promise.all([
          fetch("/api/analytics"),
          fetch("/api/analytics/visitors"),
        ])

        if (!analyticsResponse.ok) throw new Error("Failed to fetch analytics")
        if (!visitorResponse.ok) throw new Error("Failed to fetch visitor data")

        const analyticsData = await analyticsResponse.json()
        const visitorData = await visitorResponse.json()

        setData(analyticsData)
        setVisitorData(visitorData)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()

    // Refresh data every 5 minutes
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-evenizer-purple"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-muted-foreground">Failed to load analytics data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total page views across all posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Distinct users who visited the blog</p>
          </CardContent>
        </Card>

        <VisitorCounter />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Visitors</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorData ? visitorData.dailyVisitors.toLocaleString() : "0"}</div>
            <p className="text-xs text-muted-foreground">Unique visitors today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="views">
        <TabsList>
          <TabsTrigger value="views">Daily Views</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Trends</TabsTrigger>
          <TabsTrigger value="popular">Popular Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="views" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Views</CardTitle>
              <CardDescription>View count over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.dailyViews}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => {
                        const d = new Date(date)
                        return `${d.getMonth() + 1}/${d.getDate()}`
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [value.toLocaleString(), "Views"]}
                      labelFormatter={(label) => {
                        const d = new Date(label)
                        return d.toLocaleDateString()
                      }}
                    />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Trends</CardTitle>
              <CardDescription>Unique visitors over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                {visitorData && visitorData.visitorStats && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={visitorData.visitorStats}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(date) => {
                          const d = new Date(date)
                          return `${d.getMonth() + 1}/${d.getDate()}`
                        }}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) => [value.toLocaleString(), "Visitors"]}
                        labelFormatter={(label) => {
                          const d = new Date(label)
                          return d.toLocaleDateString()
                        }}
                      />
                      <Line type="monotone" dataKey="count" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Posts</CardTitle>
              <CardDescription>Most viewed posts on your blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.popularPosts}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="title"
                      width={80}
                      tickFormatter={(value) => (value.length > 20 ? `${value.substring(0, 20)}...` : value)}
                    />
                    <Tooltip formatter={(value: number) => [value.toLocaleString(), "Views"]} />
                    <Bar dataKey="views" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
