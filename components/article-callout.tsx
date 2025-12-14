import type { ReactNode } from "react"

type CalloutVariant = "tip" | "mistake" | "info"

interface CalloutProps {
  variant?: CalloutVariant
  title: string
  children: ReactNode
}

export function ArticleCallout({ variant = "info", title, children }: CalloutProps) {
  const styles = {
    tip: {
      border: "border-l-2 border-foreground",
      bg: "bg-muted/50",
      titleColor: "text-foreground",
    },
    mistake: {
      border: "border-l-2 border-muted-foreground/60",
      bg: "bg-muted/30",
      titleColor: "text-muted-foreground",
    },
    info: {
      border: "border-l-2 border-accent-foreground",
      bg: "bg-accent/40",
      titleColor: "text-accent-foreground",
    },
  }

  const style = styles[variant]

  return (
    <div className={`${style.border} ${style.bg} px-6 py-5`}>
      <div className={`mb-2 text-xs font-medium uppercase tracking-wider ${style.titleColor}`}>{title}</div>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  )
}
