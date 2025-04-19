import Link from "next/link"
import Image from "next/image"
import { SiteLayout } from "@/components/layout/site-layout"
import { HeroSection } from "@/components/ui/hero-section"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Calendar } from "lucide-react"

export default function CalculatorsPage() {
  return (
    <SiteLayout>
      <HeroSection
        title="Event Planning Calculators"
        description="Interactive tools to help you plan and budget for your next event"
        size="md"
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Budget Calculator</CardTitle>
              </div>
              <CardDescription>Calculate and track your event budget with customizable categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/calculators/budget">
                <Button className="w-full">Open Calculator</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Timeline Generator</CardTitle>
              </div>
              <CardDescription>Create a customized planning timeline based on your event date</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/calculators/timeline">
                <Button className="w-full">Open Calculator</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Guest List Estimator</CardTitle>
              </div>
              <CardDescription>Estimate your final guest count based on invitation and RSVP patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/calculators/guest-list">
                <Button className="w-full">Open Calculator</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Featured Calculator: Budget Planner</h2>
          <Card>
            <CardContent className="p-6">
              <iframe
                src="/calculators/budget"
                className="w-full h-[600px] rounded-md border"
                title="Budget Calculator Preview"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section background="muted">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Why Use Our Calculators?</h2>
            <p className="text-muted-foreground mb-4">
              Our interactive calculators are designed to simplify your event planning process. They help you:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <span>Stay on budget with detailed expense tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <span>Create realistic timelines with customized milestones</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span>Manage your guest list efficiently and accurately</span>
              </li>
            </ul>
            <Link href="/calculators/budget">
              <Button>Try Our Budget Calculator</Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/colorful-budget-overview.png"
              alt="Calculator Preview"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </Section>
    </SiteLayout>
  )
}
