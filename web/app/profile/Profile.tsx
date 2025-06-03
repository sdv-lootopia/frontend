"use client"

import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Pencil,
    Trophy,
    Target,
    MapPin,
    Calendar,
    Star,
    Award,
    Compass,
    Package,
    TrendingUp,
    Clock,
    Medal,
} from "lucide-react"
import BasePage from "@/components/base-page"
import { useUser } from "@/lib/useUser"
import Link from "next/link"

export default function Profile() {
    const { user } = useUser()

    // Données d'exemple pour le profil
    const stats = {
        totalTrophies: 290,
        completedHunts: 25,
        rank: "Chasseur Expert",
        level: 12,
        experience: 2450,
        nextLevelExp: 3000,
        achievements: [
            { name: "Premier Trésor", icon: "🏆", date: "15 Jan 2025" },
            { name: "Explorateur", icon: "🗺️", date: "22 Jan 2025" },
            { name: "Collectionneur", icon: "💎", date: "05 Fév 2025" },
            { name: "Maître Chasseur", icon: "👑", date: "18 Fév 2025" },
        ],
        recentHunts: [
            {
                name: "Trésor du Vieux Port",
                location: "Marseille",
                date: "2025-03-01",
                trophies: 15,
                difficulty: "Difficile",
            },
            { name: "Mystère de la Cathédrale", location: "Paris", date: "2025-02-28", trophies: 12, difficulty: "Moyen" },
            { name: "Secrets du Château", location: "Loire", date: "2025-02-25", trophies: 18, difficulty: "Difficile" },
        ],
        inventory: [
            { name: "Boussole Antique", rarity: "Légendaire", quantity: 1 },
            { name: "Carte au Trésor", rarity: "Rare", quantity: 3 },
            { name: "Clé Mystérieuse", rarity: "Épique", quantity: 2 },
            { name: "Pièce d'Or", rarity: "Commun", quantity: 47 },
        ],
    }

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "Légendaire":
                return "bg-sand-100 text-sand-600"
            case "Épique":
                return "bg-blue-200 text-blue-600"
            case "Rare":
                return "bg-green-200 text-green-600"
            default:
                return "bg-gray-200 text-gray-600"
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Difficile":
                return "bg-blue-400 text-white"
            case "Moyen":
                return "bg-sand-300 text-sand-50"
            default:
                return "bg-green-300 text-green-50"
        }
    }

    return (
        <BasePage>
            {user && (
                <div className="min-h-screen">
                    {/* Header avec image de couverture */}
                    <div className="relative">
                        <div className="h-48 md:h-64 overflow-hidden bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">
                            <Image
                                src="/map.png"
                                alt="Carte de couverture"
                                width={1200}
                                height={300}
                                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent" />
                        </div>

                        {/* Profil utilisateur */}
                        <div className="relative px-6 pb-6">
                            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 md:-mt-20">
                                <div className="relative">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white bg-white shadow-xl">
                                        {user?.profilePicture && user?.profilePicture !== "" ? (
                                            <Image
                                                src={user.profilePicture || "/placeholder.svg"}
                                                alt={`Photo de profil de ${user.nickname}`}
                                                width={160}
                                                height={160}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                                                {user.nickname?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-sand-200 to-sand-300 text-sand-600 border-sand-400">
                                        Niveau {stats.level}
                                    </Badge>
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <h1 className="text-3xl md:text-4xl font-bold text-gray-600">{user.nickname}</h1>
                                            <Link href="/settings">
                                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                        <p className="text-gray-500 text-lg mt-2">{user.biography || "Chasseur de trésors passionné"}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-400 mt-3">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>France</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>Membre depuis Juin 2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="text-lg px-4 py-2 bg-gradient-to-r from-green-300 to-green-400 text-green-50 border-green-500"
                                    >
                                        {stats.rank}
                                    </Badge>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-gray-600">{stats.totalTrophies} trophées</p>
                                        <p className="text-gray-400">{stats.completedHunts} chasses complétées</p>
                                    </div>
                                </div>
                            </div>

                            {/* Barre d'expérience */}
                            <div className="mt-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-500">Expérience</span>
                                    <span className="text-sm text-gray-400">
                                        {stats.experience} / {stats.nextLevelExp} XP
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-green-300 to-green-400 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(stats.experience / stats.nextLevelExp) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="px-6 py-8">
                        <Tabs defaultValue="tableau-chasse" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-white border border-gray-200">
                                <TabsTrigger
                                    value="tableau-chasse"
                                    className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                                >
                                    <Trophy className="w-4 h-4" />
                                    <span className="hidden sm:inline">Tableau de Chasse</span>
                                    <span className="sm:hidden">Chasses</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="inventaire"
                                    className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                                >
                                    <Package className="w-4 h-4" />
                                    Inventaire
                                </TabsTrigger>
                                <TabsTrigger
                                    value="statistiques"
                                    className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Statistiques
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="tableau-chasse" className="space-y-6">
                                {/* Achievements récents */}
                                <Card className="border-gray-200 bg-white">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-gray-600">
                                            <Award className="w-5 h-5 text-sand-300" />
                                            Succès Récents
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {stats.achievements.map((achievement, index) => (
                                                <div
                                                    key={index}
                                                    className="text-center p-3 bg-gradient-to-br from-sand-50 to-gray-50 rounded-lg border border-gray-100"
                                                >
                                                    <div className="text-2xl mb-2">{achievement.icon}</div>
                                                    <p className="font-medium text-sm text-gray-600">{achievement.name}</p>
                                                    <p className="text-xs text-gray-400">{achievement.date}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Chasses récentes */}
                                <Card className="border-gray-200 bg-white">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-gray-600">
                                            <Compass className="w-5 h-5 text-blue-400" />
                                            Chasses Récentes
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {stats.recentHunts.map((hunt, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-100"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-blue-400 rounded-lg flex items-center justify-center text-white">
                                                        <Target className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-600">{hunt.name}</h3>
                                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                                            <MapPin className="w-3 h-3" />
                                                            <span>{hunt.location}</span>
                                                            <span>•</span>
                                                            <Clock className="w-3 h-3" />
                                                            <span>{new Date(hunt.date).toLocaleDateString("fr-FR")}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Badge className={`${getDifficultyColor(hunt.difficulty)}`}>{hunt.difficulty}</Badge>
                                                    <div className="text-right">
                                                        <p className="font-bold text-sand-400">+{hunt.trophies}</p>
                                                        <p className="text-xs text-gray-400">trophées</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="inventaire" className="space-y-6">
                                <Card className="border-gray-200 bg-white">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-gray-600">
                                            <Package className="w-5 h-5 text-green-400" />
                                            Objets Collectés
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">
                                            Vos trésors et objets découverts lors de vos aventures
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {stats.inventory.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-100"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-3 h-3 rounded-full ${getRarityColor(item.rarity).split(" ")[0]}`} />
                                                        <div>
                                                            <h3 className="font-medium text-gray-600">{item.name}</h3>
                                                            <Badge
                                                                variant="outline"
                                                                className={`text-xs ${getRarityColor(item.rarity)} border-current`}
                                                            >
                                                                {item.rarity}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-lg text-gray-600">×{item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="statistiques" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <Card className="border-gray-200 bg-white">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-sand-200 to-sand-300 rounded-lg flex items-center justify-center">
                                                    <Trophy className="w-6 h-6 text-sand-600" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-600">{stats.totalTrophies}</p>
                                                    <p className="text-sm text-gray-400">Trophées Total</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-gray-200 bg-white">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex items-center justify-center">
                                                    <Target className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-600">{stats.completedHunts}</p>
                                                    <p className="text-sm text-gray-400">Chasses Complétées</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-gray-200 bg-white">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex items-center justify-center">
                                                    <Star className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-600">{stats.level}</p>
                                                    <p className="text-sm text-gray-400">Niveau Actuel</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-gray-200 bg-white">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                                                    <Medal className="w-6 h-6 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-600">#{Math.floor(Math.random() * 100) + 1}</p>
                                                    <p className="text-sm text-gray-400">Classement</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card className="border-gray-200 bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-gray-600">Progression Mensuelle</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-2 text-gray-500">
                                                    <span>Trophées ce mois</span>
                                                    <span>45 / 60</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-sand-200 to-sand-300 h-2 rounded-full"
                                                        style={{ width: "75%" }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-2 text-gray-500">
                                                    <span>Chasses complétées</span>
                                                    <span>8 / 10</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-green-200 to-green-300 h-2 rounded-full"
                                                        style={{ width: "80%" }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-2 text-gray-500">
                                                    <span>Objectif niveau suivant</span>
                                                    <span>{Math.round((stats.experience / stats.nextLevelExp) * 100)}%</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-200 to-blue-300 h-2 rounded-full"
                                                        style={{ width: `${(stats.experience / stats.nextLevelExp) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            )}
        </BasePage>
    )
}
