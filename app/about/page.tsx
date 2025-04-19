import Image from "next/image"
import { SiteLayout } from "@/components/layout/site-layout"
import { HeroSection } from "@/components/ui/hero-section"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Award, Users, Calendar, Star } from "lucide-react"

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "Founder & CEO",
      image: "/thoughtful-portrait.png",
    },
    {
      name: "Michael Chen",
      position: "Creative Director",
      image: "/diverse-group-city.png",
    },
    {
      name: "Emily Rodriguez",
      position: "Event Manager",
      image: "/diverse-group-chatting.png",
    },
    {
      name: "David Wilson",
      position: "Marketing Specialist",
      image: "/vendor-selection-meeting.png",
    },
  ]

  return (
    <SiteLayout>
      <HeroSection
        backgroundImage="/celebratory-gathering.png"
        title="About Us"
        description="Learn more about our event planning journey and expertise"
        size="md"
      />

      {/* About Section */}
      <Section className="py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                <Image src="/diverse-group-chatting.png" alt="Event Planning" fill className="object-cover" />
              </div>
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg mt-8">
                <Image src="/networking-reception.png" alt="Event Planning" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-evenizer-purple font-medium">About Evenizer</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              We Are The Best Event Planner & Organizer In Town
            </h2>
            <p className="text-muted-foreground">
              Founded in 2010, Evenizer has grown to become the leading event planning company in the region. Our
              passion for creating memorable experiences drives everything we do. We believe that every event tells a
              story, and we're here to help you tell yours.
            </p>
            <p className="text-muted-foreground">
              Our team of experienced event planners brings creativity, attention to detail, and a personalized approach
              to every project. Whether you're planning a wedding, corporate event, or birthday celebration, we have the
              expertise to make it unforgettable.
            </p>
            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">Best Quality Standards</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">100% Satisfaction Guarantee</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">Quality Control System</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">Commitment to Customers</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">Highly Professional Team</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-evenizer-purple">
                  14 <span className="text-evenizer-purple">+</span>
                </div>
                <div className="text-sm text-muted-foreground">Years Of Experiences</div>
              </div>
              <Button className="bg-evenizer-purple hover:bg-evenizer-purple/90">OUR SERVICES</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="py-20 bg-gray-50">
        <SectionHeader
          subtitle="Why Choose Us"
          title="What Makes Us Different"
          description="We combine creativity, expertise, and personalized service to deliver exceptional events that exceed expectations."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="bg-evenizer-purple/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-evenizer-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Award-Winning Service</h3>
              <p className="text-muted-foreground">
                Our dedication to excellence has earned us recognition in the event planning industry.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="bg-evenizer-purple/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-evenizer-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Team</h3>
              <p className="text-muted-foreground">
                Our team of experienced professionals brings creativity and expertise to every event.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="bg-evenizer-purple/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-evenizer-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tailored Approach</h3>
              <p className="text-muted-foreground">
                We create customized event plans that reflect your unique vision and requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Team Section */}
      <Section className="py-20">
        <SectionHeader
          subtitle="Our Team"
          title="Meet Our Expert Team"
          description="Our talented team of event planning professionals is dedicated to creating unforgettable experiences."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden border-0 shadow-md group">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-evenizer-purple">{member.position}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-20 bg-gray-50">
        <SectionHeader
          subtitle="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it. Here's what our clients have to say about their experience with us."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-center text-muted-foreground mb-6">
                  "Evenizer transformed our corporate event into an unforgettable experience. Their attention to detail
                  and creative approach exceeded our expectations. We'll definitely be working with them again!"
                </p>
                <div className="text-center">
                  <h4 className="font-bold">{i === 1 ? "John Smith" : i === 2 ? "Emily Davis" : "Michael Johnson"}</h4>
                  <p className="text-sm text-evenizer-purple">
                    {i === 1
                      ? "CEO, Tech Solutions"
                      : i === 2
                        ? "Marketing Director, Brand Co"
                        : "Event Manager, Corp Inc"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-16 bg-evenizer-purple text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Next Event?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of event planners who use our resources to create memorable experiences
          </p>
          <Button variant="outline" size="lg" className="bg-white text-evenizer-purple hover:bg-white/90">
            CONTACT US NOW
          </Button>
        </div>
      </Section>
    </SiteLayout>
  )
}
