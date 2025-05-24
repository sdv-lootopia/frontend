"use client"

import { useRouter } from "next/navigation"
import BasePage from "@/components/base-page"
import HuntMap from "@/components/hunt-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type HuntLocation = {
  id: number
  title: string
  location: string
  coordinates: [number, number]
}

const huntLocations: HuntLocation[] = [
  {
    id: 1,
    title: "Trésor caché - Forêt de Brocéliande",
    location: "Forêt de Brocéliande, Bretagne",
    coordinates: [48.0183, -2.1733],
  },
  {
    id: 2,
    title: "Enigmes mystiques - Domaine des Chênes",
    location: "Domaine des Chênes, Sologne",
    coordinates: [47.5333, 1.75],
  },
  {
    id: 3,
    title: "Aventure royale - Château de Chambord",
    location: "Forêt de Chambord, Val de Loire",
    coordinates: [47.6158, 1.5172],
  },
  {
    id: 4,
    title: "Course au trésor - Domaine des Étangs",
    location: "Domaine des Étangs, Charente",
    coordinates: [45.8667, 0.5167],
  },
]

export default function HuntsMapPage() {
  const router = useRouter()

  const handleMarkerClick = (id: number) => {
    router.push(`/hunts/${id}`)
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

        <Card className="border-[#B5A878]/20 shadow-md">
          <CardHeader className="bg-[#A7C55E]/10 border-b border-[#B5A878]/20">
            <CardTitle className="text-[#211E12]">Carte des chasses au trésor</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4 text-[#211E12]/80">
              Découvrez des aventures gratuites en explorant la carte. Cliquez sur un repère pour commencer votre quête !
            </p>
            <HuntMap locations={huntLocations} height="600px" onMarkerClick={handleMarkerClick} />
          </CardContent>
        </Card>
      </div>
    </BasePage>
  )
}
