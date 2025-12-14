"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", "484021/badmintonlover")
    script.setAttribute("data-repo-id", "R_kgDONuh8Og") // Will need to get this
    script.setAttribute("data-category", "Comments")
    script.setAttribute("data-category-id", "DIC_kwDONuh8Os4CzyS0") // Will need to get this
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "top")
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light")
    script.setAttribute("data-lang", "en")
    script.setAttribute("data-loading", "lazy")
    script.crossOrigin = "anonymous"
    script.async = true

    ref.current.appendChild(script)
  }, [resolvedTheme])

  return <div ref={ref} className="giscus mt-8" />
}
