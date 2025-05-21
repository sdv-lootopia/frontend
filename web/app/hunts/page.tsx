"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Users, Plus } from "lucide-react"
import BasePage from "@/components/base-page"

// Données fictives pour les chasses
const hunts = [
  {
    id: 1,
    title: "Chasse au sanglier - Forêt de Brocéliande",
    date: "15 octobre 2025",
    location: "Forêt de Brocéliande, Bretagne",
    participants: 8,
    description:
      "Chasse au sanglier organisée dans la mythique forêt de Brocéliande. Rendez-vous à l'aube pour une journée complète.",
  },
  {
    id: 2,
    title: "Battue aux chevreuils - Domaine des Chênes",
    date: "22 novembre 2025",
    location: "Domaine des Chênes, Sologne",
    participants: 12,
    description: "Battue aux chevreuils dans le prestigieux Domaine des Chênes. Déjeuner inclus au pavillon de chasse.",
  },
  {
    id: 3,
    title: "Chasse à courre - Château de Chambord",
    date: "5 décembre 2025",
    location: "Forêt de Chambord, Val de Loire",
    participants: 20,
    description: "Traditionnelle chasse à courre dans le domaine royal. Tenue vestimentaire appropriée exigée.",
  },
  {
    id: 4,
    title: "Chasse aux faisans - Les Étangs",
    date: "18 janvier 2026",
    location: "Domaine des Étangs, Charente",
    participants: 6,
    description:
      "Journée de chasse aux faisans dans un cadre exceptionnel. Nombre de participants limité pour garantir une expérience de qualité.",
  },
]

export default function HuntsPage() {
  return (
    <BasePage>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#211E12]">Tableau de Chasse</h1>
          <Link href="/create-hunt">
            <Button className="bg-[#7687C6] hover:bg-[#7687C6]/90">
              <Plus className="mr-2 h-4 w-4" /> Créer une chasse
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hunts.map((hunt) => (
            <Card key={hunt.id} className="border-[#B5A878]/20 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-[#A7C55E]/10 border-b border-[#B5A878]/20">
                <CardTitle className="text-[#211E12]">{hunt.title}</CardTitle>
                <CardDescription className="text-[#211E12]/70">{hunt.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center text-[#211E12]/80">
                    <Calendar className="h-4 w-4 mr-2 text-[#7687C6]" />
                    <span>{hunt.date}</span>
                  </div>
                  <div className="flex items-center text-[#211E12]/80">
                    <MapPin className="h-4 w-4 mr-2 text-[#7687C6]" />
                    <span>{hunt.location}</span>
                  </div>
                  <div className="flex items-center text-[#211E12]/80">
                    <Users className="h-4 w-4 mr-2 text-[#7687C6]" />
                    <span>{hunt.participants} participants</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#B5A878]/20 pt-4">
                <Button
                  variant="outline"
                  className="w-full border-[#A7C55E] text-[#211E12] hover:bg-[#A7C55E]/10 hover:text-[#211E12]"
                >
                  Voir les détails
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Liste des chasses</h1>
        </div>
      </div>
    </BasePage>
  )
}
