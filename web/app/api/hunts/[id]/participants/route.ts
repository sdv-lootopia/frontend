// app/api/hunts/[id]/participants/route.ts
"use server"

import { NextResponse } from "next/server"
import type { Hunt } from "../../route"

const huntsData: Hunt[] = []

interface Participant {
  id: number
  huntId: number
  userId: string
  userName: string
  userEmail: string
  registrationDate: string
  status: "pending" | "confirmed" | "cancelled"
}

const participantsData: Participant[] = []

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const huntId = Number(id)
  const hunt = huntsData.find((h) => h.id === huntId)
  if (!hunt) return NextResponse.json({ error: "Chasse au trésor non trouvée" }, { status: 404 })
  const participants = participantsData.filter((p) => p.huntId === huntId)
  return NextResponse.json(participants)
}

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const huntId = Number(id)
    const hunt = huntsData.find((h) => h.id === huntId)
    if (!hunt) return NextResponse.json({ error: "Chasse non trouvée" }, { status: 404 })

    const { userId, userName, userEmail } = await req.json()
    if (!userId || !userName || !userEmail)
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })

    const exists = participantsData.find(p => p.huntId === huntId && p.userId === userId)
    if (exists) return NextResponse.json({ error: "Déjà inscrit" }, { status: 400 })

    const confirmed = participantsData.filter(p => p.huntId === huntId && p.status === "confirmed").length
    if (confirmed >= hunt.participants) return NextResponse.json({ error: "Complet" }, { status: 400 })

    const newParticipant: Participant = {
      id: participantsData.length + 1,
      huntId,
      userId,
      userName,
      userEmail,
      registrationDate: new Date().toISOString(),
      status: "pending"
    }

    participantsData.push(newParticipant)
    return NextResponse.json(newParticipant, { status: 201 })
  } catch (e) {
    console.error("Erreur POST /participants :", e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
