import { Metadata } from "next"
import type { ReactNode } from "react"
import BasePage from "@/components/base-page"
import CartToast from "@/components/cart/cart-toast"

export const metadata: Metadata = {
    title: "Boutique - Lootopia",
}

export default function BoutiqueLayout({ children }: { children: ReactNode }) {
    return (
        <BasePage>
            {children}
            <CartToast />
        </BasePage>
    )
}
