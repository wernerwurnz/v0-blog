import Link from "next/link"
import { BlogLayout } from "@/components/layout/blog-layout"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { Section } from "@/components/ui/section"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Twitter, Linkedin } from "lucide-react"

interface AuthorPageProps {
  params: {
    slug: string
  }
}

export default function AuthorPage({ params }: AuthorPageProps) {
  // This would normally be fetched from a database based on the slug
  const author = {
    id: params.slug,
    name: "Sarah Johnson",
    role: "Event Planning Expert",
    bio: "Sarah has over 10 years of experience planning weddings and corporate events. She specializes in virtual event planning and has helped hundreds of couples plan their perfect day. Sarah is passionate about making event planning accessible to everyone, regardless of budget or location.",
    avatar: "/thoughtful-portrait.png",
    email: "sarah@example.com",
    twitter: "sarahjohnson",
    linkedin: "sarahjohnson",
  }

  // Mock posts by this author
  const authorPosts = [
    {
      id: "1",
      title: "10 Tips for Planning a Virtual Wedding",
      excerpt: "Learn how to create a memorable virtual wedding experience for you and your guests...",
      image: "/wedding-planning-session.png",
      date: "April 15, 2024",
      category: "Weddings",
    },
    {
      id: "4",
      title: "How to Host a Virtual Baby Shower",
      excerpt: "Learn how to create a memorable virtual baby shower experience...",
      image: "/whimsical-baby-shower.png",
      date: "March 28, 2024",
      category: "Baby Showers",
    },
    {
      id: "6",
      title: "Holiday Party Planning Tips",
      excerpt: "Make your holiday celebrations memorable with these planning tips...",
      image: "/celebratory-gathering.png",
      date: "March 15, 2024",
      category: "Holiday Celebrations",
    },
  ]

  return (
    <BlogLayout showSidebar={false}>
      <Link href="/blog/authors" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Authors
      </Link>

      <Section size="sm" className="px-0 pt-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <Avatar className="h-32 w-32">
            <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
            <p className="text-muted-foreground mb-4">{author.role}</p>
            <p className="mb-6">{author.bio}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {author.email && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:${author.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </a>
                </Button>
              )}
              {author.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </a>
                </Button>
              )}
              {author.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://linkedin.com/in/${author.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Separator className="my-8" />

      <h2 className="text-2xl font-bold mb-6">Articles by {author.name}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {authorPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </BlogLayout>
  )
}
