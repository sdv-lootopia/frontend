"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Users, Plus, Map } from 'lucide-react'
import BasePage from "@/components/base-page"
import { getHunts } from "@/lib/api"
import type { Hunt } from "@/app/api/hunts/route"

export default function HuntsPage() {
  const [hunts, setHunts] = useState<Hunt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHunts() {
      try {
        const data = await getHunts()
        setHunts(data)
        setLoading(false)
      } catch (err) {
        console.error("Erreur lors de la récupération des chasses:", err)
        setError("Impossible de charger les chasses. Veuillez réessayer plus tard.")
        setLoading(false)
      }
    }

    fetchHunts()
  }, [])

  if (loading) {
    return (
      <BasePage>
        <div className="container mx-auto py-8 px-4 text-center">
          <p>Chargement des chasses...</p>
        </div>
      </BasePage>
    )
  }

  if (error) {
    return (
      <BasePage>
        <div className="container mx-auto py-8 px-4 text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Réessayer
          </Button>
        </div>
      </BasePage>
    )
  }

  return (
    <BasePage>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#211E12]">Tableau de Chasse</h1>
          <div className="flex gap-3">
            <Link href="/hunts/map">
              <Button variant="outline" className="border-[#7687C6] text-[#7687C6] hover:bg-[#7687C6]/10">
                <Map className="mr-2 h-4 w-4" /> Voir la carte
              </Button>
            </Link>
            <Link href="/create-hunt">
              <Button className="bg-[#7687C6] hover:bg-[#7687C6]/90">
                <Plus className="mr-2 h-4 w-4" /> Créer une chasse
              </Button>
            </Link>
          </div>
        </div>

        {hunts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Aucune chasse disponible pour le moment.</p>
            <Link href="/create-hunt">
              <Button className="mt-4 bg-[#7687C6] hover:bg-[#7687C6]/90">
                <Plus className="mr-2 h-4 w-4" /> Créer une chasse
              </Button>
            </Link>
          </div>
        ) : (
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
                      <span>
                        {new Date(hunt.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
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
                  <Link href={`/hunts/${hunt.id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-[#A7C55E] text-[#211E12] hover:bg-[#A7C55E]/10 hover:text-[#211E12]"
                    >
                      Voir les détails
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </BasePage>
  )
}