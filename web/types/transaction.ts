export interface Transaction {
    id: string
    type: "purchase" | "sale" | "crown_purchase" | "reward" | "refund"
    amount: number
    description: string
    timestamp: Date
    metadata?: {
        productId?: string
        productName?: string
        packSize?: number
        auctionId?: string
        [key: string]: any
    }
}

export interface TransactionHistory {
    transactions: Transaction[]
    totalTransactions: number
    totalSpent: number
    totalEarned: number
    lastUpdated: Date
}
