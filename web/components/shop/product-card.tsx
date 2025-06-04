"use client"

import { Clock, Crown, ShoppingCart, Tag } from "lucide-react"
import type { Product } from "@/types/product"
import { useMemo } from "react"

export interface ProductCardProps {
    product: Product
    onBuy: (product: Product) => void
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
    const isDiscounted = product.discount && product.discount > 0

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

    const calculateOriginalPrice = () =>
        isDiscounted && product.discount !== undefined
            ? Math.round(product.price / (1 - product.discount / 100))
            : product.price

    const originalPrice = calculateOriginalPrice()

    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-neutral-50 shadow-sm hover:shadow-md">
            <div className="relative">
                <div className="relative aspect-square w-full overflow-hidden bg-[#F1F1EB]">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.new && (
                        <span className="rounded-full bg-blue-300 px-2 py-0.5 text-xs font-medium text-white">Nouveau</span>
                    )}
                    {product.featured && (
                        <span className="rounded-full bg-sand-200 px-2 py-0.5 text-xs font-medium text-white">Populaire</span>
                    )}
                    {product.discount && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-white">
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
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-auto">
                    <div className="mb-2">
                        <h3 className="font-medium text-sand-500 line-clamp-2">{product.name}</h3>
                    </div>
                    <p className="mb-4 text-sm text-grey-200 line-clamp-3">{product.description}</p>
                </div>
                {product.partner && (
                    <div className="mb-3 flex items-center">
                        <Tag className="mr-1.5 h-4 w-4 text-grey-300" />
                        <span className="text-xs text-grey-300">Offert par {product.partner}</span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    {isDiscounted ? (
                        <div className="flex flex-col items-start">
                            <div className="flex items-center text-blue-200">
                                <Crown className="mr-1 h-4 w-4" />
                                <span className="font-medium">{product.price}</span>
                            </div>
                            <div className="flex items-center text-gray-200">
                                <Crown className="mr-1 h-4 w-4" />
                                <span className="text-xs line-through">{originalPrice}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center text-blue-200">
                            <Crown className="mr-1 h-4 w-4" />
                            <span className="font-medium">{product.price}</span>
                        </div>
                    )}
                    <button
                        onClick={() => onBuy(product)}
                        className="flex items-center rounded-full bg-blue-100 p-2 text-sm font-medium text-white hover:bg-blue-400"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
                <span
                    className={`text-xs font-semibold ${product.stock && product.stock < 10 ? "text-orange-500" : "text-green-600"}`}
                >
                    {product.stock && product.stock < 10 && `Plus que ${product.stock} en stock`}
                </span>
            </div>
        </div>
    )
}
