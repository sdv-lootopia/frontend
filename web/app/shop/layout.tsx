import { Metadata } from "next"
import type { ReactNode } from "react"
import BaseLayout from "@/components/base-page"
import CartToast from "@/components/cart/cart-toast"

export const metadata: Metadata = {
    title: "Boutique - Lootopia",
}

export default function BoutiqueLayout({ children }: { children: ReactNode }) {
    return (
        <BaseLayout>
            {children}
            <CartToast />
        </BaseLayout>
    )
}
