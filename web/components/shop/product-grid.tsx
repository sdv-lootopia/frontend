import ProductCard from "@/components/shop/product-card"
import type { Product } from "@/types/product"
import { ShoppingBag } from "lucide-react"

interface Props {
    products: Product[]
    onBuy: (product: Product) => void
}

export default function ProductGrid({ products, onBuy }: Props) {
    if (products.length === 0) {
        return (
            <div className="mt-8 rounded-xl bg-neutral-50 p-8 text-center">
                <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-blue-200" />
                <h3 className="mb-2 text-xl font-medium text-gray-800">Aucun produit trouvé</h3>
                <p className="text-gray-600">
                    Essayez de modifier vos critères de recherche ou consultez une autre catégorie.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onBuy={onBuy} />
            ))}
        </div>
    )
}
