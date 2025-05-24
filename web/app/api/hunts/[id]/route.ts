"use server"

import { NextResponse } from "next/server"
import type { Hunt } from "../route"

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

export async function GET(_: Request, context: { params: { id: string } }) {
  const huntId = Number(context.params.id)
  if (isNaN(huntId)) return NextResponse.json({ error: "ID invalide" }, { status: 400 })

  const hunt = huntsData.find(h => h.id === huntId)
  return hunt
    ? NextResponse.json(hunt)
    : NextResponse.json({ error: "Chasse non trouvée" }, { status: 404 })
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const huntId = Number(context.params.id)
    if (isNaN(huntId)) return NextResponse.json({ error: "ID invalide" }, { status: 400 })

    const body = await request.json()
    const index = huntsData.findIndex(h => h.id === huntId)
    if (index === -1) return NextResponse.json({ error: "Chasse non trouvée" }, { status: 404 })

    huntsData[index] = {
      ...huntsData[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(huntsData[index])
  } catch (err) {
    console.error("Erreur PUT :", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const huntId = Number(context.params.id)
  if (isNaN(huntId)) return NextResponse.json({ error: "ID invalide" }, { status: 400 })

  const index = huntsData.findIndex(h => h.id === huntId)
  if (index === -1) return NextResponse.json({ error: "Chasse non trouvée" }, { status: 404 })

  huntsData.splice(index, 1)
  return NextResponse.json({ success: true })
}
