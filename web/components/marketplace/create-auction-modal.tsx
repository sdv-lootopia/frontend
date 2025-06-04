"use client"

import type React from "react"

import { useState } from "react"
import { X, Crown, Calendar, ShoppingCart } from "lucide-react"
import { useInventory } from "@/contexts/inventory-context"

interface CreateAuctionModalProps {
    onClose: () => void
    onCreateAuction?: (auctionData: any) => void
}

export default function CreateAuctionModal({ onClose, onCreateAuction }: CreateAuctionModalProps) {
    const { availableForSale, markAsOnSale } = useInventory()
    const [selectedItem, setSelectedItem] = useState<string>("")
    const [startingPrice, setStartingPrice] = useState<number | string>(50)
    const [buyNowPrice, setBuyNowPrice] = useState<number | string>("")
    const [duration, setDuration] = useState<number>(24)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!selectedItem) {
            newErrors.selectedItem = "Veuillez sélectionner un artefact"
        }

        const startingPriceNum =
            typeof startingPrice === "string" ? (startingPrice === "" ? 0 : Number(startingPrice)) : startingPrice

        const buyNowPriceNum =
            typeof buyNowPrice === "string" ? (buyNowPrice === "" ? 0 : Number(buyNowPrice)) : buyNowPrice

        if (startingPriceNum < 1) {
            newErrors.startingPrice = "Le prix de départ doit être d'au moins 1 Couronne"
        }

        if (buyNowPriceNum > 0 && buyNowPriceNum <= startingPriceNum) {
            newErrors.buyNowPrice = "Le prix d'achat immédiat doit être supérieur au prix de départ"
        }

        if (duration < 1 || duration > 168) {
            newErrors.duration = "La durée doit être entre 1 et 168 heures"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        const selectedInventoryItem = availableForSale.find((item) => item.id === selectedItem)
        if (!selectedInventoryItem) return

        const endTime = new Date(Date.now() + duration * 60 * 60 * 1000)

        // Convertir les prix en nombres
        const startingPriceNum =
            typeof startingPrice === "string" ? (startingPrice === "" ? 0 : Number(startingPrice)) : startingPrice

        const buyNowPriceNum =
            typeof buyNowPrice === "string" ? (buyNowPrice === "" ? 0 : Number(buyNowPrice)) : buyNowPrice

        const auctionData = {
            artefact: selectedInventoryItem.artefact,
            startingPrice: startingPriceNum,
            buyNowPrice: buyNowPriceNum > 0 ? buyNowPriceNum : undefined,
            endTime,
        }

        // Marquer l'item comme en vente dans l'inventaire
        markAsOnSale(selectedItem, `auction_${Date.now()}`)

        // Créer l'enchère
        if (onCreateAuction) {
            onCreateAuction(auctionData)
        }

        onClose()
    }

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "commun":
                return "bg-gray-100 text-gray-500"
            case "rare":
                return "bg-blue-100 text-blue-500"
            case "épique":
                return "bg-blue-200 text-white"
            case "légendaire":
                return "bg-sand-100 text-sand-500"
            default:
                return "bg-gray-100 text-gray-500"
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b p-5">
                    <h2 className="text-2xl font-bold text-sand-500">Créer une enchère</h2>
                    <button onClick={onClose} className="rounded-full p-2 text-blue-100 hover:bg-gray-50 hover:text-sand-500">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-sand-500">Artefact à vendre</label>
                            {availableForSale.length > 0 ? (
                                <div className="relative">
                                    <div className="max-h-[210px] overflow-y-auto border border-[#E5E5E5] rounded-lg p-3 bg-[#FAFAFA] scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-blue-100 hover:scrollbar-thumb-blue-200">
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {availableForSale.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`cursor-pointer rounded-lg border-2 p-3 transition-colors bg-white ${selectedItem === item.id
                                                        ? "border-blue-200 bg-gray-50"
                                                        : "border-[#E5E5E5] hover:border-blue-100"
                                                        }`}
                                                    onClick={() => setSelectedItem(item.id)}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={item.artefact.image || "https://placehold.co/60x60/F8F1D7/423D28?text=Item"}
                                                            alt={item.artefact.name}
                                                            className="h-12 w-12 rounded object-cover"
                                                        />
                                                        <div className="flex-1">
                                                            <h3 className="font-medium text-sand-500">{item.artefact.name}</h3>
                                                            <div className="flex items-center space-x-2">
                                                                <span
                                                                    className={`rounded px-2 py-0.5 text-xs font-medium ${getRarityColor(item.artefact.rarity)}`}
                                                                >
                                                                    {item.artefact.rarity}
                                                                </span>
                                                                <span className="text-xs text-blue-100">Qté: {item.quantity}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-lg bg-gray-50 p-4 text-center">
                                    <p className="text-blue-100">Aucun artefact disponible pour la vente</p>
                                    <p className="text-sm text-sand-400">
                                        Tous vos artefacts sont déjà en vente ou votre inventaire est vide
                                    </p>
                                </div>
                            )}
                            {errors.selectedItem && <p className="mt-1 text-sm text-red-500">{errors.selectedItem}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-sand-500">Prix de départ</label>
                            <div className="flex items-center rounded-lg border bg-white px-3 py-2">
                                <Crown className="mr-2 h-4 w-4 text-blue-200" />
                                <input
                                    type="number"
                                    value={startingPrice}
                                    onChange={(e) => setStartingPrice(e.target.value === "" ? "" : Number(e.target.value))}
                                    min="1"
                                    className="flex-1 border-0 bg-transparent focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="Prix minimum"
                                />
                            </div>
                            {errors.startingPrice && <p className="mt-1 text-sm text-red-500">{errors.startingPrice}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-sand-500">Prix d'achat immédiat (optionnel)</label>
                            <div className="flex items-center rounded-lg border bg-white px-3 py-2">
                                <ShoppingCart className="mr-2 h-4 w-4 text-green-100" />
                                <input
                                    type="number"
                                    value={buyNowPrice}
                                    onChange={(e) => setBuyNowPrice(e.target.value === "" ? "" : Number(e.target.value))}
                                    min="0"
                                    className="flex-1 border-0 bg-transparent focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="Laisser vide pour désactiver"
                                />
                            </div>
                            {errors.buyNowPrice && <p className="mt-1 text-sm text-red-500">{errors.buyNowPrice}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-sand-500">Durée de l'enchère</label>
                            <div className="flex items-center rounded-lg border bg-white px-3 py-2">
                                <Calendar className="mr-2 h-4 w-4 text-blue-100" />
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(Number.parseInt(e.target.value))}
                                    className="flex-1 border-0 bg-transparent focus:ring-0"
                                >
                                    <option value={1}>1 heure</option>
                                    <option value={6}>6 heures</option>
                                    <option value={12}>12 heures</option>
                                    <option value={24}>24 heures</option>
                                    <option value={48}>2 jours</option>
                                    <option value={72}>3 jours</option>
                                    <option value={168}>7 jours</option>
                                </select>
                            </div>
                            {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sand-400 hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={availableForSale.length === 0}
                            className="rounded-lg bg-blue-200 px-4 py-2 text-white hover:bg-blue-300 disabled:bg-gray-200"
                        >
                            Créer l'enchère
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}