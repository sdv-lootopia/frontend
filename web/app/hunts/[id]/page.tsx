"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { getHunt } from "@/lib/api"
import BasePage from "@/components/base-page"
import HuntMap from "@/components/hunt-map"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Map } from "lucide-react"
import type { Hunt } from "@/app/api/hunts/route"
import ParticipantsList from "@/components/ParticipantsList"


export default function HuntDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [hunt, setHunt] = useState<Hunt | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHunt = async () => {
      try {
        const huntData = await getHunt(Number(id))
        setHunt(huntData)
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de la chasse")
      }
    }

    fetchHunt()
  }, [id])

  if (error) {
    return (
      <BasePage>
        <div className="container mx-auto py-8 px-4">
          <p className="text-red-600">{error}</p>
        </div>
      </BasePage>
    )
  }

  if (!hunt) {
    return (
      <BasePage>
        <div className="container mx-auto py-8 px-4">
          <p>Chargement...</p>
        </div>
      </BasePage>
    )
  }

  const mapLocation = {
    id: hunt.id,
    title: hunt.title,
    location: hunt.location,
    coordinates: hunt.coordinates,
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
                    <p>{hunt.participants} maximum</p>
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
