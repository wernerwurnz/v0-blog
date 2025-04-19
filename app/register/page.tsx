import Image from "next/image"
import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20%283%29-42eiA6o5KiyCbApPkyR3dWCE8wt4wk.png"
                alt="#Ahem Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container flex flex-col items-center justify-center py-12 md:py-24">
          <RegisterForm />
        </div>
      </main>
    </div>
  )
}
