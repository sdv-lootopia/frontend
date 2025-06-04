export interface InventoryItem {
    id: string
    artefact: {
        id: string
        name: string
        description: string
        image?: string
        rarity: "commun" | "rare" | "épique" | "légendaire"
        type: "carte" | "objet" | "clé" | "boussole" | "autre"
        effects?: string[]
    }
    quantity: number
    acquiredDate: Date
    source: "cache" | "achat" | "enchère" | "événement" | "craft"
    isOnSale: boolean
    auctionId?: string
}

export interface UserInventory {
    userId: string
    items: InventoryItem[]
    totalItems: number
    lastUpdated: Date
}