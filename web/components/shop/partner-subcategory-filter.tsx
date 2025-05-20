import { Headphones, Package } from "lucide-react"
import type { PartnerSubCategory } from "@/types/filters"

interface Props {
    activeSub: PartnerSubCategory | "tous"
    setActiveSub: (val: PartnerSubCategory | "tous") => void
}

export default function PartnerSubCategoryFilter({ activeSub, setActiveSub }: Props) {
    const baseClass = "rounded-full px-4 py-1.5 text-xs font-medium transition-colors"

    return (
        <div className="flex flex-wrap gap-2 border-l-2 border-blue-100 mb-5 ml-4 pl-4">
            <button
                onClick={() => setActiveSub("tous")}
                className={`${baseClass} ${activeSub === "tous"
                    ? "bg-sand-300 text-white"
                    : "bg-neutral-50 text-sand-500 hover:bg-sand-50"
                    }`}
            >
                Tous
            </button>
            <button
                onClick={() => setActiveSub("produit-physique")}
                className={`${baseClass} flex items-center ${activeSub === "produit-physique"
                    ? "bg-sand-300 text-white"
                    : "bg-neutral-50 text-sand-500 hover:bg-sand-50"
                    }`}
            >
                <Package className="mr-1.5 h-3 w-3" />
                Produits physiques
            </button>
            <button
                onClick={() => setActiveSub("service")}
                className={`${baseClass} flex items-center ${activeSub === "service"
                    ? "bg-sand-300 text-white"
                    : "bg-neutral-50 text-sand-500 hover:bg-sand-50"
                    }`}
            >
                <Headphones className="mr-1.5 h-3 w-3" />
                Services
            </button>
        </div>
    )
}
