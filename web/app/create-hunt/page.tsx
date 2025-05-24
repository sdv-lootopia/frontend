"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import BasePage from "@/components/base-page"
import { createHunt } from "@/lib/api"
import { useUser } from "@/lib/useUser"

export default function CreateHuntPage() {
  const router = useRouter()
  const { user } = useUser()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    world: "réel",
    mode: "public",
    chat: "oui",
    duration: "",
    price: "0",
    startDate: "",
    endDate: "",
    maxParticipants: "",
    requireLocation: "oui",
    digCost: "0",
    digDelay: "",
    maps: [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = "Le titre est requis"
    if (!formData.description.trim()) newErrors.description = "La description est requise"
    if (!formData.startDate) newErrors.startDate = "Date de début requise"
    if (!formData.endDate) newErrors.endDate = "Date de fin requise"
    if (!formData.duration) newErrors.duration = "Durée requise"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const newHunt = await createHunt(formData)
      router.push(`/hunts/${newHunt.id}`)
    } catch (error: any) {
      setSubmitError(error.message || "Une erreur est survenue lors de la création de la chasse")
      setIsSubmitting(false)
    }
  }

  return (
    <BasePage>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/hunts" className="inline-flex items-center text-[#7687C6] hover:text-[#7687C6]/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Link>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="max-w-3xl mx-auto border-[#B5A878]/20 shadow-md">
            <CardHeader className="bg-[#A7C55E]/10 border-b border-[#B5A878]/20">
              <h1 className="text-2xl font-bold">Créer une chasse au trésor</h1>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Titre</Label>
                <Input name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div>
                <Label>Monde</Label>
                <Select value={formData.world} onValueChange={(val) => handleSelectChange("world", val)}>
                  <SelectTrigger><SelectValue placeholder="Choisir le monde" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="réel">Monde Réel</SelectItem>
                    <SelectItem value="virtuel">Monde Cartographique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Mode</Label>
                <Select value={formData.mode} onValueChange={(val) => handleSelectChange("mode", val)}>
                  <SelectTrigger><SelectValue placeholder="Choisir un mode" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="privé">Privé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Chat</Label>
                <Select value={formData.chat} onValueChange={(val) => handleSelectChange("chat", val)}>
                  <SelectTrigger><SelectValue placeholder="Activer le chat ?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oui">Oui</SelectItem>
                    <SelectItem value="non">Non</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Durée (en heures)</Label>
                <Input name="duration" value={formData.duration} onChange={handleChange} />
              </div>
              <div>
                <Label>Frais de participation</Label>
                <Input name="price" value={formData.price} onChange={handleChange} />
              </div>
              <div>
                <Label>Date de début</Label>
                <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
              </div>
              <div>
                <Label>Date de fin</Label>
                <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
              </div>
              <div>
                <Label>Nombre max de participants</Label>
                <Input name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} />
              </div>
              <div>
                <Label>Localisation obligatoire</Label>
                <Select value={formData.requireLocation} onValueChange={(val) => handleSelectChange("requireLocation", val)}>
                  <SelectTrigger><SelectValue placeholder="Obligatoire ?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oui">Oui</SelectItem>
                    <SelectItem value="non">Non</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Coût de fouille</Label>
                <Input name="digCost" value={formData.digCost} onChange={handleChange} />
              </div>
              <div>
                <Label>Délai de fouille (en minutes)</Label>
                <Input name="digDelay" value={formData.digDelay} onChange={handleChange} />
              </div>
              <div>
                <Label>Cartes utilisées (à intégrer plus tard)</Label>
                <p className="text-sm text-gray-500">Sélection de carte à venir</p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#B5A878]/20 pt-4">
              <Button type="submit" className="bg-[#7687C6] hover:bg-[#7687C6]/90" disabled={isSubmitting}>
                {isSubmitting ? "Création..." : "Créer la chasse"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </BasePage>
  )
}
