"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Crown, MapPin, Minus, Package, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import CheckoutError from "@/components/checkout/checkout-error"
import CartSummary from "@/components/checkout/cart-summary"
import EmptyCartMessage from "@/components/cart/empty-cart-message"
import AddressForm, { AddressData } from "@/components/checkout/address-form"
import BasePage from "@/components/base-page"

const USER_BALANCE = 1250

export default function CheckoutPage() {
    useEffect(() => {
        document.title = "Récapitulatif commande - Lootopia"
    }, [])
    const { items, totalItems, totalPrice, clearCart, updateQuantity, removeItem, hasPhysicalProducts } = useCart()
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")
    const [shippingAddress, setShippingAddress] = useState<AddressData | null>(null)
    const [showAddressForm, setShowAddressForm] = useState(false)

    const handlePayment = () => {
        if (hasPhysicalProducts && !shippingAddress) {
            setShowAddressForm(true)
            return
        }

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
            <BasePage>
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
            </BasePage>
        )
    }

    const handleAddressSubmit = (address: AddressData) => {
        setShippingAddress(address)
        setShowAddressForm(false)
    }

    return (
        <BasePage>
            <div className="mx-auto max-w-7xl py-8">
                <div className="mb-6">
                    <Link href="/shop" className="mb-4 flex items-center text-blue-300 hover:text-blue-400">
                        ← Retour à la boutique
                    </Link>
                    <h1 className="text-3xl font-bold text-sand-600">Finaliser votre achat</h1>
                </div>

                {paymentStatus === "success" ? (
                    <div className="rounded-xl bg-white p-8 shadow-sm">
                        <div className="flex flex-col items-center justify-center text-center">
                            <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                            <h2 className="mb-2 text-2xl font-bold text-sand-500">Paiement réussi !</h2>
                            <p className="mb-6 text-blue-200">Votre commande a été traitée avec succès. Merci pour votre achat !</p>

                            {hasPhysicalProducts && shippingAddress && (
                                <div className="mb-6 w-full max-w-md rounded-lg bg-blue-50 p-4 text-left">
                                    <h3 className="mb-2 flex items-center font-medium text-sand-500">
                                        <MapPin className="mr-2 h-4 w-4 text-blue-300" />
                                        Livraison prévue à cette adresse :
                                    </h3>
                                    <p className="text-sm text-blue-200">
                                        {shippingAddress.firstName} {shippingAddress.lastName}
                                        <br />
                                        {shippingAddress.street}
                                        {shippingAddress.additionalInfo && (
                                            <>
                                                <br />
                                                {shippingAddress.additionalInfo}
                                            </>
                                        )}
                                        <br />
                                        {shippingAddress.postalCode} {shippingAddress.city}
                                        <br />
                                        {shippingAddress.country}
                                        <br />
                                        Tél: {shippingAddress.phone}
                                    </p>
                                </div>
                            )}

                            <Link
                                href="/shop"
                                className="rounded-full bg-blue-300 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-400"
                            >
                                Continuer mes achats
                            </Link>
                        </div>
                    </div>
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
                                            <div key={item.product.id} className="flex items-center gap-4 py-4">
                                                <img
                                                    src={item.product.image || "https://placehold.co/400x200/e2e8f0/64748b?text=Lootopia"}
                                                    alt={item.product.name}
                                                    className="h-16 w-16 rounded-md object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "https://placehold.co/400x200/e2e8f0/64748b?text=Lootopia"
                                                    }}
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-medium text-sand-500">{item.product.name}</h3>
                                                            {item.product.category === "partner" &&
                                                                item.product.partnerSubCategory === "produit-physique" && (
                                                                    <span className="mt-1 flex items-center text-xs text-blue-300">
                                                                        <Package className="mr-1 h-3 w-3" />
                                                                        Produit physique
                                                                    </span>
                                                                )}
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.product.id)}
                                                            className="rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-500"
                                                            aria-label="Supprimer du panier"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-blue-200 line-clamp-1">{item.product.description}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex items-center text-blue-300">
                                                        <Crown className="mr-1 h-4 w-4" />
                                                        <span className="font-medium">{item.product.price}</span>
                                                    </div>
                                                    <div className="flex items-center rounded-lg border border-neutral-200">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="flex h-8 w-8 items-center justify-center rounded-l-lg text-neutral-500 transition-colors hover:bg-neutral-100"
                                                            aria-label="Diminuer la quantité"
                                                            disabled={isProcessing}
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
                                                            disabled={isProcessing}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {hasPhysicalProducts && (showAddressForm || !shippingAddress) ? (
                                <div className="mt-6">
                                    <AddressForm onAddressSubmit={handleAddressSubmit} />
                                </div>
                            ) : hasPhysicalProducts && shippingAddress ? (
                                <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <MapPin className="mr-2 h-5 w-5 text-blue-300" />
                                            <h2 className="text-xl font-semibold text-sand-500">Adresse de livraison</h2>
                                        </div>
                                        <button
                                            onClick={() => setShowAddressForm(true)}
                                            className="text-sm font-medium text-blue-300 hover:text-blue-400"
                                        >
                                            Modifier
                                        </button>
                                    </div>
                                    <div className="rounded-lg bg-blue-50 p-4">
                                        <p className="text-sm text-blue-200">
                                            {shippingAddress.firstName} {shippingAddress.lastName}
                                            <br />
                                            {shippingAddress.street}
                                            {shippingAddress.additionalInfo && (
                                                <>
                                                    <br />
                                                    {shippingAddress.additionalInfo}
                                                </>
                                            )}
                                            <br />
                                            {shippingAddress.postalCode} {shippingAddress.city}
                                            <br />
                                            {shippingAddress.country}
                                            <br />
                                            Tél: {shippingAddress.phone}
                                        </p>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="md:col-span-1">
                            <CartSummary
                                totalItems={totalItems}
                                totalPrice={totalPrice}
                                userBalance={USER_BALANCE}
                                onPay={handlePayment}
                                isProcessing={isProcessing}
                                cartEmpty={items.length === 0}
                                shippingAddress={!!shippingAddress}
                                hasPhysicalProducts={hasPhysicalProducts}
                                showAddressForm={showAddressForm}
                            />
                        </div>
                    </div>
                )}
            </div>
        </BasePage>
    )
}