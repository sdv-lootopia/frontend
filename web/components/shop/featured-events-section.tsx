import { ChevronRight } from "lucide-react"
import ProductCard from "./product-card"
import type { Product } from "@/types/product"

interface Props {
    eventProducts: Product[]
    onSeeAll: () => void
    onBuy: (product: Product) => void
    title?: string
}

export default function FeaturedEventsSection({
    eventProducts,
    onSeeAll,
    onBuy,
    title = "À ne pas manquer"
}: Props) {
    if (eventProducts.length === 0) return null

    return (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-medium text-sand-500">{title}</h2>
                <button
                    onClick={onSeeAll}
                    className="flex items-center text-sm font-medium text-blue-300 hover:text-blue-400"
                >
                    Voir tout
                    <ChevronRight className="ml-1 h-4 w-4" />
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {eventProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onBuy={onBuy} />
                ))}
            </div>
        </div>
    )
}
