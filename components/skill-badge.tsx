interface SkillBadgeProps {
  level: "beginner" | "intermediate" | "advanced" | "all-levels"
}

export function SkillBadge({ level }: SkillBadgeProps) {
  const labels = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    "all-levels": "All Levels",
  }

  return (
    <span className="inline-flex items-center rounded-sm border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground">
      {labels[level]}
    </span>
  )
}
