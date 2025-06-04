import BasePage from "@/components/base-page"
import type { ReactNode } from "react"

export default function PageLayout({ children }: { children: ReactNode }) {
    return <BasePage>{children}</BasePage>
}
