"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useEffect, useState } from "react"

export default function CartButton() {
  const { toggleCart, totalItems } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevTotalItems, setPrevTotalItems] = useState(totalItems)

  // Animation lorsque le nombre d'articles change
  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
    setPrevTotalItems(totalItems)
  }, [totalItems, prevTotalItems])

  return (
    <button
      onClick={toggleCart}
      className="relative flex items-center rounded-full bg-sand-50 px-3 py-2 transition-all hover:bg-sand-100"
      aria-label="Ouvrir le panier"
    >
      <ShoppingCart className={`h-5 w-5 text-blue-200 ${isAnimating ? "animate-bounce" : ""}`} />
      {totalItems > 0 && (
        <span
          className={`ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-white ${isAnimating ? "animate-pulse" : ""
            }`}
        >
          {totalItems}
        </span>
      )}
    </button>
  )
}
