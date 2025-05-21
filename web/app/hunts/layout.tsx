import type React from "react"
export default function HuntsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="hunts-layout">{children}</div>
}
