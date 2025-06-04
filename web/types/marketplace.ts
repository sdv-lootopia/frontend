export interface MarketplaceItem {
    id: string
    artefact: {
        id: string
        name: string
        description: string
        image?: string
        rarity: "commun" | "rare" | "épique" | "légendaire"
        type: "carte" | "objet" | "clé" | "boussole" | "autre"
    }
    seller: {
        id: string
        nickname: string
    }
    currentPrice: number
    startingPrice: number
    buyNowPrice?: number
    endTime: Date
    bidCount: number
    status: "active" | "ended" | "sold"
    highestBidder?: {
        id: string
        nickname: string
    }
}

export interface Bid {
    id: string
    auctionId: string
    bidder: {
        id: string
        nickname: string
    }
    amount: number
    timestamp: Date
}
