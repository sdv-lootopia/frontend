"use server"

import { NextResponse } from "next/server"

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

const huntsData: Hunt[] = [
  {
    id: 1,
    title: "Chasse au trésor - Brocéliande",
    date: "2025-10-15",
    location: "Forêt de Brocéliande, Bretagne",
    coordinates: [48.0183, -2.1733],
    participants: 8,
    description: "Une chasse au trésor magique en plein cœur de la Bretagne.",
    details: "Résolvez des énigmes, suivez les indices et trouvez le trésor caché !",
    organizer: "BoostCom Treasures",
    price: "0€",
    equipment: "Smartphone, boussole, curiosité",
    difficulty: "Moyenne",
    type: "trésor",
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-01T10:00:00Z",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const difficulty = searchParams.get("difficulty")
  const afterDate = searchParams.get("afterDate")
  const region = searchParams.get("region")

  let filtered = huntsData

  if (type) {
    filtered = filtered.filter(h => h.type === type)
  }
  if (difficulty) {
    filtered = filtered.filter(h => h.difficulty.toLowerCase().includes(difficulty.toLowerCase()))
  }
  if (afterDate) {
    filtered = filtered.filter(h => new Date(h.date) >= new Date(afterDate))
  }
  if (region) {
    filtered = filtered.filter(h => h.location.toLowerCase().includes(region.toLowerCase()))
  }

  return NextResponse.json(filtered)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const requiredFields: (keyof Hunt)[] = ["title", "date", "location", "coordinates", "participants", "description", "type"]
    const missing = requiredFields.filter((key) => !body[key])

    if (missing.length > 0) {
      return NextResponse.json({ error: `Champs manquants: ${missing.join(", ")}` }, { status: 400 })
    }

    if (!Array.isArray(body.coordinates) || body.coordinates.length !== 2) {
      return NextResponse.json({ error: "Les coordonnées doivent être un tableau [lat, lng]" }, { status: 400 })
    }

    if (typeof body.participants !== "number" || body.participants <= 0) {
      return NextResponse.json({ error: "Le nombre de participants doit être un entier positif" }, { status: 400 })
    }

    const newHunt: Hunt = {
      id: huntsData.length ? Math.max(...huntsData.map(h => h.id)) + 1 : 1,
      title: body.title,
      date: body.date,
      location: body.location,
      coordinates: body.coordinates,
      participants: body.participants,
      description: body.description,
      details: body.details || "",
      organizer: body.organizer || "",
      price: body.price || "0€",
      equipment: body.equipment || "",
      difficulty: body.difficulty || "Moyenne",
      type: body.type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    huntsData.push(newHunt)

    return NextResponse.json(newHunt, { status: 201 })
  } catch (err) {
    console.error("Erreur POST /api/hunts:", err)
    return NextResponse.json({ error: "Erreur interne serveur" }, { status: 500 })
  }
}
