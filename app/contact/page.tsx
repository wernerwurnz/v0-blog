import { SiteLayout } from "@/components/layout/site-layout"
import { HeroSection } from "@/components/ui/hero-section"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <SiteLayout>
      <HeroSection
        backgroundImage="/celebratory-gathering.png"
        title="Contact Us"
        description="Get in touch with our team to plan your next unforgettable event"
        size="md"
      />

      <Section className="py-20">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          <div>
            <SectionHeader
              subtitle="Get In Touch"
              title="We'd Love To Hear From You"
              description="Fill out the form and our team will get back to you within 24 hours."
              align="left"
              className="mb-8"
            />

            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input placeholder="Your Name" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Input placeholder="Your Email" type="email" className="h-12" />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input placeholder="Phone Number" type="tel" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Input placeholder="Subject" className="h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Textarea placeholder="Your Message" className="min-h-[150px] resize-none" />
              </div>
              <Button className="w-full sm:w-auto bg-evenizer-purple hover:bg-evenizer-purple/90 h-12 px-8">
                SEND MESSAGE
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <Card className="overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.2023276895366!2d115.17565661478406!3d-8.67963429377277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2409b0e5e80db%3A0xe27334e8ccb9374a!2sJl.%20Sunset%20Road%2C%20Kuta%2C%20Badung%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1650123456789!5m2!1sen!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="w-full"
              ></iframe>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-evenizer-purple/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-evenizer-purple" />
                    </div>
                    <div>
                      <h3 className="font-bold">Office Address</h3>
                      <p className="text-muted-foreground">Jl. Sunset Road No.815, Kuta, Bali, Indonesia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-evenizer-purple/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-evenizer-purple" />
                    </div>
                    <div>
                      <h3 className="font-bold">Email Address</h3>
                      <p className="text-muted-foreground">support@domain.com</p>
                      <p className="text-muted-foreground">info@domain.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-evenizer-purple/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-evenizer-purple" />
                    </div>
                    <div>
                      <h3 className="font-bold">Phone Number</h3>
                      <p className="text-muted-foreground">(+62) 81 2345 1234</p>
                      <p className="text-muted-foreground">(+62) 81 2345 5678</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-evenizer-purple/10 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-evenizer-purple" />
                    </div>
                    <div>
                      <h3 className="font-bold">Working Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="py-16 bg-evenizer-purple text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Next Event?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of event planners who use our resources to create memorable experiences
          </p>
          <Button variant="outline" size="lg" className="bg-white text-evenizer-purple hover:bg-white/90">
            GET STARTED NOW
          </Button>
        </div>
      </Section>
    </SiteLayout>
  )
}
