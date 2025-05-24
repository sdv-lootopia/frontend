"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  attribute?: "class" | "style"
  defaultTheme?: string
  enableSystem?: boolean
}

export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
