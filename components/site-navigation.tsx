"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu } from "lucide-react"

export function SiteNavigation() {
  const pathname = usePathname()
  const isArticlePage = pathname.startsWith("/articles/")

  const links = [
    { name: "Technique", href: "/category/technique" },
    { name: "Strategy", href: "/category/strategy" },
    { name: "Drills", href: "/category/drills" },
    { name: "Equipment", href: "/category/equipment" },
    { name: "Fitness", href: "/category/fitness" },
    { name: "Organizing", href: "/category/organizing" },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <time className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/advertise" className="text-muted-foreground hover:text-foreground transition-colors">
                Advertise
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`border-b border-border bg-background ${
          isArticlePage ? "sticky top-0 z-50 backdrop-blur-sm bg-background/95" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-bold tracking-tighter text-foreground">
                BADMINTON<span className="text-primary">LOVER</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                The Authority on Badminton
              </span>
            </Link>

            {/* Center Navigation */}
            <div className="hidden items-center gap-6 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <Link
                href="/newsletter"
                className="hidden sm:block rounded-sm bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Subscribe
              </Link>
              <button className="lg:hidden text-muted-foreground hover:text-foreground transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
