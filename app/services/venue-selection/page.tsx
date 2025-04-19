import Image from "next/image"
import Link from "next/link"
import { SiteLayout } from "@/components/layout/site-layout"
import { HeroSection } from "@/components/ui/hero-section"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

export default function VenueSelectionPage() {
  return (
    <SiteLayout>
      <HeroSection
        backgroundImage="/event-space-showcase.png"
        title="Venue Selection"
        description="Finding the perfect venue for your special event"
        size="md"
      />

      <Section className="py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div>
            <div className="text-evenizer-purple font-medium">Our Service</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Expert Venue Selection Service</h2>
            <p className="text-muted-foreground mb-4">
              Finding the perfect venue is one of the most crucial aspects of event planning. Our venue selection
              service takes the stress out of this process by helping you find a location that perfectly matches your
              event's requirements, theme, and budget.
            </p>
            <p className="text-muted-foreground mb-4">
              Our team has established relationships with a wide range of venues, from luxury hotels and resorts to
              unique spaces like art galleries, historic buildings, and outdoor locations. We'll handle all the
              research, site visits, and negotiations to secure the best possible venue for your event.
            </p>
            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">Personalized Venue Recommendations</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">Detailed Site Visits and Evaluations</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">Contract Negotiation and Review</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">Venue Layout and Floor Planning</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-evenizer-purple mt-1">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-medium">Coordination with Venue Staff</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button className="bg-evenizer-purple hover:bg-evenizer-purple/90">CONTACT US</Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/elegant-gala-setup.png"
              alt="Venue Selection"
              width={600}
              height={400}
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section className="py-20 bg-gray-50">
        <SectionHeader
          subtitle="Our Process"
          title="How We Find Your Perfect Venue"
          description="We follow a structured approach to ensure we find the ideal venue for your event."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "01",
              title: "Requirements Analysis",
              description: "We start by understanding your event needs, guest count, budget, and preferred locations.",
            },
            {
              number: "02",
              title: "Venue Research",
              description: "Our team researches and creates a shortlist of venues that match your requirements.",
            },
            {
              number: "03",
              title: "Site Visits",
              description: "We conduct site visits to evaluate each venue's suitability for your event.",
            },
            {
              number: "04",
              title: "Final Selection",
              description: "We help you make the final decision and negotiate the best terms for your chosen venue.",
            },
          ].map((step) => (
            <Card key={step.number} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-evenizer-purple mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Related Services */}
      <Section className="py-20">
        <SectionHeader
          subtitle="Related Services"
          title="Complementary Event Planning Services"
          description="Explore our other services that work perfectly with venue selection."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Decoration",
              description: "Transform your venue with stunning decorations that match your event theme.",
              link: "/services/decoration",
              image: "/celebratory-gathering.png",
            },
            {
              title: "Entertainment",
              description: "Book the best entertainment options to keep your guests engaged and entertained.",
              link: "/services/entertainment",
              image: "/networking-reception.png",
            },
            {
              title: "Catering",
              description: "Arrange delicious food and beverages that will delight your guests.",
              link: "/services/catering",
              image: "/elegant-gathering.png",
            },
          ].map((service) => (
            <Card key={service.title} className="overflow-hidden border-0 shadow-md group">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link href={service.link} className="read-more-link text-evenizer-purple inline-flex items-center">
                  READ MORE <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-16 bg-evenizer-purple text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Venue?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact us today to discuss your event requirements and how we can help you find the ideal venue.
          </p>
          <Button variant="outline" size="lg" className="bg-white text-evenizer-purple hover:bg-white/90">
            GET STARTED NOW
          </Button>
        </div>
      </Section>
    </SiteLayout>
  )
}
