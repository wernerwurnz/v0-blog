import { SiteLayout } from "@/components/layout/site-layout"

export default function ContactPage() {
  return (
    <SiteLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-muted-foreground">Get in touch with our team to plan your next unforgettable event.</p>
      </div>
    </SiteLayout>
  )
}
