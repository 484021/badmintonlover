import Link from "next/link"

// Mock data - would come from CMS or database
const getTool = (slug: string) => {
  const tools: Record<string, any> = {
    "rotation-calculator": {
      title: "Session Rotation Calculator",
      description:
        "Generate fair and efficient court rotations for any number of players. Ensures everyone gets equal playing time and balanced matchups.",
      instructions: [
        "Enter the total number of players attending your session",
        "Specify the number of available courts",
        "Choose your preferred game format (singles or doubles)",
        "The calculator generates an optimal rotation schedule",
      ],
      features: [
        "Equal playing time for all participants",
        "Minimizes player wait times between games",
        "Prevents frequent repeat pairings",
        "Exportable rotation schedules",
      ],
    },
    "level-balancer": {
      title: "Player Level Balancer",
      description:
        "Create balanced teams based on player skill levels. Input ratings and get optimal team compositions for competitive, fair matches.",
      instructions: [
        "Add players and assign skill ratings (1-10 scale)",
        "Choose number of courts or teams needed",
        "Select balancing algorithm preference",
        "Generate balanced team matchups",
      ],
      features: [
        "Multiple balancing algorithms",
        "Prevents skill clustering",
        "Saves player databases for future sessions",
        "Export team lists",
      ],
    },
    "bracket-generator": {
      title: "Tournament Bracket Generator",
      description:
        "Create professional single or double elimination tournament brackets. Perfect for club championships and competitive events.",
      instructions: [
        "Enter participant names or import from file",
        "Choose bracket type (single or double elimination)",
        "Optionally seed players by ranking",
        "Generate and customize your bracket",
      ],
      features: [
        "Single and double elimination formats",
        "Custom seeding options",
        "Live score updates",
        "Print-friendly bracket views",
      ],
    },
  }

  return tools[slug] || tools["rotation-calculator"]
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background">
        <div className="mx-auto max-w-4xl px-6 py-4 sm:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="font-medium text-muted-foreground transition-colors hover:text-foreground">
              BadmintonLover
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <Link href="/tools" className="font-medium text-muted-foreground transition-colors hover:text-foreground">
              Tools
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
        {/* Tool Header */}
        <header className="mb-16">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tool</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-xs text-muted-foreground">Coming Soon</span>
          </div>
          <h1 className="mb-6 text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            {tool.title}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{tool.description}</p>
        </header>

        {/* Tool Placeholder */}
        <div className="mb-16 rounded-lg border border-border bg-muted/20 p-12 text-center">
          <div className="mx-auto max-w-md">
            <p className="mb-2 text-base font-medium text-foreground">Interactive Tool Interface</p>
            <p className="text-sm text-muted-foreground">
              This tool is currently in development and will be available soon.
            </p>
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-2">
          {/* How to Use */}
          <section>
            <h2 className="mb-6 text-xl font-medium tracking-tight text-foreground">How to Use</h2>
            <ol className="space-y-4">
              {tool.instructions.map((instruction: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-xs font-medium text-foreground">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-relaxed text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="mb-6 text-xl font-medium tracking-tight text-foreground">Key Features</h2>
            <ul className="space-y-3">
              {tool.features.map((feature: string, index: number) => (
                <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* CTA Section */}
        <section className="mt-16 border-t border-border pt-12">
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            Want to be notified when this tool launches?{" "}
            <Link
              href="/"
              className="font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              Return to homepage
            </Link>{" "}
            to explore other BadmintonLover resources.
          </p>
        </section>
      </main>
    </div>
  )
}
