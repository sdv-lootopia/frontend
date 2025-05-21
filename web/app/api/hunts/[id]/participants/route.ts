import { NextResponse } from "next/server"
import type { Hunt } from "../../route"

// Données fictives pour les chasses (simulant une base de données)
// Note: Dans une vraie application, ces données seraient dans une base de données
const huntsData: Hunt[] = [
  {
    id: 1,
    title: "Chasse au sanglier - Forêt de Brocéliande",
    date: "2025-10-15",
    location: "Forêt de Brocéliande, Bretagne",
    coordinates: [48.0183, -2.1733],
    participants: 8,
    description:
      "Chasse au sanglier organisée dans la mythique forêt de Brocéliande. Rendez-vous à l'aube pour une journée complète.",
    details:
      "Venez participer à une journée de chasse au sanglier dans la mythique forêt de Brocéliande. Cette chasse est organisée par l'association des chasseurs de Bretagne et est ouverte aux chasseurs expérimentés. Le rendez-vous est fixé à 5h du matin au pavillon de chasse. Le petit-déjeuner et le déjeuner sont inclus. N'oubliez pas votre permis de chasse et votre assurance. Les chiens sont autorisés.",
    organizer: "Association des Chasseurs de Bretagne",
    price: "150€",
    equipment: "Fusil, cartouches, gilet orange, bottes",
    difficulty: "Moyenne",
    type: "sanglier",
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-01T10:00:00Z",
  },
  // ... autres chasses
]

// Données fictives pour les participants (simulant une base de données)
interface Participant {
  id: number
  huntId: number
  userId: string
  userName: string
  userEmail: string
  registrationDate: string
  status: "pending" | "confirmed" | "cancelled"
}

const participantsData: Participant[] = [
  {
    id: 1,
    huntId: 1,
    userId: "user123",
    userName: "Jean Dupont",
    userEmail: "jean.dupont@example.com",
    registrationDate: "2025-05-10T14:30:00Z",
    status: "confirmed",
  },
  {
    id: 2,
    huntId: 1,
    userId: "user456",
    userName: "Marie Martin",
    userEmail: "marie.martin@example.com",
    registrationDate: "2025-05-11T09:15:00Z",
    status: "confirmed",
  },
  {
    id: 3,
    huntId: 2,
    userId: "user789",
    userName: "Pierre Durand",
    userEmail: "pierre.durand@example.com",
    registrationDate: "2025-05-12T11:45:00Z",
    status: "pending",
  },
]

// GET /api/hunts/[id]/participants - Récupérer tous les participants d'une chasse
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const huntId = Number.parseInt(params.id)

  // Vérifier si la chasse existe
  const hunt = huntsData.find((h) => h.id === huntId)
  if (!hunt) {
    return NextResponse.json({ error: "Chasse non trouvée" }, { status: 404 })
  }

  // Filtrer les participants par huntId
  const participants = participantsData.filter((p) => p.huntId === huntId)

  return NextResponse.json(participants)
}

// POST /api/hunts/[id]/participants - Ajouter un participant à une chasse
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const huntId = Number.parseInt(params.id)
    const body = await request.json()

    // Vérifier si la chasse existe
    const hunt = huntsData.find((h) => h.id === huntId)
    if (!hunt) {
      return NextResponse.json({ error: "Chasse non trouvée" }, { status: 404 })
    }

    // Vérifier si l'utilisateur est déjà inscrit
    const existingParticipant = participantsData.find((p) => p.huntId === huntId && p.userId === body.userId)

    if (existingParticipant) {
      return NextResponse.json({ error: "Vous êtes déjà inscrit à cette chasse" }, { status: 400 })
    }

    // Vérifier si la chasse est complète
    const confirmedParticipants = participantsData.filter((p) => p.huntId === huntId && p.status === "confirmed").length

    if (confirmedParticipants >= hunt.participants) {
      return NextResponse.json({ error: "Cette chasse est complète" }, { status: 400 })
    }

    // Créer un nouvel ID pour le participant
    const newId = participantsData.length > 0 ? Math.max(...participantsData.map((p) => p.id)) + 1 : 1

    // Créer le nouveau participant
    const newParticipant: Participant = {
      id: newId,
      huntId,
      userId: body.userId,
      userName: body.userName,
      userEmail: body.userEmail,
      registrationDate: new Date().toISOString(),
      status: "pending", // Par défaut, l'inscription est en attente de confirmation
    }

    // Ajouter à notre "base de données"
    participantsData.push(newParticipant)

    return NextResponse.json(newParticipant, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de l'inscription à la chasse:", error)
    return NextResponse.json({ error: "Erreur lors de l'inscription à la chasse" }, { status: 500 })
  }
}