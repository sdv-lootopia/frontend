import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Trophy, Plus } from "lucide-react"

// Données fictives pour les chasses au trésor
const chasses = [
  {
    id: 1,
    titre: "Mystère à Montmartre",
    date: "15 octobre 2025",
    lieu: "Paris, Montmartre",
    participants: 24,
    theme: "Enquête historique",
    recompense: "Badge Montmartre + 50 pièces",
  },
  {
    id: 2,
    titre: "Le trésor de la Médina",
    date: "22 novembre 2025",
    lieu: "Dakar, Médina",
    participants: 15,
    theme: "Culture urbaine",
    recompense: "Artefact rare + monnaie virtuelle",
  },
  {
    id: 3,
    titre: "Secrets du Château",
    date: "5 décembre 2025",
    lieu: "Château de Versailles",
    participants: 30,
    theme: "Mystère royal",
    recompense: "Accès à une chasse privée",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F2]">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C1B18]">Chasses au Trésor</h1>
          <Link href="/creer">
            <Button className="bg-[#5C77D1] hover:bg-[#5C77D1]/90">
              <Plus className="mr-2 h-4 w-4" /> Créer une chasse
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chasses.map((chasse) => (
            <Card key={chasse.id} className="border-[#CFC9B2]/40 shadow hover:shadow-md transition-shadow">
              <CardHeader className="bg-[#DCE8B0]/20 border-b border-[#CFC9B2]/30">
                <CardTitle className="text-[#1C1B18]">{chasse.titre}</CardTitle>
                <CardDescription className="text-[#3B3A35]/70">{chasse.theme}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center text-[#1C1B18]/80">
                  <Calendar className="h-4 w-4 mr-2 text-[#5C77D1]" />
                  <span>{chasse.date}</span>
                </div>
                <div className="flex items-center text-[#1C1B18]/80">
                  <MapPin className="h-4 w-4 mr-2 text-[#5C77D1]" />
                  <span>{chasse.lieu}</span>
                </div>
                <div className="flex items-center text-[#1C1B18]/80">
                  <Trophy className="h-4 w-4 mr-2 text-[#5C77D1]" />
                  <span>{chasse.recompense}</span>
                </div>
                <div className="text-sm text-[#1C1B18]/60">
                  {chasse.participants} participants déjà inscrits
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#CFC9B2]/30 pt-4">
                <Link href={`/hunts/${chasse.id}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-[#DCE8B0] text-[#1C1B18] hover:bg-[#DCE8B0]/10"
                  >
                    Voir les détails
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
