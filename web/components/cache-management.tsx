"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Plus, Trash2, Eye, Gift, Map } from "lucide-react"
import { HuntStorage, type Cache } from "@/lib/hunt-storage"
import { toast } from "sonner"

interface CacheManagementProps {
    huntId: string
    caches: Cache[]
    onCachesUpdate: () => void
}

export function CacheManagement({ huntId, caches, onCachesUpdate }: CacheManagementProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedCache, setSelectedCache] = useState<Cache | null>(null)
    const [newCache, setNewCache] = useState({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        reward: "",
        difficulty: "" as "Facile" | "Intermédiaire" | "Difficile" | "",
        hints: [""],
    })

    const handleCreateCache = () => {
        if (!newCache.name.trim() || !newCache.latitude || !newCache.longitude) {
            toast.error("Veuillez remplir tous les champs obligatoires")
            return
        }

        try {
            HuntStorage.createCache({
                huntId,
                name: newCache.name,
                description: newCache.description,
                latitude: Number.parseFloat(newCache.latitude),
                longitude: Number.parseFloat(newCache.longitude),
                reward: newCache.reward,
                difficulty: newCache.difficulty || "Facile",
                hints: newCache.hints.filter((hint) => hint.trim()),
            })

            toast.success("Cache créé avec succès !")
            setIsCreateModalOpen(false)
            setNewCache({
                name: "",
                description: "",
                latitude: "",
                longitude: "",
                reward: "",
                difficulty: "",
                hints: [""],
            })
            onCachesUpdate()
        } catch {
            toast.error("Erreur lors de la création du cache")
        }
    }

    const handleDeleteCache = (cacheId: string) => {
        const success = HuntStorage.deleteCache(cacheId)
        if (success) {
            toast.success("Cache supprimé")
            onCachesUpdate()
        } else {
            toast.error("Erreur lors de la suppression")
        }
    }

    const addHint = () => {
        setNewCache({
            ...newCache,
            hints: [...newCache.hints, ""],
        })
    }

    const updateHint = (index: number, value: string) => {
        const newHints = [...newCache.hints]
        newHints[index] = value
        setNewCache({ ...newCache, hints: newHints })
    }

    const removeHint = (index: number) => {
        setNewCache({
            ...newCache,
            hints: newCache.hints.filter((_, i) => i !== index),
        })
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Facile":
                return "bg-green-100 text-green-600 border-green-200"
            case "Intermédiaire":
                return "bg-sand-100 text-sand-600 border-sand-200"
            case "Difficile":
                return "bg-red-100 text-red-600 border-red-200"
            default:
                return "bg-gray-100 text-gray-600 border-gray-200"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Gestion des Caches</h3>
                    <p className="text-sm text-gray-400">Créez et gérez les trésors cachés de votre chasse</p>
                </div>
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-sand-200 hover:bg-sand-300 text-sand-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Ajouter un cache
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Créer un nouveau cache</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cache-name">Nom du cache *</Label>
                                    <Input
                                        id="cache-name"
                                        placeholder="ex: Trésor de la fontaine"
                                        value={newCache.name}
                                        onChange={(e) => setNewCache({ ...newCache, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cache-difficulty">Difficulté</Label>
                                    <Select
                                        value={newCache.difficulty}
                                        onValueChange={(value: "Facile" | "Intermédiaire" | "Difficile") =>
                                            setNewCache({ ...newCache, difficulty: value })
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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cache-description">Description</Label>
                                <Textarea
                                    id="cache-description"
                                    placeholder="Décrivez ce que contient ce cache..."
                                    value={newCache.description}
                                    onChange={(e) => setNewCache({ ...newCache, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cache-lat">Latitude *</Label>
                                    <Input
                                        id="cache-lat"
                                        type="number"
                                        step="0.000001"
                                        placeholder="48.8566"
                                        value={newCache.latitude}
                                        onChange={(e) => setNewCache({ ...newCache, latitude: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cache-lng">Longitude *</Label>
                                    <Input
                                        id="cache-lng"
                                        type="number"
                                        step="0.000001"
                                        placeholder="2.3522"
                                        value={newCache.longitude}
                                        onChange={(e) => setNewCache({ ...newCache, longitude: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cache-reward">Récompense</Label>
                                <Input
                                    id="cache-reward"
                                    placeholder="ex: 50 Couronnes, Badge Explorateur"
                                    value={newCache.reward}
                                    onChange={(e) => setNewCache({ ...newCache, reward: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Indices</Label>
                                {newCache.hints.map((hint, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder={`Indice ${index + 1}`}
                                            value={hint}
                                            onChange={(e) => updateHint(index, e.target.value)}
                                        />
                                        {newCache.hints.length > 1 && (
                                            <Button variant="outline" size="icon" onClick={() => removeHint(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button variant="outline" onClick={addHint} className="w-full">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Ajouter un indice
                                </Button>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="flex-1">
                                    Annuler
                                </Button>
                                <Button onClick={handleCreateCache} className="flex-1">
                                    Créer le cache
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caches.map((cache) => (
                    <Card key={cache.id} className="overflow-hidden">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {cache.name}
                                    </CardTitle>
                                    <CardDescription>{cache.description}</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Badge className={getDifficultyColor(cache.difficulty)}>{cache.difficulty}</Badge>
                                    {cache.discovered && <Badge variant="outline">Découvert</Badge>}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-400">Position:</span>
                                    <p className="font-mono text-xs">
                                        {cache.latitude.toFixed(6)}, {cache.longitude.toFixed(6)}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Récompense:</span>
                                    <p className="font-medium">{cache.reward || "Aucune"}</p>
                                </div>
                            </div>

                            {cache.hints.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-sm font-medium">Indices:</span>
                                    <div className="space-y-1">
                                        {cache.hints.map((hint, index) => (
                                            <p key={index} className="text-xs text-gray-400 bg-gray-50 p-2 rounded">
                                                {index + 1}. {hint}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Separator />

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setSelectedCache(cache)}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    Voir
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Map className="h-4 w-4 mr-1" />
                                    Localiser
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDeleteCache(cache.id)}>
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Supprimer
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {caches.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <Gift className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-400 mb-4">Aucun cache créé pour cette chasse.</p>
                        <p className="text-sm text-gray-400">
                            Ajoutez des caches pour que les joueurs puissent découvrir des trésors !
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Modal de détails du cache */}
            {selectedCache && (
                <Dialog open={!!selectedCache} onOpenChange={() => setSelectedCache(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                {selectedCache.name}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label>Description</Label>
                                <p className="text-sm text-gray-600">{selectedCache.description || "Aucune description"}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Latitude</Label>
                                    <p className="font-mono text-sm">{selectedCache.latitude}</p>
                                </div>
                                <div>
                                    <Label>Longitude</Label>
                                    <p className="font-mono text-sm">{selectedCache.longitude}</p>
                                </div>
                            </div>
                            <div>
                                <Label>Récompense</Label>
                                <p className="text-sm">{selectedCache.reward || "Aucune récompense"}</p>
                            </div>
                            {selectedCache.discovered && (
                                <div>
                                    <Label>Découvert</Label>
                                    <p className="text-sm text-green-600">
                                        Le {new Date(selectedCache.discoveredAt!).toLocaleDateString()} par {selectedCache.discoveredBy}
                                    </p>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
