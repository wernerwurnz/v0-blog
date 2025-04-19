import { BlogLayout } from "@/components/layout/blog-layout"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Separator } from "@/components/ui/separator"

// This would normally be fetched from a database
const archivePosts = {
  "2024": {
    April: [
      {
        id: "1",
        title: "10 Tips for Planning a Virtual Wedding",
        excerpt: "Learn how to create a memorable virtual wedding experience for you and your guests...",
        image: "/wedding-planning-session.png",
        date: "April 15, 2024",
        category: "Weddings",
      },
      {
        id: "2",
        title: "Budget-Friendly Birthday Party Ideas",
        excerpt: "Discover creative ways to celebrate birthdays without breaking the bank...",
        image: "/festive-birthday-gathering.png",
        date: "April 10, 2024",
        category: "Birthday Parties",
      },
      {
        id: "3",
        title: "Corporate Event Planning Checklist",
        excerpt: "A comprehensive guide to planning successful corporate events...",
        image: "/networking-reception.png",
        date: "April 5, 2024",
        category: "Corporate Events",
      },
    ],
    March: [
      {
        id: "4",
        title: "How to Host a Virtual Baby Shower",
        excerpt: "Learn how to create a memorable virtual baby shower experience...",
        image: "/whimsical-baby-shower.png",
        date: "March 28, 2024",
        category: "Baby Showers",
      },
      {
        id: "5",
        title: "Dinner Party Hosting Guide",
        excerpt: "Everything you need to know about hosting a successful dinner party...",
        image: "/elegant-gathering.png",
        date: "March 22, 2024",
        category: "Dinner Parties",
      },
      {
        id: "6",
        title: "Holiday Party Planning Tips",
        excerpt: "Make your holiday celebrations memorable with these planning tips...",
        image: "/celebratory-gathering.png",
        date: "March 15, 2024",
        category: "Holiday Celebrations",
      },
    ],
    February: [
      {
        id: "7",
        title: "Event Venue Selection Guide",
        excerpt: "How to choose the perfect venue for your next event...",
        image: "/event-space-showcase.png",
        date: "February 28, 2024",
        category: "Venue Selection",
      },
      {
        id: "8",
        title: "Working with Event Vendors",
        excerpt: "Tips for finding and working with the best event vendors...",
        image: "/vendor-selection-meeting.png",
        date: "February 20, 2024",
        category: "Event Planning",
      },
      {
        id: "9",
        title: "Creating the Perfect Event Timeline",
        excerpt: "How to create a detailed timeline for any type of event...",
        image: "/abstract-timeline.png",
        date: "February 15, 2024",
        category: "Event Planning",
      },
    ],
  },
  "2023": {
    December: [
      {
        id: "10",
        title: "Holiday Party Planning Guide",
        excerpt: "Everything you need to know about planning a memorable holiday party...",
        image: "/celebratory-gathering.png",
        date: "December 10, 2023",
        category: "Holiday Celebrations",
      },
    ],
    November: [
      {
        id: "11",
        title: "Thanksgiving Dinner Planning Tips",
        excerpt: "How to plan and host the perfect Thanksgiving dinner...",
        image: "/elegant-gathering.png",
        date: "November 15, 2023",
        category: "Dinner Parties",
      },
    ],
  },
}

export default function ArchivePage() {
  return (
    <BlogLayout sidebar={<BlogSidebar />}>
      <Section size="sm" className="px-0">
        <SectionHeader
          title="Blog Archive"
          description="Browse our complete collection of event planning articles organized by date."
          align="left"
        />
      </Section>

      <div className="space-y-12">
        {Object.entries(archivePosts).map(([year, months]) => (
          <div key={year} className="space-y-8">
            <h2 className="text-3xl font-bold">{year}</h2>
            {Object.entries(months).map(([month, posts]) => (
              <div key={month} className="space-y-6">
                <h3 className="text-xl font-semibold">{month}</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <BlogPostCard key={post.id} post={post} variant="compact" />
                  ))}
                </div>
                <Separator />
              </div>
            ))}
          </div>
        ))}
      </div>
    </BlogLayout>
  )
}
