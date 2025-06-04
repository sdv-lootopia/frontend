"use client"

import { Crown, Gavel, ShoppingCart, X, AlertTriangle } from 'lucide-react'

interface ConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    type: "bid" | "buyNow"
    artefactName: string
    amount: number
    currentBalance: number
    isLoading?: boolean
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    type,
    artefactName,
    amount,
    currentBalance,
    isLoading = false,
}: ConfirmationModalProps) {
    if (!isOpen) return null

    const remainingBalance = currentBalance - amount
    const isInsufficientFunds = remainingBalance < 0

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b p-6">
                    <h2 className="text-xl font-bold text-sand-500">
                        {type === "bid" ? "Confirmer l'enchère" : "Confirmer l'achat"}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="rounded-full p-2 text-blue-100 hover:bg-grey-50 hover:text-sand-500 disabled:opacity-50"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-grey-50">
                            {type === "bid" ? (
                                <Gavel className="h-8 w-8 text-blue-200" />
                            ) : (
                                <ShoppingCart className="h-8 w-8 text-green-100" />
                            )}
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-sand-500">
                            {type === "bid" ? "Placer une enchère" : "Acheter immédiatement"}
                        </h3>
                        <p className="text-blue-100">
                            {type === "bid"
                                ? "Vous êtes sur le point de placer une enchère sur :"
                                : "Vous êtes sur le point d'acheter :"}
                        </p>
                    </div>

                    <div className="mb-6 rounded-lg bg-sand-50 p-4">
                        <h4 className="mb-2 font-medium text-sand-500">{artefactName}</h4>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-sand-400">
                                {type === "bid" ? "Montant de l'enchère :" : "Prix d'achat :"}
                            </span>
                            <div className="flex items-center text-blue-200">
                                <Crown className="mr-1 h-4 w-4" />
                                <span className="font-bold">{amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 space-y-2 rounded-lg bg-grey-50 p-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-sand-400">Solde actuel :</span>
                            <div className="flex items-center text-blue-200">
                                <Crown className="mr-1 h-3 w-3" />
                                <span>{currentBalance.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-sand-400">
                                {type === "bid" ? "Montant de l'enchère :" : "Coût :"}
                            </span>
                            <div className="flex items-center text-red-500">
                                <Crown className="mr-1 h-3 w-3" />
                                <span>-{amount.toLocaleString()}</span>
                            </div>
                        </div>
                        <hr className="border-sand-100" />
                        <div className="flex items-center justify-between font-medium">
                            <span className="text-sand-500">Solde restant :</span>
                            <div className={`flex items-center ${isInsufficientFunds ? "text-red-500" : "text-blue-200"}`}>
                                <Crown className="mr-1 h-4 w-4" />
                                <span>{remainingBalance.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {isInsufficientFunds && (
                        <div className="mb-6 flex items-center rounded-lg bg-red-50 p-3 text-red-600">
                            <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">
                                Solde insuffisant. Il vous manque {Math.abs(remainingBalance).toLocaleString()} Couronnes.
                            </span>
                        </div>
                    )}

                    {type === "bid" && !isInsufficientFunds && (
                        <div className="mb-6 rounded-lg bg-blue-50 p-3">
                            <p className="text-sm text-blue-300">
                                <strong>Note :</strong> Si vous êtes surenchéri, vos Couronnes vous seront automatiquement restituées.
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 rounded-lg border border-[#E5E5E5] py-3 text-sand-400 transition-colors hover:bg-grey-50 disabled:opacity-50"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isInsufficientFunds || isLoading}
                            className={`flex-1 rounded-lg py-3 font-medium text-white transition-colors ${isInsufficientFunds || isLoading
                                ? "bg-gray-200 cursor-not-allowed"
                                : type === "bid"
                                    ? "bg-blue-200 hover:bg-blue-300"
                                    : "bg-green-100 hover:bg-green-200"
                                }`}
                        >
                            {isLoading
                                ? "Traitement..."
                                : type === "bid"
                                    ? "Confirmer l'enchère"
                                    : "Confirmer l'achat"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
