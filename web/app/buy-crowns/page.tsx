"use client"

import { useEffect, useState } from "react"
import { Crown, CreditCard, ArrowLeft } from "lucide-react"
import Link from "next/link"
import BasePage from "@/components/base-page"
import PageHeader from "@/components/shop/page-header"

export default function BuyCrowns() {
    useEffect(() => {
        document.title = "Achat de Couronnes - Lootopia"
    }, [])

    const [selectedPack, setSelectedPack] = useState<string | null>(null)

    const crownPacks = [
        { id: "crown-10", amount: 10, price: 0.99, bonus: 0 },
        { id: "crown-25", amount: 25, price: 1.99, bonus: 2 },
        { id: "crown-50", amount: 50, price: 3.99, bonus: 5 },
        { id: "crown-100", amount: 100, price: 7.99, bonus: 15 },
        { id: "crown-1000", amount: 1000, price: 69.99, bonus: 200 },
    ]

    const handleBuyCrownPack = () => {
        if (!selectedPack) return

        const pack = crownPacks.find((p) => p.id === selectedPack)
        if (!pack) return

        alert(`Achat de ${pack.amount} Couronnes (+ ${pack.bonus} bonus) pour ${pack.price.toFixed(2)}€`)
        // TO DO: Logique d'achat
    }

    return (
        <BasePage>
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                    <PageHeader
                        title="Acheter des Couronnes"
                        description="Achetez des packs de Couronnes pour faire vos achats sur Lootopia">
                        <Link href="/shop" className="mb-4 flex items-center text-blue-300 hover:text-blue-400">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Retour à la boutique
                        </Link>
                    </PageHeader>

                    <div className="p-6">
                        {/* Sélection des packs */}
                        <div className="mb-8">
                            <h2 className="mb-4 text-xl font-medium text-sand-500">Choisissez un pack</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                {crownPacks.map((pack) => (
                                    <div
                                        key={pack.id}
                                        className={`flex cursor-pointer flex-col items-center rounded-lg p-4 transition-all ${selectedPack === pack.id ? "bg-blue-50 shadow-md" : "bg-neutral-50 shadow-sm hover:bg-blue-50/50"
                                            }`}
                                        onClick={() => setSelectedPack(pack.id)}
                                    >
                                        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                            <Crown className="h-8 w-8 text-blue-300" />
                                        </div>
                                        <div className="mb-3 text-center">
                                            <p className="text-lg font-bold text-sand-500">{pack.amount} Couronnes</p>
                                            {pack.bonus > 0 && <p className="text-xs text-green-500">+{pack.bonus} Couronnes bonus</p>}
                                        </div>
                                        <div
                                            className={`mt-auto flex w-full items-center justify-center rounded-full py-2 text-sm font-medium ${selectedPack === pack.id
                                                ? "bg-blue-300 text-white"
                                                : "bg-white text-blue-300 border border-blue-300"
                                                }`}
                                        >
                                            {pack.price.toFixed(2)}€
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Méthode de paiement */}
                        <div className="mb-8">
                            <h2 className="mb-4 text-xl font-medium text-sand-500">Méthode de paiement</h2>
                            <div className="rounded-lg border border-neutral-200 p-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="card-payment"
                                        name="payment-method"
                                        className="h-4 w-4 text-blue-300"
                                        defaultChecked
                                    />
                                    <label htmlFor="card-payment" className="ml-2 flex items-center text-sand-500">
                                        <CreditCard className="mr-2 h-5 w-5 text-blue-300" />
                                        Carte bancaire
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-neutral-50 p-4 mb-4">
                            <p className="text-xs text-grey-200">
                                En achetant des Couronnes, vous acceptez nos{" "}
                                <Link href="/cgu" className="text-blue-300 hover:underline">
                                    conditions générales d'utilisation
                                </Link>
                                . Les Couronnes achetées ne sont pas remboursables.
                            </p>
                        </div>

                        {/* Bouton d'achat */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleBuyCrownPack}
                                disabled={!selectedPack}
                                className={`rounded-full px-6 py-3 text-center font-medium ${selectedPack
                                    ? "bg-blue-300 text-white hover:bg-blue-400"
                                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                    }`}
                            >
                                Acheter maintenant
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </BasePage>
    )
}
