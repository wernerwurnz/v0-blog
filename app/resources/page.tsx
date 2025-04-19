import Link from "next/link"
import Image from "next/image"
import { SiteLayout } from "@/components/layout/site-layout"
import { HeroSection } from "@/components/ui/hero-section"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Calculator, Calendar } from "lucide-react"

export default function ResourcesPage() {
  // Sample resources data
  const checklists = [
    {
      id: "wedding-checklist",
      title: "Complete Wedding Planning Checklist",
      description: "A comprehensive 12-month timeline and checklist for planning your perfect wedding.",
      image: "/wedding-planning-session.png",
      downloadUrl: "/downloads/wedding-planning-checklist.pdf",
      format: "PDF",
      size: "1.2 MB",
    },
    {
      id: "corporate-event-checklist",
      title: "Corporate Event Planning Checklist",
      description: "Everything you need to plan a successful corporate event from start to finish.",
      image: "/networking-reception.png",
      downloadUrl: "/downloads/corporate-event-checklist.pdf",
      format: "PDF",
      size: "0.9 MB",
    },
    {
      id: "birthday-party-checklist",
      title: "Birthday Party Planning Checklist",
      description: "Plan the perfect birthday celebration with this comprehensive checklist.",
      image: "/festive-birthday-gathering.png",
      downloadUrl: "/downloads/birthday-party-checklist.pdf",
      format: "PDF",
      size: "0.8 MB",
    },
  ]

  const templates = [
    {
      id: "event-budget-template",
      title: "Event Budget Template",
      description: "Track all your event expenses with this easy-to-use budget template.",
      image: "/colorful-budget-overview.png",
      downloadUrl: "/downloads/event-budget-template.xlsx",
      format: "Excel",
      size: "0.5 MB",
    },
    {
      id: "guest-list-template",
      title: "Guest List Management Template",
      description: "Keep track of invitations, RSVPs, and guest details with this template.",
      image: "/elegant-gathering.png",
      downloadUrl: "/downloads/guest-list-template.xlsx",
      format: "Excel",
      size: "0.4 MB",
    },
    {
      id: "event-timeline-template",
      title: "Event Day Timeline Template",
      description: "Create a detailed schedule for your event day to ensure everything runs smoothly.",
      image: "/abstract-timeline.png",
      downloadUrl: "/downloads/event-timeline-template.docx",
      format: "Word",
      size: "0.3 MB",
    },
  ]

  const worksheets = [
    {
      id: "venue-comparison",
      title: "Venue Comparison Worksheet",
      description: "Compare different venues side by side to find the perfect location for your event.",
      image: "/event-space-showcase.png",
      downloadUrl: "/downloads/venue-comparison-worksheet.pdf",
      format: "PDF",
      size: "0.7 MB",
    },
    {
      id: "vendor-interview",
      title: "Vendor Interview Questions",
      description: "Essential questions to ask when interviewing potential vendors for your event.",
      image: "/vendor-selection-meeting.png",
      downloadUrl: "/downloads/vendor-interview-questions.pdf",
      format: "PDF",
      size: "0.6 MB",
    },
    {
      id: "event-design",
      title: "Event Design Worksheet",
      description: "Plan your event's visual elements, from color schemes to decorations.",
      image: "/elegant-gala-setup.png",
      downloadUrl: "/downloads/event-design-worksheet.pdf",
      format: "PDF",
      size: "0.8 MB",
    },
  ]

  return (
    <SiteLayout>
      <HeroSection
        title="Event Planning Resources"
        description="Download free checklists, templates, and worksheets to help you plan your next event"
        size="md"
      />

      <Section>
        <Tabs defaultValue="checklists" className="space-y-8">
          <TabsList className="w-full justify-start md:justify-center">
            <TabsTrigger value="checklists" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Checklists</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Templates</span>
            </TabsTrigger>
            <TabsTrigger value="worksheets" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span>Worksheets</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checklists" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {checklists.map((resource) => (
                <Card key={resource.id} className="overflow-hidden h-full">
                  <div className="aspect-video relative">
                    <Image
                      src={resource.image || "/placeholder.svg"}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {resource.format} • {resource.size}
                    </div>
                    <Button asChild>
                      <Link href={resource.downloadUrl}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((resource) => (
                <Card key={resource.id} className="overflow-hidden h-full">
                  <div className="aspect-video relative">
                    <Image
                      src={resource.image || "/placeholder.svg"}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {resource.format} • {resource.size}
                    </div>
                    <Button asChild>
                      <Link href={resource.downloadUrl}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="worksheets" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {worksheets.map((resource) => (
                <Card key={resource.id} className="overflow-hidden h-full">
                  <div className="aspect-video relative">
                    <Image
                      src={resource.image || "/placeholder.svg"}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {resource.format} • {resource.size}
                    </div>
                    <Button asChild>
                      <Link href={resource.downloadUrl}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      <Section background="primary">
        <div className="rounded-lg p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-primary-foreground">Want More Resources?</h2>
              <p className="mt-2 text-primary-foreground/90">
                Sign up for our newsletter to get access to exclusive resources, templates, and planning guides
                delivered straight to your inbox.
              </p>
            </div>
            <div className="md:w-1/3">
              <Button variant="secondary" size="lg" className="w-full">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  )
}
