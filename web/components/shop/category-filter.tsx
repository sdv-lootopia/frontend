import { ShoppingBag, Star, Percent, Clock } from "lucide-react"
import type { PartnerSubCategory } from "@/types/filters"
import type { ProductCategory } from "@/types/product"

interface Props {
    activeCategory: ProductCategory | "tous"
    setActiveCategory: (value: ProductCategory | "tous") => void
    setActivePartnerSubCategory: (value: PartnerSubCategory | "tous") => void
}

export default function CategoryFilter({
    activeCategory,
    setActiveCategory,
    setActivePartnerSubCategory,
}: Props) {
    const handleClick = (category: ProductCategory | "tous") => {
        setActiveCategory(category)
        setActivePartnerSubCategory("tous")
    }

    const baseClass =
        "rounded-full px-4 py-2 text-sm font-medium transition-colors"

    return (
        <div className="mb-6 flex flex-wrap gap-2">
            <button
                onClick={() => handleClick("tous")}
                className={`${baseClass} flex items-center ${activeCategory === "tous"
                    ? "bg-blue-300 text-white"
                    : "bg-neutral-50 text-gray-700 hover:bg-blue-50"
                    }`}
            >
                Tous
            </button>
            <button
                onClick={() => handleClick("event")}
                className={`${baseClass} flex items-center ${activeCategory === "event"
                    ? "bg-blue-300 text-white"
                    : "bg-neutral-50 text-gray-700 hover:bg-blue-50"
                    }`}
            >
                <Clock className="mr-1.5 h-4 w-4" />
                Événements limités
            </button>
            <button
                onClick={() => handleClick("goods")}
                className={`${baseClass} flex items-center ${activeCategory === "goods"
                    ? "bg-blue-300 text-white"
                    : "bg-neutral-50 text-gray-700 hover:bg-blue-50"
                    }`}
            >
                <ShoppingBag className="mr-1.5 h-4 w-4" />
                Biens
            </button>
            <button
                onClick={() => handleClick("bonus")}
                className={`${baseClass} flex items-center ${activeCategory === "bonus"
                    ? "bg-blue-300 text-white"
                    : "bg-neutral-50 text-gray-700 hover:bg-blue-50"
                    }`}
            >
                <Star className="mr-1.5 h-4 w-4" />
                Bonus
            </button>
            <button
                onClick={() => handleClick("partner")}
                className={`${baseClass} flex items-center ${activeCategory === "partner"
                    ? "bg-blue-300 text-white"
                    : "bg-neutral-50 text-gray-700 hover:bg-blue-50"
                    }`}
            >
                <Percent className="mr-1.5 h-4 w-4" />
                Offres partenaires
            </button>
        </div>
    )
}
