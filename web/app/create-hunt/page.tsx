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
import { ArrowLeft, Calendar } from "lucide-react"
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
    coordinates: [46.603354, 1.888334] as [number, number],
    participants: 10,
    description: "",
    details: "",
    organizer: user?.nickname || "",
    price: "0€", // par défaut gratuit
    equipment: "",
    difficulty: "Facile",
    type: "trésor",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = "Le titre est requis"
    if (!formData.date) newErrors.date = "La date est requise"
    if (!formData.location.trim()) newErrors.location = "Le lieu est requis"
    if (formData.participants <= 0) newErrors.participants = "Le nombre de participants doit être supérieur à 0"
    if (!formData.description.trim()) newErrors.description = "La description est requise"
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
                <Label htmlFor="title">Titre</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
              </div>
              <div>
                <Label htmlFor="location">Lieu</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} />
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
              </div>
              <div>
                <Label htmlFor="participants">Nombre de participants max</Label>
                <Input id="participants" name="participants" type="number" value={formData.participants} onChange={handleNumberChange} />
                {errors.participants && <p className="text-red-500 text-sm">{errors.participants}</p>}
              </div>
              <div>
                <Label htmlFor="difficulty">Niveau de difficulté</Label>
                <Select value={formData.difficulty} onValueChange={(val) => handleSelectChange("difficulty", val)}>
                  <SelectTrigger><SelectValue placeholder="Choisir une difficulté" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facile">Facile</SelectItem>
                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                    <SelectItem value="Difficile">Difficile</SelectItem>
                  </SelectContent>
                </Select>
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
