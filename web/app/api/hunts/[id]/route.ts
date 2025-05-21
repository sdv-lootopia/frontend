import { NextResponse } from "next/server"
import type { Hunt } from "../route"

// Données fictives pour les chasses (simulant une base de données)
// Note: Dans une vraie application, ces données seraient dans une base de données
// et importées depuis un service ou un modèle commun
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
  {
    id: 2,
    title: "Battue aux chevreuils - Domaine des Chênes",
    date: "2025-11-22",
    location: "Domaine des Chênes, Sologne",
    coordinates: [47.5333, 1.75],
    participants: 12,
    description: "Battue aux chevreuils dans le prestigieux Domaine des Chênes. Déjeuner inclus au pavillon de chasse.",
    details:
      "Le Domaine des Chênes vous invite à participer à une battue aux chevreuils dans son prestigieux domaine de 500 hectares. Cette chasse est réservée aux chasseurs expérimentés. Le rendez-vous est fixé à 7h au château. Le petit-déjeuner et le déjeuner sont inclus. N'oubliez pas votre permis de chasse et votre assurance. Les chiens sont autorisés.",
    organizer: "Domaine des Chênes",
    price: "250€",
    equipment: "Fusil, cartouches, gilet orange, bottes",
    difficulty: "Difficile",
    type: "chevreuil",
    createdAt: "2025-05-02T14:30:00Z",
    updatedAt: "2025-05-02T14:30:00Z",
  },
  {
    id: 3,
    title: "Chasse à courre - Château de Chambord",
    date: "2025-12-05",
    location: "Forêt de Chambord, Val de Loire",
    coordinates: [47.6158, 1.5172],
    participants: 20,
    description: "Traditionnelle chasse à courre dans le domaine royal. Tenue vestimentaire appropriée exigée.",
    details:
      "Le Château de Chambord vous invite à participer à sa traditionnelle chasse à courre dans le domaine royal. Cette chasse est ouverte aux chasseurs et aux spectateurs. Le rendez-vous est fixé à 9h dans la cour du château. Le déjeuner est inclus. Tenue vestimentaire appropriée exigée : veste rouge, pantalon blanc, bottes noires.",
    organizer: "Château de Chambord",
    price: "350€",
    equipment: "Tenue vestimentaire appropriée",
    difficulty: "Facile (pour les spectateurs)",
    type: "courre",
    createdAt: "2025-05-03T09:15:00Z",
    updatedAt: "2025-05-03T09:15:00Z",
  },
  {
    id: 4,
    title: "Chasse aux faisans - Les Étangs",
    date: "2026-01-18",
    location: "Domaine des Étangs, Charente",
    coordinates: [45.8667, 0.5167],
    participants: 6,
    description:
      "Journée de chasse aux faisans dans un cadre exceptionnel. Nombre de participants limité pour garantir une expérience de qualité.",
    details:
      "Le Domaine des Étangs vous invite à participer à une journée de chasse aux faisans dans un cadre exceptionnel. Cette chasse est ouverte aux chasseurs de tous niveaux. Le nombre de participants est limité à 6 pour garantir une expérience de qualité. Le rendez-vous est fixé à 8h au pavillon de chasse. Le petit-déjeuner et le déjeuner sont inclus. N'oubliez pas votre permis de chasse et votre assurance.",
    organizer: "Domaine des Étangs",
    price: "200€",
    equipment: "Fusil, cartouches, gilet orange, bottes",
    difficulty: "Facile",
    type: "faisan",
    createdAt: "2025-05-04T11:45:00Z",
    updatedAt: "2025-05-04T11:45:00Z",
  },
]

// GET /api/hunts/[id] - Récupérer une chasse par son ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Recherche de la chasse par ID
  const hunt = huntsData.find((h) => h.id === id)

  if (!hunt) {
    return NextResponse.json({ error: "Chasse non trouvée" }, { status: 404 })
  }

  return NextResponse.json(hunt)
}

// PUT /api/hunts/[id] - Mettre à jour une chasse
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    // Recherche de l'index de la chasse
    const huntIndex = huntsData.findIndex((h) => h.id === id)

    if (huntIndex === -1) {
      return NextResponse.json({ error: "Chasse non trouvée" }, { status: 404 })
    }

    // Mise à jour de la chasse
    const updatedHunt = {
      ...huntsData[huntIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    // Remplacement dans notre "base de données"
    huntsData[huntIndex] = updatedHunt

    return NextResponse.json(updatedHunt)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la chasse:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour de la chasse" }, { status: 500 })
  }
}

// DELETE /api/hunts/[id] - Supprimer une chasse
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Recherche de l'index de la chasse
  const huntIndex = huntsData.findIndex((h) => h.id === id)

  if (huntIndex === -1) {
    return NextResponse.json({ error: "Chasse non trouvée" }, { status: 404 })
  }

  // Suppression de la chasse
  huntsData.splice(huntIndex, 1)

  return NextResponse.json({ success: true })
}