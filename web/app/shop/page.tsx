"use client"

import { ShoppingBag } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import type { Product, ProductCategory } from "@/types/product"
import type { PartnerSubCategory, SortOption } from "@/types/filters"
import CategoryFilter from "@/components/shop/category-filter"
import CrownsPack from "@/components/shop/crowns-pack"
import InfoSection from "@/components/shop/info-section"
import PageHeader from "@/components/shop/page-header"
import PartnerSubCategoryFilter from "@/components/shop/partner-subcategory-filter"
import ProductGrid from "@/components/shop/product-grid"
import SearchAndSortBar from "@/components/shop/search-sort-bar"
import FeaturedEventsSection from "@/components/shop/featured-events-section"
import { useCart } from "@/contexts/cart-context"



function sortProducts(products: Product[], sortBy: SortOption) {
    return [...products].sort((a, b) => {
        switch (sortBy) {
            case "recent":
                return a.new ? -1 : b.new ? 1 : 0
            case "price-asc":
                return a.price - b.price
            case "price-desc":
                return b.price - a.price
            case "popular":
            default:
                return a.featured ? -1 : b.featured ? 1 : 0
        }
    })
}

export default function ShopPage() {

    const [activeCategory, setActiveCategory] = useState<ProductCategory | "tous">("tous")
    const [activePartnerSubCategory, setActivePartnerSubCategory] = useState<PartnerSubCategory | "tous">("tous")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortOption>("popular")
    const [showCrownPacks, setShowCrownPacks] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const { addItem } = useCart()

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)
        return () => clearInterval(timer)
    }, [])

    const products: Product[] = [
        {
            id: "1",
            name: "Amulette de Fortune",
            description: "Augmente vos chances de trouver des trésors rares pendant 24h",
            price: 250,
            category: "bonus",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748947466-chatgpt-image-3-juin-2025-12-44-21.jpg",
            featured: true,
            new: true,
            stock: 15,
        },
        {
            id: "2",
            name: "Carte au Trésor Premium",
            description: "Révèle l'emplacement d'un trésor caché dans votre ville",
            price: 500,
            category: "goods",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748947307-chatgpt-image-3-juin-2025-12-41-33.jpg",
            stock: 8,
        },
        {
            id: "3",
            name: "Boost d'XP",
            description: "Double votre gain d'expérience pendant 48h",
            price: 150,
            category: "bonus",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748947198-chatgpt-image-3-juin-2025-12-39-55.jpg",
            stock: 999,
        },
        {
            id: "4",
            name: "Coffre Mystère",
            description: "Contient des objets aléatoires de valeur variable",
            price: 300,
            category: "goods",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748947227-chatgpt-image-3-juin-2025-12-40-20.jpg",
            featured: true,
            stock: 42,
        },
        {
            id: "7",
            name: "Pack Aventurier Premium",
            description: "Accès exclusif à des zones de chasse spéciales pendant 1 mois",
            price: 1000,
            category: "goods",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748984808-chatgpt-image-3-juin-2025-23-06-25.jpg",
            featured: true,
            stock: 5,
        },
        {
            id: "8",
            name: "Bon d'achat Librairie Odyssée",
            description: "Bon d'achat de 15€ valable sur tout le catalogue",
            price: 350,
            category: "partner",
            partnerSubCategory: "produit-physique",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748984354-chatgpt-image-3-juin-2025-22-58-46.jpg",
            partner: "Librairie Odyssée",
            stock: 18,
        },
        {
            id: "9",
            name: "Détecteur de Trésors",
            description: "Vibre lorsque vous êtes proche d'un trésor caché",
            price: 450,
            category: "event",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748975577-chatgpt-image-3-juin-2025-20-32-53.jpg",
            stock: 7,
            expiresAt: new Date(currentTime.getTime() + 2 * 24 * 60 * 60 * 1000),
            featured: true,
        },
        {
            id: "10",
            name: "Indice Supplémentaire",
            description: "Débloque un indice supplémentaire lors d'une chasse difficile",
            price: 75,
            category: "bonus",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748974710-chatgpt-image-3-juin-2025-20-18-26.jpg",
            stock: 200,
        },
        {
            id: "12",
            name: "Boussole Enchantée",
            description: "Pointe toujours vers le trésor le plus proche",
            price: 600,
            category: "bonus",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748947155-chatgpt-image-3-juin-2025-12-39-09.jpg",
            featured: true,
            stock: 3,
        },
        {
            id: "13",
            name: "T-shirt Exclusif Lootopia",
            description: "T-shirt collector avec logo brodé et QR code secret",
            price: 320,
            category: "partner",
            partnerSubCategory: "produit-physique",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748973300-chatgpt-image-3-juin-2025-19-54-51.jpg",
            partner: "ClothCraft",
            new: true,
            stock: 50,
        },
        {
            id: "14",
            name: "Mug Aventurier",
            description: "Mug thermosensible révélant une carte au trésor",
            price: 180,
            category: "partner",
            partnerSubCategory: "produit-physique",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748973467-chatgpt-image-3-juin-2025-19-57-42.jpg",
            partner: "CeramicArt",
            stock: 35,
        },
        {
            id: "15",
            name: "Coaching Aventurier",
            description: "Session de coaching personnalisée pour améliorer vos techniques de chasse",
            price: 450,
            category: "partner",
            partnerSubCategory: "service",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748984019-chatgpt-image-3-juin-2025-22-53-37.jpg",
            partner: "QuestMaster",
            featured: true,
            stock: 8,
        },
        {
            id: "16",
            name: "Livre 'Secrets des Chasseurs de Trésors'",
            description: "Guide exclusif avec astuces et techniques avancées",
            price: 220,
            category: "partner",
            partnerSubCategory: "produit-physique",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748973137-chatgpt-image-3-juin-2025-19-51-16.jpg",
            partner: "Éditions Mystère",
            stock: 15,
        },
        {
            id: "18",
            name: "Boost Chasse au Trésor Nocturne",
            description: "Accès à une chasse au trésor spéciale qui n'a lieu que la nuit",
            price: 350,
            category: "event",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748983665-chatgpt-image-3-juin-2025-22-47-42.jpg",
            stock: 50,
            expiresAt: new Date(currentTime.getTime() + 3 * 24 * 60 * 60 * 1000),
        },
        {
            id: "21",
            name: "Clé Dorée de l'Éclipse",
            description: "Permet d'accéder à un coffre unique ouvert uniquement lors des éclipses.",
            price: 420,
            category: "event",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748967544-chatgpt-image-3-juin-2025-18-18-58.jpg",
            stock: 15,
            expiresAt: new Date(currentTime.getTime() + 1 * 24 * 60 * 60 * 1000),
        },
        {
            id: "22",
            name: "Pass Festival LootFest",
            description: "Accès VIP à tous les contenus exclusifs de l'événement LootFest.",
            price: 600,
            category: "event",
            image: "https://image.noelshack.com/fichiers/2025/23/2/1748983869-chatgpt-image-3-juin-2025-22-51-04.jpg",
            featured: true,
            stock: 80,
            expiresAt: new Date(currentTime.getTime() + 5 * 24 * 60 * 60 * 1000),
        },
    ]

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = activeCategory === "tous" || product.category === activeCategory

            const matchesPartnerSubCategory =
                activeCategory !== "partner" ||
                activePartnerSubCategory === "tous" ||
                product.partnerSubCategory === activePartnerSubCategory

            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())

            return matchesCategory && matchesPartnerSubCategory && matchesSearch
        })
    }, [products, activeCategory, activePartnerSubCategory, searchQuery])

    const sortedProducts = useMemo(() => sortProducts(filteredProducts, sortBy), [filteredProducts, sortBy])

    const isEventActive = (product: Product, now: Date) => {
        return product.category === "event" && (!product.expiresAt || product.expiresAt > now)
    }

    const eventProducts = useMemo(() => {
        const now = new Date()
        return sortProducts(
            products.filter(product => isEventActive(product, now)),
            sortBy
        ).slice(0, 4)
    }, [products, sortBy])

    const handleBuyProduct = (product: Product) => {
        addItem(product)
    }

    return (
        <div className="mx-auto max-w-7xl px-8 py-8">
            <div className="overflow-hidden rounded-3xl">
                <div className="space-y-4 pb-4">

                    <PageHeader
                        title="Boutique"
                        description="Dépensez vos Couronnes pour obtenir des bonus et des offres exclusives"
                    />

                    <InfoSection
                        showCrownPacks={showCrownPacks}
                        setShowCrownPacks={setShowCrownPacks}
                    />

                    {showCrownPacks && (<CrownsPack />)}

                    <SearchAndSortBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        productCount={filteredProducts.length}
                    />

                    <CategoryFilter
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        setActivePartnerSubCategory={setActivePartnerSubCategory}
                    />

                    {activeCategory === "partner" && (
                        <PartnerSubCategoryFilter
                            activeSub={activePartnerSubCategory}
                            setActiveSub={setActivePartnerSubCategory}
                        />
                    )}

                    {activeCategory === "tous" && searchQuery.trim() === "" && eventProducts.length > 0 && (
                        <FeaturedEventsSection
                            eventProducts={eventProducts}
                            onSeeAll={() => setActiveCategory("event")}
                            onBuy={handleBuyProduct}
                        />
                    )}

                    <div className="flex items-center px-3 py-1">
                        <ShoppingBag className="mr-2 h-4 w-4 text-blue-300" />
                        <span className="text-sm text-sand-500">{filteredProducts.length} produits</span>
                    </div>
                </div>

                <ProductGrid products={sortedProducts} onBuy={handleBuyProduct} />
            </div>
        </div>
    )
}
