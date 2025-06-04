"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Pause, Users, Crown, Plus, Clock, CheckCircle, Globe, Map, Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { HuntStorage, type Hunt, type UserParticipation } from "@/lib/hunt-storage"
import { toast } from "sonner"

export default function MyHuntsPage() {
    const [activeTab, setActiveTab] = useState("player")
    const [participatingHunts, setParticipatingHunts] = useState<(Hunt & { participation: UserParticipation })[]>([])
    const [organizedHunts, setOrganizedHunts] = useState<Hunt[]>([])

    useEffect(() => {
        // Charger les participations
        const participations = HuntStorage.getUserParticipations()
        const huntsWithParticipation = participations
            .map((participation) => {
                const hunt = HuntStorage.getHuntById(participation.huntId)
                return hunt ? { ...hunt, participation } : null
            })
            .filter(Boolean) as (Hunt & { participation: UserParticipation })[]

        setParticipatingHunts(huntsWithParticipation)

        // Charger les chasses organisées (simulation)
        const myHunts = HuntStorage.getAllHunts().filter((hunt) => hunt.organizer === "Utilisateur Actuel")
        setOrganizedHunts(myHunts)
    }, [])

    const handleLeaveHunt = (huntId: string) => {
        const success = HuntStorage.leaveHunt(huntId)
        if (success) {
            toast.success("Vous avez quitté la chasse")
            setParticipatingHunts((prev) => prev.filter((hunt) => hunt.id !== huntId))
        } else {
            toast.error("Erreur lors de la sortie de la chasse")
        }
    }

    const handleDeleteHunt = (huntId: string) => {
        const success = HuntStorage.deleteHunt(huntId)
        if (success) {
            toast.success("Chasse supprimée")
            setOrganizedHunts((prev) => prev.filter((hunt) => hunt.id !== huntId))
        } else {
            toast.error("Erreur lors de la suppression")
        }
    }

    const handlePublishHunt = (huntId: string) => {
        const success = HuntStorage.updateHunt(huntId, { status: "active" })
        if (success) {
            toast.success("Chasse publiée !")
            setOrganizedHunts((prev) =>
                prev.map((hunt) => (hunt.id === huntId ? { ...hunt, status: "active" as const } : hunt)),
            )
        } else {
            toast.error("Erreur lors de la publication")
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-blue-500">Mes Chasses</h1>
                <p className="text-gray-400">Gérez vos participations et vos créations</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-sand-50">
                    <TabsTrigger value="player" className="data-[state=active]:bg-green-200 data-[state=active]:text-green-600">
                        Mode Joueur
                    </TabsTrigger>
                    <TabsTrigger value="organizer" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">
                        Mode Organisateur
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="player" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Mes Participations</h2>
                        <Link href="/hunts">
                            <Button className="bg-green-200 hover:bg-green-300 text-green-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Rejoindre une chasse
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {participatingHunts.map((hunt) => (
                            <Card key={hunt.id} className="overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg mb-1">{hunt.title}</CardTitle>
                                            <CardDescription className="flex items-center gap-2">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarFallback>{hunt.organizer[0]}</AvatarFallback>
                                                </Avatar>
                                                {hunt.organizer}
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-2">
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
                                                        Réel
                                                    </>
                                                ) : (
                                                    <>
                                                        <Map className="h-3 w-3 mr-1" />
                                                        Carte
                                                    </>
                                                )}
                                            </Badge>
                                            <Badge variant={hunt.participation.status === "completed" ? "outline" : "default"}>
                                                {hunt.participation.status === "completed" ? "Terminée" : "En cours"}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Progression</span>
                                            <span>{hunt.participation.progress}%</span>
                                        </div>
                                        <Progress value={hunt.participation.progress} className="h-2 [&>div]:bg-green-200" />
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <span>Rejoint le {new Date(hunt.participation.joinedAt).toLocaleDateString()}</span>
                                        </div>
                                        {hunt.participation.status === "completed" && (
                                            <div className="flex items-center gap-1 text-green-400">
                                                <CheckCircle className="h-4 w-4" />
                                                <span>Complétée</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-sm font-medium">Récompenses:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {hunt.rewards.map((reward, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {reward}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link href={`/hunts/${hunt.id}`} className="flex-1">
                                            <Button
                                                className="w-full"
                                                variant={hunt.participation.status === "completed" ? "outline" : "default"}
                                            >
                                                {hunt.participation.status === "completed" ? "Voir les résultats" : "Continuer"}
                                            </Button>
                                        </Link>
                                        {hunt.participation.status === "active" && (
                                            <Button variant="outline" size="icon" onClick={() => handleLeaveHunt(hunt.id)}>
                                                <Pause className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {participatingHunts.length === 0 && (
                        <Card>
                            <CardContent className="text-center py-12">
                                <p className="text-gray-400 mb-4">Vous ne participez à aucune chasse pour le moment.</p>
                                <Link href="/hunts">
                                    <Button>Découvrir les chasses disponibles</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="organizer" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Mes Chasses Organisées</h2>
                        <Link href="/create-hunt">
                            <Button className="bg-blue-400 hover:bg-blue-500 text-white">
                                <Plus className="h-4 w-4 mr-2" />
                                Créer une chasse
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {organizedHunts.map((hunt) => (
                            <Card key={hunt.id} className="overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg mb-1">{hunt.title}</CardTitle>
                                            <CardDescription>Créée le {new Date(hunt.createdAt).toLocaleDateString()}</CardDescription>
                                        </div>
                                        <div className="flex gap-2">
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
                                                        Réel
                                                    </>
                                                ) : (
                                                    <>
                                                        <Map className="h-3 w-3 mr-1" />
                                                        Carte
                                                    </>
                                                )}
                                            </Badge>
                                            <Badge variant={hunt.status === "active" ? "default" : "secondary"}>
                                                {hunt.status === "active" ? "Active" : "Brouillon"}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm">Participants</span>
                                            </div>
                                            <p className="font-medium">
                                                {hunt.participants}/{hunt.maxParticipants}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Crown className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm">Revenus</span>
                                            </div>
                                            <p className="font-medium">{hunt.participants * hunt.fee} Couronnes</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-sm">Taux de participation</span>
                                        <Progress
                                            value={(hunt.participants / hunt.maxParticipants) * 100}
                                            className="h-2 [&>div]:bg-blue-400"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        {hunt.status === "draft" ? (
                                            <>
                                                <Link href={`/create-hunt?edit=${hunt.id}`} className="flex-1">
                                                    <Button variant="outline" className="w-full">
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Modifier
                                                    </Button>
                                                </Link>
                                                <Button onClick={() => handlePublishHunt(hunt.id)}>Publier</Button>
                                            </>
                                        ) : (
                                            <Link href={`/hunts/${hunt.id}`} className="flex-1">
                                                <Button variant="outline" className="w-full">
                                                    Gérer
                                                </Button>
                                            </Link>
                                        )}
                                        <Button variant="outline" size="icon" onClick={() => handleDeleteHunt(hunt.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {organizedHunts.length === 0 && (
                        <Card>
                            <CardContent className="text-center py-12">
                                <p className="text-gray-400 mb-4">{"Vous n'avez pas encore créé de chasse au trésor."}</p>
                                <Link href="/create-hunt">
                                    <Button>Créer votre première chasse</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
