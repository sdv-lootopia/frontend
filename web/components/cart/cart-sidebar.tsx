"use client"

import { useCart } from "@/contexts/cart-context"
import { X, Trash2, Plus, Minus, Crown, ShoppingBag } from "lucide-react"
import { useEffect } from "react"
import Link from "next/link"
import EmptyCartMessage from "./empty-cart-message"

export default function CartSidebar() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

    // Empêcher le défilement du body lorsque le panier est ouvert
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeCart()
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [closeCart])

    if (!isOpen) return null

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity" onClick={closeCart}></div>

            {/* Sidebar */}
            <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-xl transition-transform sm:max-w-lg">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                    <h2 className="text-xl font-bold text-sand-500">Votre panier</h2>
                    <button
                        onClick={closeCart}
                        className="rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <EmptyCartMessage buttonText="Continuer mes achats" onClick={closeCart} />
                    </div>
                ) : (
                    <>
                        <div className="my-4 max-h-[calc(100vh-280px)] overflow-y-auto py-2">
                            {items.map((item) => (
                                <div key={item.product.id} className="mb-4 rounded-lg border border-neutral-200 p-4">
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={item.product.image || "https://placehold.co/400x200/e2e8f0/64748b?text=Lootopia"}
                                            alt={item.product.name}
                                            className="h-20 w-20 rounded-md object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://placehold.co/400x200/e2e8f0/64748b?text=Lootopia"
                                            }}
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-medium text-sand-500">{item.product.name}</h3>
                                                <button
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-500"
                                                    aria-label="Supprimer du panier"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <p className="mb-2 text-xs text-blue-200 line-clamp-1">{item.product.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-blue-300">
                                                    <Crown className="mr-1 h-4 w-4" />
                                                    <span className="font-medium">{item.product.price}</span>
                                                </div>
                                                <div className="flex items-center rounded-lg border border-neutral-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-l-lg text-neutral-500 transition-colors hover:bg-neutral-100"
                                                        aria-label="Diminuer la quantité"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="flex h-8 w-8 items-center justify-center border-x border-neutral-200 text-sm text-sand-500">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-r-lg text-neutral-500 transition-colors hover:bg-neutral-100"
                                                        aria-label="Augmenter la quantité"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto border-t border-neutral-200 pt-4">
                            <div className="mb-2 flex items-center justify-between text-sm text-blue-200">
                                <span>Nombre d'articles</span>
                                <span>{totalItems}</span>
                            </div>
                            <div className="mb-4 flex items-center justify-between font-medium text-sand-500">
                                <span>Total</span>
                                <div className="flex items-center">
                                    <Crown className="mr-1 h-5 w-5 text-blue-300" />
                                    <span className="text-lg">{totalPrice}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={closeCart}
                                    className="rounded-full border border-blue-300 py-3 text-center font-medium text-blue-300 transition-colors hover:bg-blue-50"
                                >
                                    Continuer
                                </button>

                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="rounded-full bg-blue-300 py-3 text-center font-medium text-white transition-colors hover:bg-blue-400"
                                >
                                    Payer
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
