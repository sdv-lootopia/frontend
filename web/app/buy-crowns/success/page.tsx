"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import BasePage from "@/components/base-page"
import Link from "next/link"
import { CheckCircle, Crown, Gift, ArrowLeft } from "lucide-react"
import { useCrownBalance } from "@/contexts/crown-balance-context"

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams()
    const [packAmount, setPackAmount] = useState(0)
    const [baseAmount, setBaseAmount] = useState(0)
    const [bonusAmount, setBonusAmount] = useState(0)
    const [isProcessed, setIsProcessed] = useState(false)
    const { addCrowns, balance, isInitialized } = useCrownBalance()
    const [debugInfo, setDebugInfo] = useState<string | null>(null)
    const [transactionId, setTransactionId] = useState<string | null>(null)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        document.title = "Confirmation d'achat - Lootopia"
    }, [])

    useEffect(() => {
        setHasMounted(true)
    }, [])

    useEffect(() => {
        const newTransactionId = "tx_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9)

        const pack = searchParams.get("pack")
        const amount = searchParams.get("amount")
        const base = searchParams.get("base")
        const bonus = searchParams.get("bonus")

        if (!amount || !base) {
            console.log("❌ Paramètres manquants")
            setDebugInfo("Paramètres manquants")
            return
        }

        const existingTransactions = JSON.parse(localStorage.getItem("lootopia-recent-payments") || "[]")
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
        const recentTransactions = existingTransactions.filter((tx: any) => tx.timestamp > fiveMinutesAgo)

        const alreadyProcessed = recentTransactions.some(
            (tx: any) => tx.pack === pack && tx.amount === amount && tx.base === base && tx.bonus === bonus,
        )

        const totalCrowns = Number.parseInt(amount)
        const baseCrowns = Number.parseInt(base)
        const bonusCrowns = bonus ? Number.parseInt(bonus) : 0

        if (alreadyProcessed) {
            setPackAmount(totalCrowns)
            setBaseAmount(baseCrowns)
            setBonusAmount(bonusCrowns)
            setIsProcessed(true)
            setDebugInfo("Transaction déjà traitée (mémoire vérifiée)")

            return
        }

        try {
            if (!isInitialized) {
                console.log("🕓 Attente de l'init du contexte...")
                return
            }
            addCrowns(baseCrowns + bonusCrowns, `Achat de ${baseCrowns} Couronnes${bonusCrowns > 0 ? ` + ${bonusCrowns} bonus` : ""}`, {
                packId: pack,
                packSize: totalCrowns,
                baseAmount: baseCrowns,
                bonusAmount: bonusCrowns,
                transactionId: newTransactionId,
            })

            setPackAmount(totalCrowns)
            setBaseAmount(baseCrowns)
            setBonusAmount(bonusCrowns)
            setTransactionId(newTransactionId)
            setDebugInfo(`Transaction ${newTransactionId} traitée`)
            setIsProcessed(true)
        } catch (error) {
            setDebugInfo(`Erreur: ${error}`)
        }

    }, [searchParams, isInitialized])

    if (!hasMounted) {
        return null
    }

    return (
        <BasePage>
            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-2 text">
                        <Link href="/shop" className="inline-flex items-center text-blue-300 hover:underline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour à la boutique
                        </Link>
                    </div>
                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                        <div className="p-8">
                            <div className="flex flex-col items-center justify-center text-center">
                                <CheckCircle className="mb-6 h-20 w-20 text-green-100 stroke-current fill-none" />
                                <h1 className="mb-8 text-3xl font-bold text-sand-500">Paiement réussi !</h1>

                                <div className="mb-8 w-full rounded-lg bg-blue-50 p-6">
                                    <h2 className="mb-4 text-xl font-medium text-sand-500">Détails de votre achat</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Crown className="mr-2 h-5 w-5 text-blue-300" />
                                                <span className="text-sand-500">Pack {baseAmount} Couronnes</span>
                                            </div>
                                            <span className="font-medium text-blue-300">✓</span>
                                        </div>

                                        {bonusAmount > 0 && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Gift className="mr-2 h-5 w-5 text-green-500" />
                                                    <span className="text-green-600">{bonusAmount} Couronnes bonus</span>
                                                </div>
                                                <span className="font-medium text-green-500">✓</span>
                                            </div>
                                        )}

                                        <hr className="my-3" />

                                        <div className="flex items-center justify-between font-medium">
                                            <div className="flex items-center">
                                                <span className="text-lg text-sand-500">Total ajouté à votre compte</span>
                                            </div>
                                            <span className="text-xl text-blue-300">{packAmount} Couronnes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasePage >
    )
}