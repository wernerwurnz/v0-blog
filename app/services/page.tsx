import Link from "next/link"
import { SiteLayout } from "@/components/layout/site-layout"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, FileText, Mail, Music, PartyPopper, Sparkles } from "lucide-react"

export default function ServicesPage() {
  // Sample services
  const services = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Venue Selection",
      description: "We help you find the perfect venue that matches your event requirements and budget.",
      link: "/services/venue-selection",
      featured: true,
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Documentation",
      description: "We handle all the paperwork and permits needed for your event to run smoothly.",
      link: "/services/documentation",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Invitation Cards",
      description: "Custom designed invitation cards that match your event theme and style.",
      link: "/services/invitation-cards",
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Entertainment",
      description: "Book the best entertainment options to keep your guests engaged and entertained.",
      link: "/services/entertainment",
    },
    {
      icon: <PartyPopper className="h-6 w-6" />,
      title: "Decoration",
      description: "Transform your venue with stunning decorations that match your event theme.",
      link: "/services/decoration",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Juggler",
      description: "Add a touch of magic to your event with professional jugglers and performers.",
      link: "/services/juggler",
    },
  ]

  return (
    <SiteLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <p className="text-muted-foreground">
          Comprehensive event planning services to make your special occasion unforgettable.
        </p>
      </div>

      {/* Services Section */}
      <Section className="py-20">
        <SectionHeader
          subtitle="Our Services"
          title="We Provide The Best Service For Your Event"
          description="From venue selection to entertainment booking, we offer comprehensive event planning services to make your special occasion truly unforgettable."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`service-card ${service.featured ? "bg-evenizer-purple text-white" : "bg-white shadow-md"} rounded-lg overflow-hidden`}
            >
              <div className="p-6 h-full flex flex-col">
                <div className={`${service.featured ? "text-white" : "text-evenizer-purple"} mb-4`}>{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className={`${service.featured ? "text-white/90" : "text-muted-foreground"} mb-4 flex-grow`}>
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className={`read-more-link ${service.featured ? "text-white" : "text-evenizer-purple"} inline-flex items-center mt-2`}
                >
                  READ MORE <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section className="py-20 bg-gray-50">
        <SectionHeader
          subtitle="How It Works"
          title="Our Event Planning Process"
          description="We follow a structured approach to ensure your event is planned and executed flawlessly."
        />

        <div className="mt-12 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-evenizer-purple/20 -translate-x-1/2"></div>
          <div className="space-y-12 relative">
            {[
              {
                number: "01",
                title: "Initial Consultation",
                description:
                  "We start with a detailed consultation to understand your vision, requirements, and budget for the event.",
              },
              {
                number: "02",
                title: "Proposal & Planning",
                description:
                  "Based on your requirements, we create a comprehensive proposal and detailed plan for your event.",
              },
              {
                number: "03",
                title: "Vendor Coordination",
                description:
                  "We coordinate with vendors, venues, and service providers to ensure everything is arranged perfectly.",
              },
              {
                number: "04",
                title: "Event Execution",
                description:
                  "On the day of the event, our team manages everything to ensure a smooth and memorable experience.",
              },
            ].map((step, index) => (
              <div key={step.number} className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className={`md:text-right ${index % 2 !== 0 ? "md:order-2" : ""}`}>
                    <div className="hidden md:inline-block absolute left-1/2 top-0 w-4 h-4 rounded-full bg-evenizer-purple -translate-x-1/2"></div>
                    <div className="text-4xl font-bold text-evenizer-purple mb-2">{step.number}</div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  <div
                    className={`hidden md:block ${index % 2 !== 0 ? "md:order-1" : ""} ${
                      index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="py-20">
        <SectionHeader
          subtitle="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our event planning services."
        />

        <div className="mt-12 max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "How far in advance should I book your services?",
              answer:
                "We recommend booking our services at least 3-6 months in advance for most events, and 6-12 months for larger events like weddings or corporate conferences. This gives us enough time to plan and coordinate all aspects of your event.",
            },
            {
              question: "What types of events do you plan?",
              answer:
                "We plan a wide range of events including weddings, corporate events, birthday parties, anniversaries, baby showers, product launches, conferences, and more. Our team has experience with events of all sizes and types.",
            },
            {
              question: "How do you charge for your services?",
              answer:
                "Our pricing is based on the scope and complexity of your event. We offer different packages to suit various budgets and requirements. After our initial consultation, we'll provide a detailed proposal with transparent pricing.",
            },
            {
              question: "Can you work within my budget?",
              answer:
                "Yes, we work with clients across a range of budgets. During our initial consultation, we'll discuss your budget constraints and help you prioritize elements to create the best possible event within your budget.",
            },
            {
              question: "Do you handle virtual and hybrid events?",
              answer:
                "We have extensive experience planning and executing virtual and hybrid events. We can help with platform selection, technical setup, content creation, and ensuring a seamless experience for both in-person and virtual attendees.",
            },
          ].map((faq, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-16 bg-evenizer-purple text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Next Event?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact us today to discuss your event requirements and how we can help make it unforgettable.
          </p>
          <Button variant="outline" size="lg" className="bg-white text-evenizer-purple hover:bg-white/90">
            CONTACT US NOW
          </Button>
        </div>
      </Section>
    </SiteLayout>
  )
}
