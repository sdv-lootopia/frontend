"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Sword, Shield, Gift, Star } from "lucide-react"

const chassesCompletees = [
    {
        id: 1,
        nom: "La Forêt Enchantée",
        rang: "or",
        date: "15/04/2025",
        objetsCollectes: [
            { id: 1, nom: "Épée magique", icone: "sword" },
            { id: 2, nom: "Potion de vie", icone: "potion" },
            { id: 3, nom: "Amulette de protection", icone: "amulet" },
        ],
        recompenses: [
            { id: 1, type: "badge", nom: "Explorateur Émérite" },
            { id: 2, type: "trophee", nom: "Trophée du Forestier" },
            { id: 3, type: "bonus", nom: "+10% d'XP pendant 24h" },
        ],
    },
    {
        id: 2,
        nom: "Les Mines de Diamant",
        rang: "argent",
        date: "10/04/2025",
        objetsCollectes: [
            { id: 1, nom: "Pioche en diamant", icone: "pickaxe" },
            { id: 2, nom: "Diamant brut", icone: "diamond" },
        ],
        recompenses: [
            { id: 1, type: "badge", nom: "Mineur Expérimenté" },
            { id: 2, type: "bonus", nom: "+5% de chance de butin rare" },
        ],
    },
    {
        id: 3,
        nom: "Le Donjon des Ombres",
        rang: "bronze",
        date: "05/04/2025",
        objetsCollectes: [
            { id: 1, nom: "Cape d'invisibilité", icone: "cape" },
            { id: 2, nom: "Dague empoisonnée", icone: "dagger" },
        ],
        recompenses: [{ id: 1, type: "trophee", nom: "Médaille du Courage" }],
    },
    {
        id: 4,
        nom: "Le Temple Perdu",
        rang: "or",
        date: "01/04/2025",
        objetsCollectes: [
            { id: 1, nom: "Idole ancienne", icone: "idol" },
            { id: 2, nom: "Parchemin mystique", icone: "scroll" },
            { id: 3, nom: "Sceptre de pouvoir", icone: "scepter" },
        ],
        recompenses: [
            { id: 1, type: "badge", nom: "Archéologue Légendaire" },
            { id: 2, type: "trophee", nom: "Relique du Temple" },
            { id: 3, type: "bonus", nom: "Accès à la zone VIP" },
        ],
    },
    {
        id: 5,
        nom: "L'Arène des Champions",
        rang: "argent",
        date: "25/03/2025",
        objetsCollectes: [
            { id: 1, nom: "Bouclier du champion", icone: "shield" },
            { id: 2, nom: "Casque de gladiateur", icone: "helmet" },
        ],
        recompenses: [
            { id: 1, type: "badge", nom: "Combattant Émérite" },
            { id: 2, type: "bonus", nom: "+15% de force pendant 48h" },
        ],
    },
]

export default function CompletedHunts() {
    const getRangIcon = (rang: string) => {
        switch (rang) {
            case "or":
                return (
                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                        <Trophy size={16} /> Or
                    </div>
                )
            case "argent":
                return (
                    <div className="flex items-center gap-1 text-gray-400 font-bold">
                        <Trophy size={16} /> Argent
                    </div>
                )
            case "bronze":
                return (
                    <div className="flex items-center gap-1 text-amber-700 font-bold">
                        <Trophy size={16} /> Bronze
                    </div>
                )
            default:
                return null
        }
    }

    const getObjetIcon = (icone: string) => {
        switch (icone) {
            case "sword":
                return <Sword size={16} className="text-blue-500" />
            case "potion":
                return <div className="text-red-500">🧪</div>
            case "amulet":
                return <div className="text-purple-500">🔮</div>
            case "pickaxe":
                return <div className="text-gray-600">⛏️</div>
            case "diamond":
                return <div className="text-blue-300">💎</div>
            case "cape":
                return <div className="text-gray-800">👘</div>
            case "dagger":
                return <div className="text-green-600">🗡️</div>
            case "idol":
                return <div className="text-yellow-600">🗿</div>
            case "scroll":
                return <div className="text-amber-800">📜</div>
            case "scepter":
                return <div className="text-purple-600">🪄</div>
            case "shield":
                return <Shield size={16} className="text-blue-600" />
            case "helmet":
                return <div className="text-gray-700">🪖</div>
            default:
                return <Star size={16} className="text-gray-500" />
        }
    }

    const getRecompenseIcon = (type: string) => {
        switch (type) {
            case "badge":
                return <div className="text-blue-500">🏅</div>
            case "trophee":
                return <Trophy size={16} className="text-yellow-500" />
            case "bonus":
                return <Gift size={16} className="text-green-500" />
            default:
                return <Star size={16} className="text-gray-500" />
        }
    }

    return (
        <>
            <h3 className="text-xl font-semibold flex items-center gap-2">
                <Trophy size={20} className="text-yellow-500" />
                Mes Chasses Complétées
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chassesCompletees.map((chasse) => (
                    <Card
                        key={chasse.id}
                        className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                    >
                        <CardHeader className="p-4 pb-2 bg-gradient-to-r from-gray-50 to-gray-100">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-bold">{chasse.nom}</CardTitle>
                                {getRangIcon(chasse.rang)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{chasse.date}</p>
                        </CardHeader>
                        <CardContent className="p-4 pt-3">
                            <div className="space-y-3">
                                <div>
                                    <h4 className="text-sm font-semibold mb-1 flex items-center gap-1">
                                        <Sword size={14} />
                                        Objets collectés
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {chasse.objetsCollectes.map((objet) => (
                                            <Badge key={objet.id} variant="outline" className="flex items-center gap-1 py-1">
                                                {getObjetIcon(objet.icone)}
                                                <span>{objet.nom}</span>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold mb-1 flex items-center gap-1">
                                        <Gift size={14} />
                                        Récompenses
                                    </h4>
                                    <div className="flex flex-col gap-1">
                                        {chasse.recompenses.map((recompense) => (
                                            <div key={recompense.id} className="flex items-center gap-1 text-sm">
                                                {getRecompenseIcon(recompense.type)}
                                                <span>{recompense.nom}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}
