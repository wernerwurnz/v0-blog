import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface BlogPostResourcesProps {
  resources: Array<{
    title: string
    description: string
    downloadUrl: string
    icon?: string
  }>
}

export function BlogPostResources({ resources }: BlogPostResourcesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Downloadable Resources</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
              </div>
              <Button asChild className="w-full">
                <a href={resource.downloadUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
