"use client"

import { Clock, Crown, ShoppingCart, Tag } from "lucide-react"
import type { Product } from "@/types/product"
import { useMemo } from "react"

export interface ProductCardProps {
    product: Product
    onBuy: (product: Product) => void
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
    const timeRemaining = useMemo(() => {
        if (!product.expiresAt) return null

        const now = new Date()
        const total = product.expiresAt.getTime() - now.getTime()
        const days = Math.floor(total / (1000 * 60 * 60 * 24))
        const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

        if (days > 0) {
            return `${days}j ${hours}h restants`
        } else if (hours > 0) {
            return `${hours}h restantes`
        } else {
            return "Expire aujourd'hui"
        }
    }, [product.expiresAt])

    return (
        <div className="group overflow-hidden rounded-xl bg-neutral-50 shadow-sm hover:shadow-md">
            <div className="relative">
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-48 w-full object-cover" />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.new && (
                        <span className="rounded-full bg-blue-300 px-2 py-0.5 text-xs font-medium text-white">Nouveau</span>
                    )}
                    {product.featured && (
                        <span className="rounded-full bg-sand-300 px-2 py-0.5 text-xs font-medium text-white">Populaire</span>
                    )}
                    {product.discount && (
                        <span className="rounded-full bg-green-300 px-2 py-0.5 text-xs font-medium text-white">
                            -{product.discount}%
                        </span>
                    )}
                </div>
                <div className="absolute bottom-2 right-2">
                    {product.expiresAt ? (
                        <span className="flex items-center rounded-full bg-red-500/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                            <Clock className="mr-1 h-3 w-3" />
                            {timeRemaining}
                        </span>
                    ) : (
                        <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-sand-500 backdrop-blur-sm">
                            {(
                                {
                                    goods: "Bien",
                                    bonus: "Bonus",
                                    event: "Événement",
                                    partner: "Partenaire",
                                } as Record<string, string>
                            )[product.category] ?? "Inconnu"}
                        </span>
                    )}
                </div>
            </div>
            <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-medium text-sand-500">{product.name}</h3>
                    <div className="flex items-center text-blue-300">
                        <Crown className="mr-1 h-4 w-4" />
                        <span className="font-medium">{product.price}</span>
                    </div>
                </div>
                <p className="mb-4 text-sm text-grey-200">{product.description}</p>
                {product.partner && (
                    <div className="mb-3 flex items-center">
                        <Tag className="mr-1.5 h-4 w-4 text-grey-300" />
                        <span className="text-xs text-grey-300">Offert par {product.partner}</span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <span
                        className={`text-xs font-semibold ${product.stock && product.stock < 10 ? "text-orange-500" : "text-green-600"}`}
                    >
                        {product.stock && product.stock < 10 ? `Plus que ${product.stock} en stock` : "En stock"}
                    </span>
                    <button
                        onClick={() => onBuy(product)}
                        className="flex items-center rounded-full bg-blue-300 px-3 py-1 text-sm font-medium text-white hover:bg-blue-400"
                    >
                        <ShoppingCart className="mr-1 h-4 w-4" /> Acheter
                    </button>
                </div>
            </div>
        </div>
    )
}
