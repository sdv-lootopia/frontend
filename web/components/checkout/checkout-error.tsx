import Link from "next/link"
import { AlertCircle } from "lucide-react"

interface Props {
    errorMessage: string
    onRetry: () => void
}

export default function CheckoutError({ errorMessage, onRetry }: Props) {
    return (
        <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
                <AlertCircle className="mb-4 h-16 w-16 text-red-500" />
                <h2 className="mb-2 text-2xl font-bold text-sand-500">Erreur de paiement</h2>
                <p className="mb-6 text-red-500">{errorMessage}</p>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/buy-crowns"
                        className="rounded-full bg-blue-300 px-6 py-3 text-white hover:bg-blue-400"
                    >
                        Acheter des Couronnes
                    </Link>
                    <button
                        onClick={onRetry}
                        className="rounded-full border border-blue-300 px-6 py-3 text-blue-300 hover:bg-blue-50"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        </div>
    )
}