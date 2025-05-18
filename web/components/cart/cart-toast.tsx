"use client"

import { useState, useEffect } from "react"
import Toast from "@/components/ui/toast"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function CartToast() {
    const [lastAddedItem, setLastAddedItem] = useState<string | null>(null)
    const [showToast, setShowToast] = useState(false)
    const { items } = useCart()

    useEffect(() => {
        if (items.length > 0) {
            const lastItem = items[items.length - 1]
            const lastToastItemName = sessionStorage.getItem("lastToastItem")

            if (lastToastItemName !== lastItem.product.name) {
                setLastAddedItem(lastItem.product.name)
                setShowToast(true)
                sessionStorage.setItem("lastToastItem", lastItem.product.name)
            }
        }
    }, [items])

    if (!showToast || !lastAddedItem) return null

    return (
        <Toast
            message={`${lastAddedItem} a été ajouté au panier`}
            type="success"
            duration={3000}
            onClose={() => setShowToast(false)}
        >
            <ShoppingCart className="h-5 w-5" />
        </Toast>
    )
}
