"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Clock,
    Users,
    Crown,
    Star,
    Globe,
    Map,
    MessageCircle,
    CheckCircle,
    Circle,
    Shovel,
    Navigation,
} from "lucide-react"
import { HuntStorage, type Hunt, type UserParticipation } from "@/lib/hunt-storage"
import { MapModal } from "@/components/map-modal"
import { toast } from "sonner"

export default function HuntDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [hunt, setHunt] = useState<Hunt | null>(null)
    const [participation, setParticipation] = useState<UserParticipation | null>(null)
    const [activeTab, setActiveTab] = useState("overview")
    const [digCooldown, setDigCooldown] = useState(0)
    const [isMapOpen, setIsMapOpen] = useState(false)

    useEffect(() => {
        const huntData = HuntStorage.getHuntById(params.id)
        if (!huntData) {
            router.push("/hunts")
            return
        }

        setHunt(huntData)

        const userParticipation = HuntStorage.getUserParticipation(params.id)
        setParticipation(userParticipation)
    }, [params.id, router])

    useEffect(() => {
        if (digCooldown > 0) {
            const timer = setTimeout(() => setDigCooldown(digCooldown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [digCooldown])

    const handleJoinHunt = () => {
        if (!hunt) return

        const success = HuntStorage.joinHunt(hunt.id)
        if (success) {
            toast.success("Vous avez rejoint la chasse !")
            const newParticipation = HuntStorage.getUserParticipation(hunt.id)
            setParticipation(newParticipation)
            // Mettre à jour les données de la chasse
            const updatedHunt = HuntStorage.getHuntById(hunt.id)
            setHunt(updatedHunt)
        } else {
            toast.error("Impossible de rejoindre cette chasse")
        }
    }

    const handleDig = () => {
        if (!hunt) return

        setDigCooldown(hunt.digDelay * 60) // Convertir en secondes

        // Simulation de la découverte (20% de chance)
        const found = Math.random() < 0.2

        if (found) {
            toast.success("🎉 Vous avez trouvé quelque chose !")
            // Ici on pourrait ajouter la logique de récompense
        } else {
            toast.info("Rien trouvé ici... Continuez à chercher !")
        }
    }

    if (!hunt) {
        return <div>Chargement...</div>
    }

    const isParticipating = !!participation
    const completedSteps = hunt.steps.filter((step) => participation?.completedSteps.includes(step.id)).length
    const progressPercentage = hunt.steps.length > 0 ? (completedSteps / hunt.steps.length) * 100 : 0

    if (!isParticipating) {
        // Vue aperçu pour les non-participants
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{hunt.title}</h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={hunt.organizerAvatar || "/placeholder.svg"} />
                                                <AvatarFallback>{hunt.organizer[0]}</AvatarFallback>
                                            </Avatar>
                                            <span>{hunt.organizer}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-sand-200 text-sand-200" />
                                            <span>{hunt.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge
                                    variant={hunt.world === "real" ? "default" : "secondary"}
                                    className={
                                        hunt.world === "real"
                                            ? "bg-green-100 text-green-400 border-green-200"
                                            : "bg-blue-100 text-blue-400 border-blue-200"
                                    }
                                >
                                    {hunt.world === "real" ? (
                                        <>
                                            <Globe className="h-3 w-3 mr-1" />
                                            Monde Réel
                                        </>
                                    ) : (
                                        <>
                                            <Map className="h-3 w-3 mr-1" />
                                            Cartographique
                                        </>
                                    )}
                                </Badge>
                            </div>

                            <p className="text-gray-400 mb-4">{hunt.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {hunt.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm">Durée</span>
                                    </div>
                                    <span className="text-sm font-medium">{hunt.duration}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm">Participants</span>
                                    </div>
                                    <span className="text-sm font-medium">
                                        {hunt.participants}/{hunt.maxParticipants}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Crown className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm">Frais</span>
                                    </div>
                                    <span className="text-sm font-medium">{hunt.fee} Couronnes</span>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Récompenses</h4>
                                    <div className="space-y-1">
                                        {hunt.rewards.map((reward, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                                                {reward}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            className="w-full bg-green-200 hover:bg-green-300 text-green-600"
                            size="lg"
                            onClick={handleJoinHunt}
                            disabled={hunt.participants >= hunt.maxParticipants}
                        >
                            {hunt.participants >= hunt.maxParticipants ? "Chasse complète" : "Participer à la chasse"}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    // Vue participation pour les participants
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">{hunt.title}</h1>
                        <Badge variant={hunt.world === "real" ? "default" : "secondary"}>
                            {hunt.world === "real" ? (
                                <>
                                    <Globe className="h-3 w-3 mr-1" />
                                    Monde Réel
                                </>
                            ) : (
                                <>
                                    <Map className="h-3 w-3 mr-1" />
                                    Cartographique
                                </>
                            )}
                        </Badge>
                    </div>

                    {hunt.steps.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Progression</span>
                                <span>
                                    {completedSteps}/{hunt.steps.length} étapes
                                </span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                        </div>
                    )}
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 bg-sand-50">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">
                            {"Vue d'ensemble"}
                        </TabsTrigger>
                        <TabsTrigger value="steps" className="data-[state=active]:bg-green-200 data-[state=active]:text-green-600">
                            Étapes
                        </TabsTrigger>
                        <TabsTrigger value="map" className="data-[state=active]:bg-sand-200 data-[state=active]:text-sand-600">
                            Carte
                        </TabsTrigger>
                        <TabsTrigger value="chat" className="data-[state=active]:bg-blue-300 data-[state=active]:text-white">
                            Chat
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Description de la chasse</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400">{hunt.description}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Actions rapides</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Button
                                            className="w-full bg-sand-200 hover:bg-sand-300 text-sand-600"
                                            onClick={handleDig}
                                            disabled={digCooldown > 0}
                                        >
                                            <Shovel className="h-4 w-4 mr-2" />
                                            {digCooldown > 0
                                                ? `Creuser (${Math.floor(digCooldown / 60)}:${(digCooldown % 60).toString().padStart(2, "0")})`
                                                : "Creuser ici"}
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="w-full border-blue-200 text-blue-400 hover:bg-blue-50"
                                            onClick={() => setIsMapOpen(true)}
                                        >
                                            <Navigation className="h-4 w-4 mr-2" />
                                            Ma position
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Mes récompenses</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Couronnes gagnées</span>
                                                <div className="flex items-center gap-1">
                                                    <Crown className="h-4 w-4 text-sand-300" />
                                                    <span className="font-medium">25</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Artefacts trouvés</span>
                                                <span className="font-medium">1</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="steps" className="space-y-4">
                        {hunt.steps.map((step, index) => {
                            const isCompleted = participation?.completedSteps.includes(step.id) || false
                            return (
                                <Card key={step.id} className={isCompleted ? "border-green-200 bg-green-50/50" : ""}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 mt-1">
                                                {isCompleted ? (
                                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                                ) : (
                                                    <Circle className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-medium">{step.title}</h3>
                                                    <Badge variant="outline" className="text-xs">
                                                        Étape {index + 1}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-400 mb-3">{step.description}</p>
                                                {!isCompleted && (
                                                    <Button size="sm" variant="outline">
                                                        Voir les indices
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}

                        {hunt.steps.length === 0 && (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <p className="text-gray-400">{"Cette chasse n'a pas d'étapes définies."}</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="map" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Carte interactive</CardTitle>
                                <CardDescription>Utilisez la carte pour naviguer et placer vos repères</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                                    <iframe
                                        src="https://www.openstreetmap.org/export/embed.html?bbox=2.2945%2C48.8566%2C2.3708%2C48.8848&layer=mapnik&marker=48.8707%2C2.3326"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        title="Carte de la chasse"
                                        className="rounded-lg"
                                    />

                                    {/* Indicateur de position */}
                                    <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Navigation className="h-4 w-4 text-blue-500" />
                                            <span>Votre position</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="chat" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5" />
                                    Chat de la chasse
                                </CardTitle>
                                <CardDescription>{"Discutez avec les autres participants et l'organisateur"}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {hunt.chatEnabled ? (
                                    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                                            <p className="text-gray-400">Interface de chat</p>
                                            <p className="text-sm text-gray-400">Fonctionnalité à implémenter avec WebSocket</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                                        <p className="text-gray-400">{"Le chat n'est pas activé pour cette chasse"}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
        </>
    )
}
