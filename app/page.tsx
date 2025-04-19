import Link from "next/link"
import { SiteLayout } from "@/components/layout/site-layout"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <SiteLayout>
      <section className="py-20 md:py-32 bg-gradient-to-b from-evenizer-purple/10 to-background">
        <div className="container">
          <div className="max-w-[800px] mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Plan Perfect Events From Home</h1>
            <p className="text-xl text-muted-foreground">
              Your go-to resource for planning memorable events from the comfort of your home.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/services">
                <Button size="lg">Our Services</Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Read Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-muted-foreground max-w-[600px] mx-auto">
              We provide comprehensive event planning services to make your special occasion truly unforgettable.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Wedding Planning",
                description: "Create the perfect wedding day with our comprehensive planning services.",
              },
              {
                title: "Corporate Events",
                description: "Professional planning for conferences, team building, and corporate gatherings.",
              },
              {
                title: "Birthday Parties",
                description: "Make your celebration special with our creative birthday party planning.",
              },
            ].map((service, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link href="/services" className="text-evenizer-purple font-medium hover:underline">
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
