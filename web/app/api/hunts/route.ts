import { NextResponse } from "next/server"

// Types pour les données de chasse
export interface Hunt {
  id: number
  title: string
  date: string
  location: string
  coordinates: [number, number]
  participants: number
  description: string
  details: string
  organizer: string
  price: string
  equipment: string
  difficulty: string
  type: string
  createdAt: string
  updatedAt: string
}

// Données fictives pour les chasses (simulant une base de données)
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

// GET /api/hunts - Récupérer toutes les chasses
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Filtrage par type
  const type = searchParams.get("type")
  // Filtrage par difficulté
  const difficulty = searchParams.get("difficulty")
  // Filtrage par date (après une certaine date)
  const afterDate = searchParams.get("afterDate")
  // Filtrage par région (recherche dans le champ location)
  const region = searchParams.get("region")

  let filteredHunts = [...huntsData]

  if (type) {
    filteredHunts = filteredHunts.filter((hunt) => hunt.type === type)
  }

  if (difficulty) {
    filteredHunts = filteredHunts.filter((hunt) => hunt.difficulty.toLowerCase().includes(difficulty.toLowerCase()))
  }

  if (afterDate) {
    filteredHunts = filteredHunts.filter((hunt) => new Date(hunt.date) >= new Date(afterDate))
  }

  if (region) {
    filteredHunts = filteredHunts.filter((hunt) => hunt.location.toLowerCase().includes(region.toLowerCase()))
  }

  return NextResponse.json(filteredHunts)
}

// POST /api/hunts - Créer une nouvelle chasse
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation des champs requis
    const requiredFields = ["title", "date", "location", "coordinates", "participants", "description", "type"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Le champ '${field}' est requis` }, { status: 400 })
      }
    }

    // Génération d'un nouvel ID (dans une vraie application, ce serait géré par la base de données)
    const newId = huntsData.length > 0 ? Math.max(...huntsData.map((h) => h.id)) + 1 : 1

    // Création de la nouvelle chasse
    const newHunt: Hunt = {
      id: newId,
      title: body.title,
      date: body.date,
      location: body.location,
      coordinates: body.coordinates,
      participants: body.participants,
      description: body.description,
      details: body.details || "",
      organizer: body.organizer || "",
      price: body.price || "",
      equipment: body.equipment || "",
      difficulty: body.difficulty || "Moyenne",
      type: body.type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Ajout à notre "base de données" (dans une vraie application, ce serait un appel à la base de données)
    huntsData.push(newHunt)

    return NextResponse.json(newHunt, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de la chasse:", error)
    return NextResponse.json({ error: "Erreur lors de la création de la chasse" }, { status: 500 })
  }
}