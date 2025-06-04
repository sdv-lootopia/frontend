"use client"

import { ChevronRight, Coins, Crown, Clock } from "lucide-react"
import { Card } from "@/components/partner-register/card"

interface Props {
    showCrownPacks: boolean
    setShowCrownPacks: (val: boolean) => void
}
export default function InfoSection({ showCrownPacks, setShowCrownPacks }: Props) {
    return (
        <div className="rounded-xl bg-white p-6">
            <h2 className="mb-4 text-xl font-medium text-grey-400">Comment fonctionne la boutique ?</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <Card
                    icon={<Crown className="h-7 w-7 text-blue-300" />}
                    title="Achat avec des Couronnes"
                    description="Tous les achats se font avec des Couronnes, la monnaie virtuelle de Lootopia."
                />
                <Card
                    icon={<Clock className="h-7 w-7 text-blue-300" />}
                    title="Offres à durée limitée"
                    description="Certains articles sont disponibles pour une durée limitée de 7 jours."
                />
                <Card
                    icon={<Coins className="h-7 w-7 text-blue-300" />}
                    title="Pack de Couronnes"
                    description="Achetez des couronnes pour profiter d'une expérience immersive sur Lootopia."
                >
                    <button
                        onClick={() => setShowCrownPacks(!showCrownPacks)}
                        className="flex items-center rounded-full bg-blue-300 mt-2 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400"
                    >
                        {showCrownPacks ? "Masquer les packs" : "Voir les packs"}
                        <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${showCrownPacks ? "rotate-90" : ""}`} />
                    </button>
                </Card>
            </div>
        </div>
    )
}
