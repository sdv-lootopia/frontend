"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Users, Map } from "lucide-react"
import BasePage from "@/components/base-page"
import { useParams, useRouter } from "next/navigation"
import HuntMap from "@/components/hunt-map"

// Données fictives pour les chasses
const hunts = [
  {
    id: 1,
    title: "Chasse au sanglier - Forêt de Brocéliande",
    date: "15 octobre 2025",
    location: "Forêt de Brocéliande, Bretagne",
    coordinates: [48.0183, -2.1733], // Coordonnées approximatives de la forêt de Brocéliande
    participants: 8,
    description:
      "Chasse au sanglier organisée dans la mythique forêt de Brocéliande. Rendez-vous à l'aube pour une journée complète.",
    details:
      "Venez participer à une journée de chasse au sanglier dans la mythique forêt de Brocéliande. Cette chasse est organisée par l'association des chasseurs de Bretagne et est ouverte aux chasseurs expérimentés. Le rendez-vous est fixé à 5h du matin au pavillon de chasse. Le petit-déjeuner et le déjeuner sont inclus. N'oubliez pas votre permis de chasse et votre assurance. Les chiens sont autorisés.",
    organizer: "Association des Chasseurs de Bretagne",
    price: "150€",
    equipment: "Fusil, cartouches, gilet orange, bottes",
    difficulty: "Moyenne",
  },
  {
    id: 2,
    title: "Battue aux chevreuils - Domaine des Chênes",
    date: "22 novembre 2025",
    location: "Domaine des Chênes, Sologne",
    coordinates: [47.5333, 1.75], // Coordonnées approximatives de la Sologne
    participants: 12,
    description: "Battue aux chevreuils dans le prestigieux Domaine des Chênes. Déjeuner inclus au pavillon de chasse.",
    details:
      "Le Domaine des Chênes vous invite à participer à une battue aux chevreuils dans son prestigieux domaine de 500 hectares. Cette chasse est réservée aux chasseurs expérimentés. Le rendez-vous est fixé à 7h au château. Le petit-déjeuner et le déjeuner sont inclus. N'oubliez pas votre permis de chasse et votre assurance. Les chiens sont autorisés.",
    organizer: "Domaine des Chênes",
    price: "250€",
    equipment: "Fusil, cartouches, gilet orange, bottes",
    difficulty: "Difficile",
  },
  {
    id: 3,
    title: "Chasse à courre - Château de Chambord",
    date: "5 décembre 2025",
    location: "Forêt de Chambord, Val de Loire",
    coordinates: [47.6158, 1.5172], // Coordonnées du Château de Chambord
    participants: 20,
    description: "Traditionnelle chasse à courre dans le domaine royal. Tenue vestimentaire appropriée exigée.",
    details:
      "Le Château de Chambord vous invite à participer à sa traditionnelle chasse à courre dans le domaine royal. Cette chasse est ouverte aux chasseurs et aux spectateurs. Le rendez-vous est fixé à 9h dans la cour du château. Le déjeuner est inclus. Tenue vestimentaire appropriée exigée : veste rouge, pantalon blanc, bottes noires.",
    organizer: "Château de Chambord",
    price: "350€",
    equipment: "Tenue vestimentaire appropriée",
    difficulty: "Facile (pour les spectateurs)",
  },
  {
    id: 4,
    title: "Chasse aux faisans - Les Étangs",
    date: "18 janvier 2026",
    location: "Domaine des Étangs, Charente",
    coordinates: [45.8667, 0.5167], // Coordonnées approximatives de la Charente
    participants: 6,
    description:
      "Journée de chasse aux faisans dans un cadre exceptionnel. Nombre de participants limité pour garantir une expérience de qualité.",
    details:
      "Le Domaine des Étangs vous invite à participer à une journée de chasse aux faisans dans un cadre exceptionnel. Cette chasse est ouverte aux chasseurs de tous niveaux. Le nombre de participants est limité à 6 pour garantir une expérience de qualité. Le rendez-vous est fixé à 8h au pavillon de chasse. Le petit-déjeuner et le déjeuner sont inclus. N'oubliez pas votre permis de chasse et votre assurance.",
    organizer: "Domaine des Étangs",
    price: "200€",
    equipment: "Fusil, cartouches, gilet orange, bottes",
    difficulty: "Facile",
  },
]

export default function HuntDetailPage() {
  const params = useParams()
  const router = useRouter()
  const huntId = Number(params.id)

  // Trouver la chasse correspondante
  const hunt = hunts.find((h) => h.id === huntId)

  if (!hunt) {
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
              <CardTitle className="text-[#211E12]">Chasse non trouvée</CardTitle>
              <CardDescription className="text-[#211E12]/70">
                La chasse que vous recherchez n'existe pas.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </BasePage>
    )
  }

  // Préparer les données pour la carte
  const mapLocation = {
    id: hunt.id,
    title: hunt.title,
    location: hunt.location,
    coordinates: hunt.coordinates as [number, number],
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

        <Card className="max-w-4xl mx-auto border-[#B5A878]/20 shadow-md">
          <CardHeader className="bg-[#A7C55E]/10 border-b border-[#B5A878]/20">
            <CardTitle className="text-[#211E12] text-2xl">{hunt.title}</CardTitle>
            <CardDescription className="text-[#211E12]/70 text-lg mt-2">{hunt.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center text-[#211E12]/80">
                  <Calendar className="h-5 w-5 mr-3 text-[#7687C6]" />
                  <div>
                    <span className="font-medium">Date</span>
                    <p>{hunt.date}</p>
                  </div>
                </div>
                <div className="flex items-center text-[#211E12]/80">
                  <MapPin className="h-5 w-5 mr-3 text-[#7687C6]" />
                  <div>
                    <span className="font-medium">Lieu</span>
                    <p>{hunt.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-[#211E12]/80">
                  <Users className="h-5 w-5 mr-3 text-[#7687C6]" />
                  <div>
                    <span className="font-medium">Participants</span>
                    <p>{hunt.participants} chasseurs maximum</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-[#211E12]/80">
                  <span className="font-medium">Organisateur</span>
                  <p>{hunt.organizer}</p>
                </div>
                <div className="text-[#211E12]/80">
                  <span className="font-medium">Prix</span>
                  <p>{hunt.price}</p>
                </div>
                <div className="text-[#211E12]/80">
                  <span className="font-medium">Difficulté</span>
                  <p>{hunt.difficulty}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 text-[#211E12]">Détails de la chasse</h3>
              <p className="text-[#211E12]/80">{hunt.details}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-[#211E12]">Équipement recommandé</h3>
              <p className="text-[#211E12]/80">{hunt.equipment}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-[#211E12] flex items-center">
                <Map className="h-5 w-5 mr-2 text-[#7687C6]" />
                Localisation
              </h3>
              <HuntMap locations={[mapLocation]} height="300px" zoom={10} center={mapLocation.coordinates} />
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#B5A878]/20 pt-6 flex flex-col sm:flex-row gap-3">
            <Button className="bg-[#7687C6] hover:bg-[#7687C6]/90 w-full sm:w-auto">S'inscrire à cette chasse</Button>
            <Button
              variant="outline"
              className="border-[#B5A878] text-[#211E12] hover:bg-[#B5A878]/10 w-full sm:w-auto"
            >
              Contacter l'organisateur
            </Button>
          </CardFooter>
        </Card>
      </div>
    </BasePage>
  )
}
