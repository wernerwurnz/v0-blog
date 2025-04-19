"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const { user, profile } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      const currentScrollPos = window.scrollY
      setIsScrolled(currentScrollPos > 10)

      // Hide header on scroll down, show on scroll up
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ]

  const mainNavItems = [
    {
      title: "HOME",
      href: "/",
    },
    {
      title: "ABOUT US",
      href: "/about",
    },
    {
      title: "SERVICES",
      href: "/services",
      children: [
        {
          title: "Wedding Planning",
          href: "/services/wedding-planning",
          description: "Full-service wedding planning and coordination",
        },
        {
          title: "Corporate Events",
          href: "/services/corporate-events",
          description: "Professional corporate event management",
        },
        {
          title: "Birthday Parties",
          href: "/services/birthday-parties",
          description: "Creative birthday celebration planning",
        },
        {
          title: "Special Occasions",
          href: "/services/special-occasions",
          description: "Custom event planning for any special occasion",
        },
      ],
    },
    {
      title: "BLOG",
      href: "/blog",
    },
    {
      title: "CONTACT US",
      href: "/contact",
    },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="#Ahem" width={40} height={40} />
          <span className="font-bold text-xl text-evenizer-purple">#Ahem</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium hover:text-evenizer-purple transition-colors relative group"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-evenizer-purple transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />

          {user ? (
            <Link href="/profile">
              <Avatar className="h-9 w-9 border border-evenizer-purple/20 hover:border-evenizer-purple transition-colors">
                <AvatarImage
                  src={profile?.avatar_url || "/placeholder.svg?height=36&width=36&query=person"}
                  alt={profile?.full_name || "Profile"}
                />
                <AvatarFallback>{profile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-evenizer-purple hover:bg-evenizer-purple/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="#Ahem" width={40} height={40} />
                    <span className="font-bold text-xl text-evenizer-purple">#Ahem</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>

                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium hover:text-evenizer-purple transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={profile?.avatar_url || "/placeholder.svg?height=40&width=40&query=person"}
                            alt={profile?.full_name || "Profile"}
                          />
                          <AvatarFallback>{profile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile?.full_name || "User"}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Profile
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            // Add sign out functionality here
                          }}
                        >
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-evenizer-purple hover:bg-evenizer-purple/90">Sign Up</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
