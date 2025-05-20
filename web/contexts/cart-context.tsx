"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/product"
import type { CartItem } from "@/types/cart"

interface CartContextType {
    items: CartItem[]
    isOpen: boolean
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    toggleCart: () => void
    closeCart: () => void
    totalItems: number
    totalPrice: number
    hasPhysicalProducts: boolean
    lastAddedItem: string | null
    setLastAddedItem: (name: string | null) => void
}

// Créer le contexte avec une valeur par défaut
const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [initialized, setInitialized] = useState(false)
    const [lastAddedItem, setLastAddedItem] = useState<string | null>(null)

    // Charger le panier depuis le localStorage au montage du composant
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("lootopia-cart")
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart)
                setItems(parsedCart)
            }
        } catch (error) {
            console.error("Erreur lors du chargement du panier:", error)
        } finally {
            setInitialized(true)
        }
    }, [])

    // Sauvegarder le panier dans le localStorage à chaque modification
    useEffect(() => {
        if (initialized) {
            localStorage.setItem("lootopia-cart", JSON.stringify(items))
        }
    }, [items, initialized])

    // Ajouter un produit au panier
    const addItem = (product: Product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product.id === product.id)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                )
            } else {
                return [...prevItems, { product, quantity: 1 }]
            }
        })
        setIsOpen(true) // Ouvrir le panier automatiquement
        setLastAddedItem(product.name) // Définir le dernier article ajouté
    }

    // Supprimer un produit du panier
    const removeItem = (productId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
    }

    // Mettre à jour la quantité d'un produit
    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId)
            return
        }
        setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
    }

    // Vider le panier
    const clearCart = () => {
        setItems([])
    }

    // Ouvrir/fermer le panier
    const toggleCart = () => {
        setIsOpen((prev) => !prev)
    }

    // Fermer le panier
    const closeCart = () => {
        setIsOpen(false)
    }

    // Calculer le nombre total d'articles
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)

    // Calculer le prix total
    const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

    const hasPhysicalProducts = items.some(
        (item) => item.product.category === "partner" && item.product.partnerSubCategory === "produit-physique",
    )

    const value = {
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        totalItems,
        totalPrice,
        hasPhysicalProducts,
        lastAddedItem,
        setLastAddedItem,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === null) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
