import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function ToolsPage() {
  const tools = [
    {
      title: "Session Rotation Calculator",
      description:
        "Generate fair court rotations for any number of players. Automatically balances playing time and matchups.",
      href: "/tools/rotation-calculator",
      status: "Coming Soon",
    },
    {
      title: "Player Level Balancer",
      description:
        "Create balanced teams based on skill levels. Input player ratings and get optimal team compositions.",
      href: "/tools/level-balancer",
      status: "Coming Soon",
    },
    {
      title: "Tournament Bracket Generator",
      description: "Create single or double elimination brackets. Export and share with participants.",
      href: "/tools/bracket-generator",
      status: "Coming Soon",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
        {/* Header */}
        <header className="mb-16">
          <h1 className="mb-4 text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">Tools</h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Interactive tools and calculators designed to help players and organizers run better badminton sessions.
          </p>
        </header>

        {/* Tools List */}
        <div className="space-y-6">
          {tools.map((tool) => (
            <article
              key={tool.href}
              className="group rounded-lg border border-border bg-muted/20 p-6 transition-colors hover:border-foreground/50"
            >
              <Link href={tool.href} className="block">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {tool.status}
                  </Badge>
                </div>
                <h2 className="mb-3 text-balance text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-muted-foreground">
                  {tool.title}
                </h2>
                <p className="text-pretty text-base leading-relaxed text-muted-foreground">{tool.description}</p>
              </Link>
            </article>
          ))}
        </div>

        {/* Info Section */}
        <section className="mt-16 border-t border-border pt-12">
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            These tools are currently in development. They'll be released as part of BadmintonLover's commitment to
            helping organizers run more effective sessions.
          </p>
        </section>
      </main>
    </div>
  )
}
