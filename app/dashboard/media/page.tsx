import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, List, Plus, Search } from "lucide-react"

export default function MediaPage() {
  // Sample media items
  const mediaItems = [
    {
      id: 1,
      name: "wedding-planning.jpg",
      type: "image/jpeg",
      size: "1.2 MB",
      dimensions: "1920x1080",
      uploaded: "April 15, 2024",
      url: "/placeholder.svg?height=200&width=300&query=wedding",
    },
    {
      id: 2,
      name: "birthday-party.jpg",
      type: "image/jpeg",
      size: "0.8 MB",
      dimensions: "1600x900",
      uploaded: "April 10, 2024",
      url: "/placeholder.svg?height=200&width=300&query=birthday",
    },
    {
      id: 3,
      name: "corporate-event.jpg",
      type: "image/jpeg",
      size: "1.5 MB",
      dimensions: "1920x1080",
      uploaded: "April 5, 2024",
      url: "/placeholder.svg?height=200&width=300&query=corporate",
    },
    {
      id: 4,
      name: "baby-shower.jpg",
      type: "image/jpeg",
      size: "0.9 MB",
      dimensions: "1600x900",
      uploaded: "March 28, 2024",
      url: "/placeholder.svg?height=200&width=300&query=baby shower",
    },
    {
      id: 5,
      name: "home-office.jpg",
      type: "image/jpeg",
      size: "1.1 MB",
      dimensions: "1920x1080",
      uploaded: "March 20, 2024",
      url: "/placeholder.svg?height=200&width=300&query=home office",
    },
    {
      id: 6,
      name: "team-building.jpg",
      type: "image/jpeg",
      size: "1.3 MB",
      dimensions: "1600x900",
      uploaded: "March 15, 2024",
      url: "/placeholder.svg?height=200&width=300&query=team building",
    },
    {
      id: 7,
      name: "holiday-party.jpg",
      type: "image/jpeg",
      size: "1.0 MB",
      dimensions: "1920x1080",
      uploaded: "March 10, 2024",
      url: "/placeholder.svg?height=200&width=300&query=holiday party",
    },
    {
      id: 8,
      name: "eco-friendly.jpg",
      type: "image/jpeg",
      size: "0.7 MB",
      dimensions: "1600x900",
      uploaded: "March 5, 2024",
      url: "/placeholder.svg?height=200&width=300&query=eco friendly",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Files</CardTitle>
          <CardDescription>Manage your images and other media files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search media..." className="pl-8" />
            </div>
            <Tabs defaultValue="grid" className="w-auto">
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaItems.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-md border bg-background">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.dimensions} • {item.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-3 font-medium border-b">
                <div className="col-span-5">Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-3">Uploaded</div>
              </div>
              {mediaItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 p-3 hover:bg-muted/50">
                  <div className="col-span-5 flex items-center gap-2">
                    <div className="h-10 w-10 overflow-hidden rounded-md">
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="col-span-2 flex items-center">{item.type}</div>
                  <div className="col-span-2 flex items-center">{item.size}</div>
                  <div className="col-span-3 flex items-center">{item.uploaded}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  )
}
