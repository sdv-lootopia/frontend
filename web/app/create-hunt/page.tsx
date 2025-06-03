"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Crown, Plus, Trash2, Gift } from "lucide-react"
import { HuntStorage, type HuntStep, type HuntMap, type Cache } from "@/lib/hunt-storage"
import { toast } from "sonner"
import { CacheManagement } from "@/components/cache-management"
import { useUser } from "@/lib/useUser"

export default function CreateHuntPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")
  const isEditing = !!editId

  const [huntData, setHuntData] = useState({
    title: "",
    description: "",
    world: "" as "real" | "cartographic" | "",
    duration: "unlimited",
    mode: "public",
    maxParticipants: "",
    chatEnabled: false,
    participationFee: "",
    digDelay: 1,
    digCost: 0,
    difficulty: "" as "Facile" | "Intermédiaire" | "Difficile" | "",
    tags: [] as string[],
  })

  const [steps, setSteps] = useState<HuntStep[]>([])
  const [maps, setMaps] = useState<HuntMap[]>([])
  const [rewards, setRewards] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [caches, setCaches] = useState<Cache[]>([])
  const {user} = useUser()

  useEffect(() => {
    if (isEditing && editId) {
      const existingHunt = HuntStorage.getHuntById(editId)
      if (existingHunt) {
        setHuntData({
          title: existingHunt.title,
          description: existingHunt.description,
          world: existingHunt.world,
          duration: existingHunt.duration,
          mode: "public", // Valeur par défaut
          maxParticipants: existingHunt.maxParticipants.toString(),
          chatEnabled: existingHunt.chatEnabled,
          participationFee: existingHunt.fee.toString(),
          digDelay: existingHunt.digDelay,
          digCost: existingHunt.digCost,
          difficulty: existingHunt.difficulty,
          tags: existingHunt.tags,
        })
        setSteps(existingHunt.steps)
        setMaps(existingHunt.maps)
        setRewards(existingHunt.rewards)

        const huntCaches = HuntStorage.getCachesByHuntId(editId)
        setCaches(huntCaches)
      } else {
        toast.error("Chasse introuvable")
        router.push("/my-hunts")
      }
    }
  }, [isEditing, editId, router])

  const addStep = () => {
    const newStep: HuntStep = {
      id: Date.now().toString(),
      title: "",
      description: "",
      validationType: "cache",
    }
    setSteps([...steps, newStep])
  }

  const updateStep = (id: string, field: keyof HuntStep, value: string) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, [field]: value } : step)))
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const addMap = () => {
    const newMap: HuntMap = {
      id: Date.now().toString(),
      name: "",
      style: "",
      zone: "",
      scale: "",
    }
    setMaps([...maps, newMap])
  }

  const updateMap = (id: string, field: keyof HuntMap, value: string) => {
    setMaps(maps.map((map) => (map.id === id ? { ...map, [field]: value } : map)))
  }

  const removeMap = (id: string) => {
    setMaps(maps.filter((map) => map.id !== id))
  }

  const addReward = () => {
    setRewards([...rewards, ""])
  }

  const updateReward = (index: number, value: string) => {
    const newRewards = [...rewards]
    newRewards[index] = value
    setRewards(newRewards)
  }

  const removeReward = (index: number) => {
    setRewards(rewards.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !huntData.tags.includes(newTag.trim())) {
      setHuntData({
        ...huntData,
        tags: [...huntData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setHuntData({
      ...huntData,
      tags: huntData.tags.filter((t) => t !== tag),
    })
  }

  const handleSaveDraft = () => {
    if (!huntData.title.trim()) {
      toast.error("Le titre est obligatoire")
      return
    }

    try {
      if (isEditing && editId) {
        const success = HuntStorage.updateHunt(editId, {
          title: huntData.title,
          description: huntData.description,
          world: huntData.world || "real",
          duration: huntData.duration,
          maxParticipants: Number.parseInt(huntData.maxParticipants) || 100,
          fee: Number.parseInt(huntData.participationFee) || 0,
          rewards: rewards.filter((r) => r.trim()),
          difficulty: huntData.difficulty || "Facile",
          tags: huntData.tags,
          chatEnabled: huntData.chatEnabled,
          status: "draft",
          steps,
          maps,
          digDelay: huntData.digDelay,
          digCost: huntData.digCost,
        })

        if (success) {
          toast.success("Chasse modifiée et sauvegardée")
          router.push("/my-hunts")
        } else {
          toast.error("Erreur lors de la modification")
        }
      } else {
        HuntStorage.createHunt({
          title: huntData.title,
          description: huntData.description,
          organizer: user?.nickname || "Utilisateur Actuel",
          world: huntData.world || "real",
          duration: huntData.duration,
          maxParticipants: Number.parseInt(huntData.maxParticipants) || 100,
          fee: Number.parseInt(huntData.participationFee) || 0,
          rewards: rewards.filter((r) => r.trim()),
          difficulty: huntData.difficulty || "Facile",
          tags: huntData.tags,
          chatEnabled: huntData.chatEnabled,
          status: "draft",
          steps,
          maps,
          digDelay: huntData.digDelay,
          digCost: huntData.digCost,
        })

        toast.success("Chasse sauvegardée en brouillon")
        router.push("/my-hunts")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde")
    }
  }

  const handlePublish = () => {
    if (!huntData.title.trim() || !huntData.description.trim() || !huntData.world) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    try {
      if (isEditing && editId) {
        const success = HuntStorage.updateHunt(editId, {
          title: huntData.title,
          description: huntData.description,
          world: huntData.world,
          duration: huntData.duration,
          maxParticipants: Number.parseInt(huntData.maxParticipants) || 100,
          fee: Number.parseInt(huntData.participationFee) || 0,
          rewards: rewards.filter((r) => r.trim()),
          difficulty: huntData.difficulty || "Facile",
          tags: huntData.tags,
          chatEnabled: huntData.chatEnabled,
          status: "active",
          steps,
          maps,
          digDelay: huntData.digDelay,
          digCost: huntData.digCost,
        })

        if (success) {
          toast.success("Chasse modifiée et publiée !")
          router.push("/hunts")
        } else {
          toast.error("Erreur lors de la publication")
        }
      } else {
        HuntStorage.createHunt({
          title: huntData.title,
          description: huntData.description,
          organizer: user?.nickname || "Utilisateur Actuel",
          world: huntData.world,
          duration: huntData.duration,
          maxParticipants: Number.parseInt(huntData.maxParticipants) || 100,
          fee: Number.parseInt(huntData.participationFee) || 0,
          rewards: rewards.filter((r) => r.trim()),
          difficulty: huntData.difficulty || "Facile",
          tags: huntData.tags,
          chatEnabled: huntData.chatEnabled,
          status: "active",
          steps,
          maps,
          digDelay: huntData.digDelay,
          digCost: huntData.digCost,
        })

        toast.success("Chasse publiée avec succès !")
        router.push("/hunts")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erreur lors de la publication")
    }
  }

  const handleCachesUpdate = () => {
    if (editId) {
      const huntCaches = HuntStorage.getCachesByHuntId(editId)
      setCaches(huntCaches)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-blue-500">
          {isEditing ? "Modifier la Chasse au Trésor" : "Créer une Chasse au Trésor"}
        </h1>
        <p className="text-gray-400">
          {isEditing
            ? "Modifiez votre chasse au trésor"
            : "Configurez votre chasse au trésor avec tous les paramètres nécessaires"}
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-sand-50">
          <TabsTrigger value="basic" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">
            Configuration de base
          </TabsTrigger>
          <TabsTrigger value="steps" className="data-[state=active]:bg-green-200 data-[state=active]:text-green-600">
            Étapes & Repères
          </TabsTrigger>
          <TabsTrigger value="caches" className="data-[state=active]:bg-sand-200 data-[state=active]:text-sand-600">
            Caches
          </TabsTrigger>
          <TabsTrigger value="maps" className="data-[state=active]:bg-blue-200 data-[state=active]:text-blue-600">
            Cartes
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-blue-300 data-[state=active]:text-white">
            Récompenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Définissez les paramètres principaux de votre chasse</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de la chasse *</Label>
                  <Input
                    id="title"
                    placeholder="Entrez le titre de votre chasse"
                    value={huntData.title}
                    onChange={(e) => setHuntData({ ...huntData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="world">Monde *</Label>
                  <Select
                    value={huntData.world}
                    onValueChange={(value: "real" | "cartographic") => setHuntData({ ...huntData, world: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un monde" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real">Monde Réel</SelectItem>
                      <SelectItem value="cartographic">Monde Cartographique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre chasse au trésor..."
                  className="min-h-[100px]"
                  value={huntData.description}
                  onChange={(e) => setHuntData({ ...huntData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée</Label>
                  <Select
                    value={huntData.duration}
                    onValueChange={(value) => setHuntData({ ...huntData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unlimited">Illimitée</SelectItem>
                      <SelectItem value="1day">1 jour</SelectItem>
                      <SelectItem value="1week">1 semaine</SelectItem>
                      <SelectItem value="1month">1 mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulté</Label>
                  <Select
                    value={huntData.difficulty}
                    onValueChange={(value: "Facile" | "Intermédiaire" | "Difficile") =>
                      setHuntData({ ...huntData, difficulty: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir la difficulté" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facile">Facile</SelectItem>
                      <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                      <SelectItem value="Difficile">Difficile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Participants max</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="100"
                    value={huntData.maxParticipants}
                    onChange={(e) => setHuntData({ ...huntData, maxParticipants: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Ajouter un tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {huntData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Options avancées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chat intégré</Label>
                  <p className="text-sm text-gray-400">Permettre aux joueurs de discuter pendant la chasse</p>
                </div>
                <Switch
                  checked={huntData.chatEnabled}
                  onCheckedChange={(checked) => setHuntData({ ...huntData, chatEnabled: checked })}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="participationFee">Frais de participation</Label>
                  <div className="relative">
                    <Crown className="absolute left-3 top-3 h-4 w-4 text-sand-300" />
                    <Input
                      id="participationFee"
                      type="number"
                      placeholder="0"
                      className="pl-10"
                      value={huntData.participationFee}
                      onChange={(e) => setHuntData({ ...huntData, participationFee: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="digDelay">Délai entre fouilles (min)</Label>
                  <Input
                    id="digDelay"
                    type="number"
                    min="1"
                    max="1440"
                    value={huntData.digDelay}
                    onChange={(e) => setHuntData({ ...huntData, digDelay: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="digCost">Coût fouille supplémentaire</Label>
                  <div className="relative">
                    <Crown className="absolute left-3 top-3 h-4 w-4 text-sand-300" />
                    <Input
                      id="digCost"
                      type="number"
                      placeholder="0"
                      className="pl-10"
                      value={huntData.digCost}
                      onChange={(e) => setHuntData({ ...huntData, digCost: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Étapes et Repères
              </CardTitle>
              <CardDescription>Créez des points de passage obligatoires pour votre chasse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <Card key={step.id} className="border-dashed">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">Étape {index + 1}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{"Titre de l'étape"}</Label>
                          <Input
                            placeholder="Nom de l'étape"
                            value={step.title}
                            onChange={(e) => updateStep(step.id, "title", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Type de validation</Label>
                          <Select
                            value={step.validationType}
                            onValueChange={(value: "cache" | "passphrase" | "landmark") =>
                              updateStep(step.id, "validationType", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir le type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cache">Découverte de cache</SelectItem>
                              <SelectItem value="passphrase">Saisie de phrase secrète</SelectItem>
                              <SelectItem value="landmark">Passage par un repère</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label>Description/Énigme</Label>
                        <Textarea
                          placeholder="Décrivez l'énigme ou l'indication pour cette étape..."
                          value={step.description}
                          onChange={(e) => updateStep(step.id, "description", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button onClick={addStep} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une étape
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="caches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Gestion des Caches
              </CardTitle>
              <CardDescription>Créez des trésors cachés que les joueurs pourront découvrir</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing && editId ? (
                <CacheManagement huntId={editId} caches={caches} onCachesUpdate={handleCachesUpdate} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">{"Sauvegardez d'abord votre chasse pour pouvoir ajouter des caches."}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cartes interactives</CardTitle>
              <CardDescription>Configurez les cartes que les joueurs pourront utiliser</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maps.map((map, index) => (
                  <Card key={map.id} className="border-dashed">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">Carte {index + 1}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeMap(map.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom de la carte</Label>
                          <Input
                            placeholder="ex: La grande carte"
                            value={map.name}
                            onChange={(e) => updateMap(map.id, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Style</Label>
                          <Select value={map.style} onValueChange={(value) => updateMap(map.id, "style", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir un style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="retro">Rétro</SelectItem>
                              <SelectItem value="satellite">Satellite</SelectItem>
                              <SelectItem value="terrain">Terrain</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Zone géographique</Label>
                          <Input
                            placeholder="ex: Haute-Loire"
                            value={map.zone}
                            onChange={(e) => updateMap(map.id, "zone", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Échelle</Label>
                          <Input
                            placeholder="ex: 1:25000 - 1:50000"
                            value={map.scale}
                            onChange={(e) => updateMap(map.id, "scale", e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button onClick={addMap} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une carte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Récompenses
              </CardTitle>
              <CardDescription>Définissez les gains que les joueurs pourront obtenir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rewards.map((reward, index) => (
                  <Card key={index} className="border-dashed">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">Récompense {index + 1}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeReward(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Description de la récompense</Label>
                        <Input
                          placeholder="ex: 50 Couronnes, Badge Explorateur, etc."
                          value={reward}
                          onChange={(e) => updateReward(index, e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button onClick={addReward} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une récompense
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 pt-6">
        <Button
          variant="outline"
          className="flex-1 border-sand-200 text-sand-500 hover:bg-sand-50"
          onClick={handleSaveDraft}
        >
          {isEditing ? "Sauvegarder les modifications" : "Sauvegarder le brouillon"}
        </Button>
        <Button className="flex-1 bg-green-200 hover:bg-green-300 text-green-600" onClick={handlePublish}>
          {isEditing ? "Mettre à jour et publier" : "Publier la chasse"}
        </Button>
      </div>
    </div>
  )
}
