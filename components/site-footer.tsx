"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <span className="text-xl font-bold tracking-tighter text-foreground">
                BADMINTON<span className="text-primary">LOVER</span>
              </span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              The authority on badminton technique, strategy, and training. Trusted by players worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Content
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/technique" className="text-muted-foreground hover:text-foreground transition-colors">
                  Technique
                </Link>
              </li>
              <li>
                <Link href="/category/strategy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Strategy
                </Link>
              </li>
              <li>
                <Link href="/category/drills" className="text-muted-foreground hover:text-foreground transition-colors">
                  Drills
                </Link>
              </li>
              <li>
                <Link href="/category/equipment" className="text-muted-foreground hover:text-foreground transition-colors">
                  Equipment
                </Link>
              </li>
              <li>
                <Link href="/category/fitness" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fitness
                </Link>
              </li>
              <li>
                <Link href="/category/organizing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Organizing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-muted-foreground hover:text-foreground transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <p>
              © {currentYear} BadmintonLover. All rights reserved.
            </p>
            <p>
              Made with ❤️ for the badminton community
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
