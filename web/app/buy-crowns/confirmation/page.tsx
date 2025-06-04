"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import BaseLayout from "@/components/base-page"
import Link from "next/link"
import { CheckCircle, AlertCircle, Crown, ArrowRight } from "lucide-react"
import { useCrownBalance } from "@/contexts/crown-balance-context"

export default function PaymentConfirmationPage() {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("")
    const [packAmount, setPackAmount] = useState(0)
    const { addCrowns } = useCrownBalance()

    useEffect(() => {
        const paymentIntentId = searchParams.get("payment_intent")
        const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret")
        const redirectStatus = searchParams.get("redirect_status")

        if (!paymentIntentId || !paymentIntentClientSecret) {
            setStatus("error")
            setMessage("Informations de paiement manquantes.")
            return
        }

        if (redirectStatus === "succeeded") {
            const confirmPayment = async () => {
                try {
                    const response = await fetch("/api/confirm-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ paymentIntentId }),
                    })

                    const data = await response.json()

                    if (data.success) {
                        setStatus("success")
                        setMessage("Votre paiement a été confirmé avec succès !")
                        setPackAmount(data.packAmount)

                        if (data.packAmount) {
                            addCrowns(data.packAmount, `Achat de ${data.packAmount} Couronnes`, { packSize: data.packAmount })
                        }
                    } else {
                        setStatus("error")
                        setMessage(data.message || "Une erreur est survenue lors de la confirmation du paiement.")
                    }
                } catch (err) {
                    console.error("Erreur lors de la confirmation du paiement:", err)
                    setStatus("error")
                    setMessage("Une erreur est survenue lors de la confirmation du paiement.")
                }
            }

            confirmPayment()
        } else {
            setStatus("error")
            setMessage("Le paiement n'a pas été complété avec succès.")
        }
    }, [searchParams, addCrowns])

    return (
        <BaseLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-lg">
                    <div className="rounded-xl bg-white p-8 shadow-sm">
                        {status === "loading" && (
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-300 border-t-transparent"></div>
                                <h2 className="mb-2 text-2xl font-bold text-sand-500">Vérification du paiement...</h2>
                                <p className="text-blue-200">Veuillez patienter pendant que nous confirmons votre paiement.</p>
                            </div>
                        )}

                        {status === "success" && (
                            <div className="flex flex-col items-center justify-center text-center">
                                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                                <h2 className="mb-10 text-2xl font-bold text-sand-500">Paiement réussi !</h2>
                                <p className="mb-6 text-blue-200">{message}</p>

                                <div className="mb-6 flex items-center justify-center rounded-full bg-blue-50 px-6 py-3">
                                    <Crown className="mr-2 h-6 w-6 text-blue-300" />
                                    <span className="text-xl font-medium text-blue-300">
                                        {packAmount} Couronnes ajoutées à votre compte
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/boutique"
                                        className="rounded-full bg-blue-300 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-400"
                                    >
                                        Visiter la boutique
                                    </Link>
                                    <Link
                                        href="/acheter-couronnes"
                                        className="rounded-full border border-blue-300 px-6 py-3 text-center font-medium text-blue-300 transition-colors hover:bg-blue-50"
                                    >
                                        Acheter plus de Couronnes
                                    </Link>
                                </div>
                            </div>
                        )}

                        {status === "error" && (
                            <div className="flex flex-col items-center justify-center text-center">
                                <AlertCircle className="mb-4 h-16 w-16 text-red-500" />
                                <h2 className="mb-2 text-2xl font-bold text-sand-500">Erreur de paiement</h2>
                                <p className="mb-6 text-red-500">{message}</p>
                                <Link
                                    href="/acheter-couronnes"
                                    className="rounded-full bg-blue-300 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-400"
                                >
                                    Réessayer
                                </Link>
                            </div>
                        )}
                    </div>

                    {status !== "loading" && (
                        <div className="mt-6 text-center">
                            <Link href="/" className="inline-flex items-center text-blue-300 hover:underline">
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Retour à l'accueil
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </BaseLayout>
    )
}
