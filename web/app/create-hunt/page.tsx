"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar } from "lucide-react"
import BasePage from "@/components/base-page"

export default function CreateHuntPage() {
  return (
    <BasePage>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/hunts" className="inline-flex items-center text-[#7687C6] hover:text-[#7687C6]/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Link>
        </div>

        <Card className="max-w-3xl mx-auto border-[#B5A878]/20 shadow-md">
          <CardHeader className="bg-[#A7C55E]/10 border-b border-[#B5A878]/20">
            <CardTitle className="text-[#211E12]">Créer une nouvelle chasse</CardTitle>
            <CardDescription className="text-[#211E12]/70">
              Remplissez le formulaire ci-dessous pour organiser une nouvelle chasse
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titre" className="text-[#211E12]">
                Titre de la chasse
              </Label>
              <Input
                id="titre"
                placeholder="Ex: Chasse au sanglier - Forêt de Brocéliande"
                className="border-[#B5A878]/30 focus-visible:ring-[#7687C6]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#211E12]">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre chasse en quelques lignes..."
                className="min-h-[120px] border-[#B5A878]/30 focus-visible:ring-[#7687C6]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[#211E12]">
                  Date
                </Label>
                <div className="relative">
                  <Input id="date" type="date" className="border-[#B5A878]/30 focus-visible:ring-[#7687C6]" />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-[#7687C6]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="participants" className="text-[#211E12]">
                  Nombre de participants
                </Label>
                <Input
                  id="participants"
                  type="number"
                  min="1"
                  placeholder="Ex: 8"
                  className="border-[#B5A878]/30 focus-visible:ring-[#7687C6]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lieu" className="text-[#211E12]">
                Lieu
              </Label>
              <Input
                id="lieu"
                placeholder="Ex: Forêt de Brocéliande, Bretagne"
                className="border-[#B5A878]/30 focus-visible:ring-[#7687C6]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-[#211E12]">
                Type de chasse
              </Label>
              <Select>
                <SelectTrigger className="border-[#B5A878]/30 focus:ring-[#7687C6]">
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
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#B5A878]/20 pt-6 flex flex-col sm:flex-row gap-3">
            <Button className="bg-[#7687C6] hover:bg-[#7687C6]/90 w-full sm:w-auto">Créer la chasse</Button>
            <Button
              variant="outline"
              className="border-[#B5A878] text-[#211E12] hover:bg-[#B5A878]/10 w-full sm:w-auto"
            >
              Aperçu
            </Button>
          </CardFooter>
        </Card>
      </div>
    </BasePage>
  )
}
