"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Crown, Star, Search, Globe, Map } from "lucide-react"
import Link from "next/link"
import { HuntStorage, type Hunt } from "@/lib/hunt-storage"

export default function HuntsPage() {
  const [hunts, setHunts] = useState<Hunt[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [worldFilter, setWorldFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  useEffect(() => {
    const allHunts = HuntStorage.getAllHunts().filter((hunt) => hunt.status === "active")
    setHunts(allHunts)
  }, [])

  const filteredHunts = hunts.filter((hunt) => {
    const matchesSearch =
      hunt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hunt.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesWorld = worldFilter === "all" || hunt.world === worldFilter
    const matchesDifficulty = difficultyFilter === "all" || hunt.difficulty === difficultyFilter

    return matchesSearch && matchesWorld && matchesDifficulty
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-blue-500">Chasses au Trésor Disponibles</h1>
        <p className="text-gray-400">Découvrez et participez aux chasses au trésor créées par notre communauté</p>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une chasse..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={worldFilter} onValueChange={setWorldFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Monde" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les mondes</SelectItem>
                  <SelectItem value="real">Monde Réel</SelectItem>
                  <SelectItem value="cartographic">Cartographique</SelectItem>
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Difficulté" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="Facile">Facile</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Difficile">Difficile</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des chasses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHunts.map((hunt) => (
          <Card key={hunt.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
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
                        Monde Réel
                      </>
                    ) : (
                      <>
                        <Map className="h-3 w-3 mr-1" />
                        Cartographique
                      </>
                    )}
                  </Badge>
                  <Badge variant="outline" className="bg-background/80 border-sand-200 text-sand-400">
                    {hunt.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-sand-200 text-sand-200" />
                  <span className="text-sm font-medium">{hunt.rating}</span>
                </div>
              </div>

              <div className="flex-1">
                <CardTitle className="text-lg mb-1">{hunt.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={hunt.organizerAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{hunt.organizer[0]}</AvatarFallback>
                  </Avatar>
                  <span>{hunt.organizer}</span>
                </div>
              </div>
              <CardDescription className="line-clamp-2">{hunt.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {hunt.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{hunt.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>
                    {hunt.participants}/{hunt.maxParticipants}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Récompenses:</span>
                  {hunt.fee > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                      <Crown className="h-4 w-4 text-sand-300" />
                      <span>{hunt.fee}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {hunt.rewards.map((reward, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {reward}
                    </Badge>
                  ))}
                </div>
              </div>

              <Link href={`/hunts/${hunt.id}`}>
                <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white">Voir les détails</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHunts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Aucune chasse ne correspond à vos critères de recherche.</p>
        </div>
      )}
    </div>
  )
}
