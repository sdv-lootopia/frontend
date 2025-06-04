"use client"

import { useEffect, useState } from "react"
import { Crown, CreditCard, ArrowLeft, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import BasePage from "@/components/base-page"
import PageHeader from "@/components/shop/page-header"
import { useCrownBalance } from "@/contexts/crown-balance-context"
import { useSearchParams } from "next/navigation"

export default function BuyCrowns() {
    useEffect(() => {
        document.title = "Achat de Couronnes - Lootopia"
    }, [])

    const { balance } = useCrownBalance()
    const [selectedPack, setSelectedPack] = useState<string | null>(null)
    const [showCancelledMessage, setShowCancelledMessage] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.get("cancelled") === "true") {
            setShowCancelledMessage(true)
            setTimeout(() => setShowCancelledMessage(false), 5000)
        }
    }, [searchParams])

    const crownPacks = [
        {
            id: "crown-25",
            amount: 25,
            price: 1.99,
            bonus: 2,
            paymentLink: "https://buy.stripe.com/test_fZu28r1QS77igXc11e7g402",
        },
        {
            id: "crown-50",
            amount: 50,
            price: 3.99,
            bonus: 5,
            paymentLink: "https://buy.stripe.com/test_5kQ14nbrsbny0YeeS47g406",
        },
        {
            id: "crown-100",
            amount: 100,
            price: 7.99,
            bonus: 15,
            paymentLink: "https://buy.stripe.com/test_dRm28rcvwbny7mC7pC7g407",
        },
        {
            id: "crown-300",
            amount: 300,
            price: 24.99,
            bonus: 60,
            paymentLink: "https://buy.stripe.com/test_eVqdR91QS8bm0YecJW7g408",
        },
        {
            id: "crown-600",
            amount: 600,
            price: 39.99,
            bonus: 120,
            paymentLink: "https://buy.stripe.com/test_9B6aEX1QS77i5eudO07g409",
        },
    ]

    const handleBuyCrownPack = () => {
        if (!selectedPack) return

        const packDetails = crownPacks.find((pack) => pack.id === selectedPack)
        if (!packDetails) return

        window.location.href = packDetails.paymentLink
    }

    const selectedPackDetails = selectedPack ? crownPacks.find((pack) => pack.id === selectedPack) : null

    return (
        <BasePage>
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                    <PageHeader
                        title="Acheter des Couronnes"
                        description="Achetez des packs de Couronnes pour faire vos achats sur Lootopia"
                    >
                        <Link href="/shop" className="mb-4 flex items-center text-blue-300 hover:text-blue-400">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Retour à la boutique
                        </Link>
                    </PageHeader>

                    <div className="p-6">
                        {showCancelledMessage && (
                            <div className="mb-6 rounded-lg bg-yellow-50 p-4">
                                <div className="flex">
                                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Votre paiement a été annulé. Vous pouvez sélectionner un autre pack si vous le souhaitez.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-8">
                            <h2 className="mb-4 text-xl font-medium text-sand-500">Choisissez un pack</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                {crownPacks.map((pack) => (
                                    <div
                                        key={pack.id}
                                        className={`flex cursor-pointer flex-col items-center rounded-lg p-4 transition-all ${selectedPack === pack.id
                                            ? "bg-blue-50 shadow-md ring-2 ring-blue-300"
                                            : "bg-neutral-50 shadow-sm hover:bg-blue-50/50"
                                            }`}
                                        onClick={() => setSelectedPack(pack.id)}
                                    >
                                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                                            <Crown className="h-7 w-7 text-blue-300" />
                                        </div>
                                        <div className="mb-3 text-center">
                                            <p className="text-lg font-bold text-sand-500">{pack.amount} Couronnes</p>
                                            {pack.bonus > 0 && <p className="text-xs text-green-500">+{pack.bonus} Couronnes bonus</p>}
                                            {pack.bonus > 0 && (
                                                <p className="text-sm font-medium text-blue-300">= {pack.amount + pack.bonus} au total</p>
                                            )}
                                        </div>
                                        <div
                                            className={`mt-auto flex w-full items-center justify-center rounded-full py-2 text-sm font-medium ${selectedPack === pack.id
                                                ? "bg-blue-300 text-white"
                                                : "border border-blue-300 bg-white text-blue-300"
                                                }`}
                                        >
                                            {pack.price.toFixed(2)}€
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="mb-4 text-xl font-medium text-sand-500">Méthode de paiement</h2>
                            <div className="rounded-lg border border-neutral-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="stripe-payment"
                                            name="payment-method"
                                            className="h-4 w-4 text-blue-300"
                                            defaultChecked
                                        />
                                        <label htmlFor="stripe-payment" className="ml-2 flex items-center text-sand-500">
                                            <CreditCard className="mr-2 h-5 w-5 text-blue-300" />
                                            Paiement sécurisé par Stripe Payment Links
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-neutral-400">Powered by</span>
                                        <span className="text-sm font-medium text-blue-300">Stripe</span>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-neutral-500">
                                    Cartes de crédit, débit.
                                </p>
                            </div>
                        </div>

                        {selectedPackDetails && (
                            <div className="mb-6 rounded-lg bg-neutral-50 p-4">
                                <h3 className="mb-3 font-medium text-sand-500">Récapitulatif de votre commande</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-600">{selectedPackDetails.amount} Couronnes</span>
                                        <span className="text-sand-500">{selectedPackDetails.price.toFixed(2)}€</span>
                                    </div>
                                    {selectedPackDetails.bonus > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-green-600">Bonus: +{selectedPackDetails.bonus} Couronnes</span>
                                            <span className="text-green-600">Gratuit</span>
                                        </div>
                                    )}
                                    <hr className="my-2" />
                                    <div className="flex justify-between font-medium">
                                        <span className="text-sand-500">
                                            Total: {selectedPackDetails.amount + selectedPackDetails.bonus} Couronnes
                                        </span>
                                        <span className="text-sand-500">{selectedPackDetails.price.toFixed(2)}€</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-4 rounded-lg bg-neutral-50 p-4">
                            <p className="text-xs text-neutral-600">
                                En achetant des Couronnes, vous acceptez nos{" "}
                                <Link href="/cgu" className="text-blue-300 hover:underline">
                                    conditions générales d'utilisation
                                </Link>
                                . Les Couronnes achetées ne sont pas remboursables. Vous serez redirigé vers Stripe pour finaliser votre
                                paiement de manière sécurisée.
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleBuyCrownPack}
                                disabled={!selectedPack}
                                className={`rounded-full px-6 py-3 text-center font-medium transition-colors ${selectedPack
                                    ? "bg-blue-300 text-white hover:bg-blue-400"
                                    : "cursor-not-allowed bg-neutral-200 text-neutral-400"
                                    }`}
                            >
                                {selectedPackDetails ? (
                                    <span className="flex items-center">
                                        Acheter maintenant - {selectedPackDetails.price.toFixed(2)}€
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </span>
                                ) : (
                                    "Sélectionnez un pack"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </BasePage>
    )
}
