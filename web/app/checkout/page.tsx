"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import BaseLayout from "@/components/base-page"
import CheckoutSuccess from "@/components/checkout/checkout-success"
import CheckoutError from "@/components/checkout/checkout-error"
import CartItem from "@/components/checkout/cart-item"
import CartSummary from "@/components/checkout/cart-summary"
import EmptyCartMessage from "@/components/cart/empty-cart-message"

const USER_BALANCE = 1250

export default function CheckoutPage() {
    const { items, totalItems, totalPrice, clearCart, updateQuantity, removeItem } = useCart()
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handlePayment = () => {
        setIsProcessing(true)
        setTimeout(() => {
            if (totalPrice > USER_BALANCE) {
                setPaymentStatus("error")
                setErrorMessage("Solde insuffisant. Veuillez acheter plus de Couronnes.")
                setIsProcessing(false)
                return
            }

            setPaymentStatus("success")
            setIsProcessing(false)

            setTimeout(() => {
                clearCart()
            }, 500)
        }, 1500)
    }

    if (items.length === 0 && paymentStatus === "idle") {
        return (
            <BaseLayout>
                <div className="mx-auto max-w-4xl px-4 py-8">
                    <div className="mb-6">
                        <Link href="/shop" className="mb-4 flex items-center text-blue-300 hover:text-blue-400">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Retour à la boutique
                        </Link>
                        <h1 className="text-3xl font-bold text-sand-600">Finaliser votre achat</h1>
                    </div>

                    <EmptyCartMessage />
                </div>
            </BaseLayout>
        )
    }

    return (
        <BaseLayout>
            <div className="mx-auto max-w-4xl px-4 py-8">
                <div className="mb-6">
                    <Link href="/shop" className="mb-4 flex items-center text-blue-300 hover:text-blue-400">
                        ← Retour à la boutique
                    </Link>
                    <h1 className="text-3xl font-bold text-sand-600">Finaliser votre achat</h1>
                </div>

                {paymentStatus === "success" ? (
                    <CheckoutSuccess />
                ) : paymentStatus === "error" ? (
                    <CheckoutError errorMessage={errorMessage} onRetry={() => setPaymentStatus("idle")} />
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-xl font-semibold text-sand-500">Récapitulatif de la commande</h2>

                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <ShoppingBag className="mb-4 h-12 w-12 text-neutral-300" />
                                        <p className="text-blue-200">Votre panier est vide</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-neutral-100">
                                        {items.map((item) => (
                                            <CartItem
                                                key={item.product.id}
                                                item={item}
                                                updateQuantity={updateQuantity}
                                                removeItem={removeItem}
                                                isProcessing={isProcessing}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <CartSummary
                                totalItems={totalItems}
                                totalPrice={totalPrice}
                                userBalance={USER_BALANCE}
                                onPay={handlePayment}
                                isProcessing={isProcessing}
                                cartEmpty={items.length === 0}
                            />
                        </div>
                    </div>
                )}
            </div>
        </BaseLayout>
    )
}