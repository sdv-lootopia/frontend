import Link from "next/link"
import { Crown } from "lucide-react"

interface Props {
    totalItems: number
    totalPrice: number
    userBalance: number
    onPay: () => void
    isProcessing: boolean
    cartEmpty: boolean
}

export default function CartSummary({
    totalItems,
    totalPrice,
    userBalance,
    onPay,
    isProcessing,
    cartEmpty
}: Props) {
    const insufficient = totalPrice > userBalance

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-sand-500">Résumé</h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-blue-200">
                    <span>Nombre d'articles</span>
                    <span>{totalItems}</span>
                </div>
                <div className="flex justify-between font-medium text-sand-500">
                    <span>Total</span>
                    <div className="flex items-center">
                        <Crown className="mr-1 h-5 w-5 text-blue-300" />
                        <span>{totalPrice}</span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="text-blue-200">Votre solde</span>
                    <div className="flex items-center text-blue-300">
                        <Crown className="mr-1 h-4 w-4" />
                        <span>{userBalance}</span>
                    </div>
                </div>
                <div className="pt-4">
                    <button
                        onClick={onPay}
                        disabled={isProcessing || cartEmpty}
                        className={`w-full rounded-full py-3 font-medium text-white transition-colors ${isProcessing || cartEmpty
                                ? "bg-neutral-300 cursor-not-allowed"
                                : "bg-blue-300 hover:bg-blue-400"
                            }`}
                    >
                        {isProcessing ? "Traitement en cours..." : "Payer maintenant"}
                    </button>
                </div>
                {insufficient && (
                    <div className="mt-2 rounded-md bg-red-50 p-3 text-sm text-red-500">
                        <p>Solde insuffisant. Il vous manque {totalPrice - userBalance} Couronnes.</p>
                        <Link href="/buy-crowns" className="mt-1 block font-medium text-blue-300 hover:underline">
                            Acheter des Couronnes →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}