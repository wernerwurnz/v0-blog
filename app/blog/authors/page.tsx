import Link from "next/link"
import { BlogLayout } from "@/components/layout/blog-layout"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// This would normally be fetched from a database
const authors = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "Event Planning Expert",
    bio: "Sarah has over 10 years of experience planning weddings and corporate events. She specializes in virtual event planning and has helped hundreds of couples plan their perfect day.",
    avatar: "/thoughtful-portrait.png",
    postCount: 15,
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    role: "Corporate Event Specialist",
    bio: "Michael is a corporate event planning specialist with expertise in virtual conferences, team building activities, and networking events.",
    avatar: "/diverse-group-chatting.png",
    postCount: 12,
  },
  {
    id: "emily-rodriguez",
    name: "Emily Rodriguez",
    role: "Party Planning Expert",
    bio: "Emily specializes in birthday parties, baby showers, and holiday celebrations. She loves creating memorable experiences for families and friends.",
    avatar: "/diverse-group-city.png",
    postCount: 10,
  },
  {
    id: "david-wilson",
    name: "David Wilson",
    role: "Budget Planning Specialist",
    bio: "David helps clients plan amazing events on a budget. He's known for his creative cost-saving strategies without sacrificing quality.",
    avatar: "/vendor-selection-meeting.png",
    postCount: 8,
  },
]

export default function AuthorsPage() {
  return (
    <BlogLayout showSidebar={false}>
      <Section size="sm" className="px-0">
        <SectionHeader
          title="Our Authors"
          description="Meet the experts behind our event planning blog. Our team of experienced professionals shares their knowledge and insights to help you plan perfect events."
          align="center"
        />
      </Section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {authors.map((author) => (
          <Card key={author.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{author.name}</h3>
                  <p className="text-sm text-muted-foreground">{author.role}</p>
                </div>
                <p className="text-muted-foreground">{author.bio}</p>
                <p className="text-sm font-medium">{author.postCount} Articles</p>
                <Link href={`/blog/authors/${author.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </BlogLayout>
  )
}
