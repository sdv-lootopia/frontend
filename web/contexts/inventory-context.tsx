"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { InventoryItem } from "@/types/inventory"

interface InventoryContextType {
    inventory: InventoryItem[]
    availableForSale: InventoryItem[]
    itemsOnSale: InventoryItem[]
    totalItems: number
    addItem: (item: InventoryItem) => void
    removeItem: (itemId: string) => void
    markAsOnSale: (itemId: string, auctionId: string) => void
    markAsNotOnSale: (itemId: string) => void
    getItemById: (itemId: string) => InventoryItem | undefined
}

const InventoryContext = createContext<InventoryContextType | null>(null)

const INITIAL_INVENTORY: InventoryItem[] = [
    {
        id: "inv1",
        artefact: {
            id: "art1",
            name: "Carte de Navigation Ancienne",
            description: "Une carte détaillée des routes commerciales d'autrefois, révélant des passages secrets.",
            rarity: "rare",
            type: "carte",
            image: "https://placehold.co/400x300/A4AED9/1B233E?text=Carte+Navigation",
            effects: ["Révèle les chemins cachés", "Augmente la précision GPS"],
        },
        quantity: 1,
        acquiredDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        source: "cache",
        isOnSale: false,
    },
    {
        id: "inv2",
        artefact: {
            id: "art2",
            name: "Amulette de Chance",
            description: "Augmente la probabilité de trouver des trésors rares pendant 24h.",
            rarity: "épique",
            type: "objet",
            image: "https://placehold.co/400x300/7687C6/FFFFFF?text=Amulette",
            effects: ["Chance +15%", "Durée: 24h"],
        },
        quantity: 2,
        acquiredDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        source: "achat",
        isOnSale: false,
    },
    {
        id: "inv3",
        artefact: {
            id: "art3",
            name: "Clé de Bronze",
            description: "Ouvre certains coffres de niveau intermédiaire sans dépenser de Couronnes.",
            rarity: "commun",
            type: "clé",
            image: "https://placehold.co/400x300/CECEC9/3D3D3B?text=Clé+Bronze",
            effects: ["Ouvre coffres niveau 1-3", "Usage unique"],
        },
        quantity: 3,
        acquiredDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        source: "cache",
        isOnSale: false,
    },
    {
        id: "inv4",
        artefact: {
            id: "art4",
            name: "Boussole Enchantée",
            description: "Guide automatiquement vers le trésor le plus proche dans un rayon de 5km.",
            rarity: "légendaire",
            type: "boussole",
            image: "https://placehold.co/400x300/DDCE92/423D28?text=Boussole+Légendaire",
            effects: ["Détection automatique", "Rayon: 5km", "Précision: 1m"],
        },
        quantity: 1,
        acquiredDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        source: "événement",
        isOnSale: false,
    },
    {
        id: "inv5",
        artefact: {
            id: "art5",
            name: "Carte au Trésor Fragmentée",
            description: "Fragment d'une carte légendaire. Collectez les 3 fragments pour révéler un trésor épique.",
            rarity: "rare",
            type: "carte",
            image: "https://placehold.co/400x300/F8F1D7/8B815A?text=Fragment+1/3",
            effects: ["Fragment 1/3", "Combinable"],
        },
        quantity: 1,
        acquiredDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        source: "cache",
        isOnSale: false,
    },
    {
        id: "inv6",
        artefact: {
            id: "art6",
            name: "Détecteur de Métaux Portable",
            description: "Révèle la présence d'objets métalliques dans un rayon de 50m.",
            rarity: "épique",
            type: "objet",
            image: "https://placehold.co/400x300/A7C55E/445223?text=Détecteur",
            effects: ["Détection métaux", "Rayon: 50m", "Batterie: 6h"],
        },
        quantity: 1,
        acquiredDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        source: "achat",
        isOnSale: true,
        auctionId: "auction_123",
    },
]

export function InventoryProvider({ children }: { children: ReactNode }) {
    const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY)

    useEffect(() => {
        try {
            const savedInventory = localStorage.getItem("lootopia-inventory")
            if (savedInventory) {
                const parsedInventory = JSON.parse(savedInventory)
                const inventoryWithDates = parsedInventory.map((item: any) => ({
                    ...item,
                    acquiredDate: new Date(item.acquiredDate),
                }))
                setInventory(inventoryWithDates)
            }
        } catch (error) {
            console.error("Erreur lors du chargement de l'inventaire:", error)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("lootopia-inventory", JSON.stringify(inventory))
    }, [inventory])

    const addItem = (item: InventoryItem) => {
        setInventory((prev) => {
            const existingItem = prev.find((invItem) => invItem.artefact.id === item.artefact.id)
            if (existingItem) {
                return prev.map((invItem) =>
                    invItem.artefact.id === item.artefact.id
                        ? { ...invItem, quantity: invItem.quantity + item.quantity }
                        : invItem,
                )
            } else {
                return [...prev, item]
            }
        })
    }

    const removeItem = (itemId: string) => {
        setInventory((prev) => prev.filter((item) => item.id !== itemId))
    }

    const markAsOnSale = (itemId: string, auctionId: string) => {
        setInventory((prev) =>
            prev.map((item) => {
                if (item.id === itemId) {
                    if (item.quantity > 1) {
                        const newItemId = `${itemId}_sale_${Date.now()}`

                        const newItem = {
                            ...item,
                            id: newItemId,
                            quantity: 1,
                            isOnSale: true,
                            auctionId,
                        }

                        const updatedOriginalItem = {
                            ...item,
                            quantity: item.quantity - 1,
                        }

                        return updatedOriginalItem
                    } else {
                        return { ...item, isOnSale: true, auctionId }
                    }
                }
                return item
            }),
        )

        const item = inventory.find((item) => item.id === itemId)
        if (item && item.quantity > 1) {
            const newItemId = `${itemId}_sale_${Date.now()}`
            const newItem = {
                ...item,
                id: newItemId,
                quantity: 1,
                isOnSale: true,
                auctionId,
            }

            setInventory((prev) => [...prev, newItem])
        }
    }

    const markAsNotOnSale = (itemId: string) => {
        setInventory((prev) =>
            prev.map((item) => (item.id === itemId ? { ...item, isOnSale: false, auctionId: undefined } : item)),
        )
    }

    const getItemById = (itemId: string) => {
        return inventory.find((item) => item.id === itemId)
    }

    const availableForSale = inventory.filter((item) => !item.isOnSale && item.quantity > 0)
    const itemsOnSale = inventory.filter((item) => item.isOnSale)
    const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0)

    const value = {
        inventory,
        availableForSale,
        itemsOnSale,
        totalItems,
        addItem,
        removeItem,
        markAsOnSale,
        markAsNotOnSale,
        getItemById,
    }

    return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}

export function useInventory() {
    const context = useContext(InventoryContext)
    if (context === null) {
        throw new Error("useInventory must be used within an InventoryProvider")
    }
    return context
}
