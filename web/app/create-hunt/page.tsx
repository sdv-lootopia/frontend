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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar } from 'lucide-react'
import BasePage from "@/components/base-page"
import { createHunt } from "@/lib/api"
import { useUser } from "@/lib/useUser"

export default function CreateHuntPage() {
  const router = useRouter()
  const { user } = useUser()

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    coordinates: [46.603354, 1.888334] as [number, number], // Centre de la France par défaut
    participants: 8,
    description: "",
    details: "",
    organizer: user?.nickname || "",
    price: "",
    equipment: "",
    difficulty: "Moyenne",
    type: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Effacer l'erreur pour ce champ s'il y en a une
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Effacer l'erreur pour ce champ s'il y en a une
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
    // Effacer l'erreur pour ce champ s'il y en a une
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est requis"
    }

    if (!formData.date) {
      newErrors.date = "La date est requise"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Le lieu est requis"
    }

    if (formData.participants <= 0) {
      newErrors.participants = "Le nombre de participants doit être supérieur à 0"
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise"
    }

    if (!formData.type) {
      newErrors.type = "Le type de chasse est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const newHunt = await createHunt(formData)
      router.push(`/hunts/${newHunt.id}`)
    } catch (error: any) {
      console.error("Erreur lors de la création de la chasse:", error)
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

        <form onSubmit={handleSubmit}>
          <Card className="max-w-3xl mx-auto border-[#B5A878]/20 shadow-md">
            <CardHeader className="bg-[#A7C55E]/10 border-b border-[#B5A878]/20">
              <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Créer une chasse</h1>
                <p>Remplissez le formulaire ci-dessous pour organiser une nouvelle chasse</p>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#211E12]">
                  Titre de la chasse
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Chasse au sanglier - Forêt de Brocéliande"
                  className={`border-[#B5A878]/30 focus-visible:ring-[#7687C6] ${errors.title ? "border-red-500" : ""}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#211E12]">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez votre chasse en quelques lignes..."
                  className={`min-h-[120px] border-[#B5A878]/30 focus-visible:ring-[#7687C6] ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-[#211E12]">
                    Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`border-[#B5A878]/30 focus-visible:ring-[#7687C6] ${
                        errors.date ? "border-red-500" : ""
                      }`}
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-[#7687C6]" />
                  </div>
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participants" className="text-[#211E12]">
                    Nombre de participants
                  </Label>
                  <Input
                    id="participants"
                    name="participants"
                    type="number"
                    min="1"
                    value={formData.participants}
                    onChange={handleNumberChange}
                    placeholder="Ex: 8"
                    className={`border-[#B5A878]/30 focus-visible:ring-[#7687C6] ${
                      errors.participants ? "border-red-500" : ""
                    }`}
                  />
                  {errors.participants && <p className="text-red-500 text-sm mt-1">{errors.participants}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-[#211E12]">
                  Lieu
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ex: Forêt de Brocéliande, Bretagne"
                  className={`border-[#B5A878]/30 focus-visible:ring-[#7687C6] ${
                    errors.location ? "border-red-500" : ""
                  }`}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-[#211E12]">
                  Type de chasse
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger
                    className={`border-[#B5A878]/30 focus:ring-[#7687C6] ${errors.type ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Sélectionnez un type de chasse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sanglier">Chasse au sanglier</SelectItem>
                    <SelectItem value="chevreuil">Chasse au chevreuil</SelectItem>
                    <SelectItem value="faisan">Chasse au faisan</SelectItem>
                    <SelectItem value="lievre">Chasse au lièvre</SelectItem>
                    <SelectItem value="courre">Chasse à courre</SelectItem>
                    <SelectItem value="battue">Battue</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="details" className="text-[#211E12]">
                  Détails supplémentaires
                </Label>
                <Textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Informations complémentaires sur la chasse..."
                  className="min-h-[120px] border-[#B5A878]/30 focus-visible:ring-[#7687C6]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organizer" className="text-[#211E12]">
                    Organisateur
                  </Label>
                  <Input
                    id="organizer"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleChange}
                    placeholder="Nom de l'organisateur"
                    className="border-[#B5A878]/30 focus-visible:ring-[#7687C6]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-[#211E12]">
                    Prix
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Ex: 150€"
                    className="border-[#B5A878]/30 focus-visible:ring-[#7687C6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="equipment" className="text-[#211E12]">
                    Équipement recommandé
                  </Label>
                  <Input
                    id="equipment"
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleChange}
                    placeholder="Ex: Fusil, cartouches, gilet orange, bottes"
                    className="border-[#B5A878]/30 focus-visible:ring-[#7687C6]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-[#211E12]">
                    Difficulté
                  </Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => handleSelectChange("difficulty", value)}
                  >
                    <SelectTrigger className="border-[#B5A878]/30 focus:ring-[#7687C6]">
                      <SelectValue placeholder="Sélectionnez la difficulté" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facile">Facile</SelectItem>
                      <SelectItem value="Moyenne">Moyenne</SelectItem>
                      <SelectItem value="Difficile">Difficile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#B5A878]/20 pt-6 flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                className="bg-[#7687C6] hover:bg-[#7687C6]/90 w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Création en cours..." : "Créer la chasse"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-[#B5A878] text-[#211E12] hover:bg-[#B5A878]/10 w-full sm:w-auto"
                onClick={() => router.push("/hunts")}
              >
                Annuler
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </BasePage>
  )
}