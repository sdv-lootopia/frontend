import type { PartnerSubCategory } from "./types"

export interface Product {
    id: string
    name: string
    description: string
    price: number
    category: ProductCategory
    partnerSubCategory?: PartnerSubCategory
    image: string
    partner?: string
    discount?: number
    featured?: boolean
    new?: boolean
    stock?: number
    expiresAt?: Date
}

export type ProductCategory = "goods" | "bonus" | "partner" | "event" 