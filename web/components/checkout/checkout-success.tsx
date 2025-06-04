import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccess() {
    return (
        <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                <h2 className="mb-2 text-2xl font-bold text-sand-500">Paiement réussi !</h2>
                <p className="mb-6 text-blue-200">
                    Votre commande a été traitée avec succès. Merci pour votre achat !
                </p>
                <Link
                    href="/shop"
                    className="rounded-full bg-blue-300 px-6 py-3 font-medium text-white hover:bg-blue-400"
                >
                    Continuer mes achats
                </Link>
            </div>
        </div>
    )
}