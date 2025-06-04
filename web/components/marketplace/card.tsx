"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Crown, Clock, Gavel, User, TrendingUp, ShoppingCart } from "lucide-react"
import type { MarketplaceItem } from "@/types/marketplace"
import ConfirmationModal from "./confirmation-modal"

interface AuctionCardProps {
    auction: MarketplaceItem
    onBid?: (auctionId: string, bidAmount: number) => void
    onBuyNow?: (auctionId: string) => void
    userBalance?: number
}

export default function AuctionCard({ auction, onBid, onBuyNow, userBalance = 0 }: AuctionCardProps) {
    const [timeLeft, setTimeLeft] = useState("")
    const [isExpired, setIsExpired] = useState(false)
    const [bidAmount, setBidAmount] = useState<number | string>(0)
    const [showBidInput, setShowBidInput] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState<{
        type: "bid" | "buyNow"
        amount: number
    } | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        const updateTimeLeft = () => {
            const now = new Date().getTime()
            const endTime = auction.endTime.getTime()
            const difference = endTime - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                if (days > 0) {
                    setTimeLeft(`${days}j ${hours}h`)
                } else if (hours > 0) {
                    setTimeLeft(`${hours}h ${minutes}m`)
                } else if (minutes > 0) {
                    setTimeLeft(`${minutes}m ${seconds}s`)
                } else {
                    setTimeLeft(`${seconds}s`)
                }
                setIsExpired(false)
            } else {
                setTimeLeft("Terminée")
                setIsExpired(true)
            }
        }

        updateTimeLeft()
        const interval = setInterval(updateTimeLeft, 1000)

        return () => clearInterval(interval)
    }, [auction.endTime])

    const getRarityColor = () => {
        switch (auction.artefact.rarity) {
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

    const currentPrice = auction.currentPrice || auction.startingPrice
    const hasNoBids = auction.bidCount === 0
    const minBidAmount = currentPrice + 10

    useEffect(() => {
        setBidAmount(minBidAmount)
    }, [minBidAmount])

    const handleBid = () => {
        const numericBidAmount = typeof bidAmount === "string" ? Number.parseInt(bidAmount) || 0 : bidAmount
        if (numericBidAmount >= minBidAmount) {
            setShowConfirmation({ type: "bid", amount: numericBidAmount })
        }
    }

    const handleBuyNowClick = () => {
        if (auction.buyNowPrice) {
            setShowConfirmation({ type: "buyNow", amount: auction.buyNowPrice })
        }
    }

    const handleConfirmAction = () => {
        if (!showConfirmation) return

        setIsProcessing(true)

        if (showConfirmation.type === "bid" && onBid) {
            onBid(auction.id, showConfirmation.amount)
            setShowBidInput(false)
            setBidAmount(minBidAmount + 10)
        } else if (showConfirmation.type === "buyNow" && onBuyNow) {
            onBuyNow(auction.id)
        }

        setTimeout(() => {
            setIsProcessing(false)
            setShowConfirmation(null)
        }, 300)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleBid()
        }
    }

    const numericBidAmount = typeof bidAmount === "string" ? Number.parseInt(bidAmount) || 0 : bidAmount
    const canAffordBid = numericBidAmount <= userBalance
    const canAffordBuyNow = auction.buyNowPrice ? auction.buyNowPrice <= userBalance : false

    return (
        <>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
                <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                    <img
                        src={auction.artefact.image || "https://placehold.co/400x400/F8F1D7/423D28?text=Artefact"}
                        alt={auction.artefact.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/400x400/F8F1D7/423D28?text=Artefact"
                        }}
                    />

                    <span className={`absolute left-2 top-2 rounded-full px-2 py-1 text-xs font-medium ${getRarityColor()}`}>
                        {auction.artefact.rarity}
                    </span>

                    <div
                        className={`absolute right-2 top-2 rounded-full px-2 py-1 text-xs font-medium ${isExpired
                            ? "bg-gray-200 text-white"
                            : timeLeft.includes("m") || timeLeft.includes("s")
                                ? "bg-red-500 text-white"
                                : "bg-green-100 text-white"
                            }`}
                    >
                        <Clock className="mr-1 inline-block h-3 w-3" />
                        {timeLeft}
                    </div>

                    {auction.buyNowPrice && (
                        <span className="absolute bottom-2 right-2 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-[#445223]">
                            <ShoppingCart className="mr-1 inline-block h-3 w-3" />
                            Achat immédiat
                        </span>
                    )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                    <div className="mb-3">
                        <h3 className="mb-1 text-lg font-medium text-sand-500 line-clamp-1">{auction.artefact.name}</h3>
                        <p className="mb-2 text-sm text-grey-200 line-clamp-2">{auction.artefact.description}</p>

                        <div className="flex items-center text-xs text-sand-400">
                            <User className="mr-1 h-3 w-3" />
                            <span>Vendu par {auction.seller.nickname}</span>
                        </div>
                    </div>

                    <div className="mt-auto space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-100">{hasNoBids ? "Prix de départ" : "Enchère actuelle"}</span>
                            <div className="flex items-center text-blue-200">
                                <Crown className="mr-1 h-4 w-4" />
                                <span className="font-bold">{currentPrice}</span>
                            </div>
                        </div>

                        {auction.buyNowPrice && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-100">Achat immédiat</span>
                                <div className="flex items-center text-green-100">
                                    <Crown className="mr-1 h-4 w-4" />
                                    <span className="font-bold">{auction.buyNowPrice}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-100">Enchères</span>
                            <div className="flex items-center text-sand-400">
                                <Gavel className="mr-1 h-3 w-3" />
                                <span className="text-sm font-medium">{auction.bidCount}</span>
                            </div>
                        </div>

                        {auction.highestBidder && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-100">En tête</span>
                                <div className="flex items-center text-green-200">
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                    <span className="text-sm font-medium">{auction.highestBidder.nickname}</span>
                                </div>
                            </div>
                        )}

                        {showBidInput && !isExpired && (
                            <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-sand-400">Votre enchère</span>
                                    <span className="text-xs text-blue-100">Min: {minBidAmount}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex flex-1 items-center rounded border bg-white px-2 py-1">
                                        <Crown className="mr-1 h-3 w-3 text-blue-200" />
                                        <input
                                            type="number"
                                            value={bidAmount}
                                            onChange={(e) => {
                                                const inputValue = e.target.value
                                                if (inputValue === "") {
                                                    setBidAmount("")
                                                } else {
                                                    const value = Number.parseInt(inputValue)
                                                    setBidAmount(isNaN(value) ? minBidAmount : Math.max(value, 0))
                                                }
                                            }}
                                            onKeyDown={handleKeyDown}
                                            min={minBidAmount}
                                            max={userBalance}
                                            className="flex-1 border-0 bg-transparent text-sm focus:ring-0"
                                            placeholder={`Min: ${minBidAmount}`}
                                        />
                                    </div>
                                    <button
                                        onClick={handleBid}
                                        disabled={!canAffordBid || numericBidAmount < minBidAmount}
                                        className="rounded bg-blue-200 px-3 py-1 text-xs text-white hover:bg-blue-300 disabled:bg-gray-200"
                                    >
                                        Valider
                                    </button>
                                </div>
                                {!canAffordBid && <p className="text-xs text-red-500">Solde insuffisant</p>}
                                {numericBidAmount < minBidAmount && numericBidAmount > 0 && (
                                    <p className="text-xs text-red-500">Montant trop faible (min: {minBidAmount})</p>
                                )}
                            </div>
                        )}

                        <div className="mt-3 grid grid-cols-1 gap-2">
                            {auction.buyNowPrice && (
                                <button
                                    onClick={handleBuyNowClick}
                                    disabled={isExpired || !canAffordBuyNow}
                                    className={`rounded-full py-2 text-sm font-medium transition-colors ${isExpired || !canAffordBuyNow
                                        ? "bg-x text-white cursor-not-allowed"
                                        : "bg-green-100 text-white hover:bg-green-200"
                                        }`}
                                >
                                    <ShoppingCart className="mr-1 inline-block h-4 w-4" />
                                    Acheter maintenant
                                </button>
                            )}
                            <button
                                onClick={() => setShowBidInput(!showBidInput)}
                                disabled={isExpired}
                                className={`rounded-full py-2 text-sm font-medium transition-colors ${isExpired
                                    ? "bg-gray-200 text-white cursor-not-allowed"
                                    : "bg-blue-200 text-white hover:bg-blue-300"
                                    }`}
                            >
                                <Gavel className="mr-1 inline-block h-4 w-4" />
                                {hasNoBids ? "Première enchère" : "Enchérir"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <ConfirmationModal
                    isOpen={true}
                    onClose={() => setShowConfirmation(null)}
                    onConfirm={handleConfirmAction}
                    type={showConfirmation.type}
                    artefactName={auction.artefact.name}
                    amount={showConfirmation.amount}
                    currentBalance={userBalance}
                    isLoading={isProcessing}
                />
            )}
        </>
    )
}
