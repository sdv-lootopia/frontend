"use client"

import { useEffect, useState } from "react"

interface Participant {
  id: number
  userName: string
  userEmail: string
  registrationDate: string
  status: string
}

export default function ParticipantsList({ huntId }: { huntId: number }) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/hunts/${huntId}/participants`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement")
        return res.json()
      })
      .then(setParticipants)
      .catch((err) => setError(err.message))
  }, [huntId])

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-[#211E12]">Participants</h3>
      {participants.length === 0 ? (
        <p className="text-[#211E12]/70">Aucun participant pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {participants.map((p) => (
            <li key={p.id} className="border p-3 rounded text-[#211E12]/90 bg-white shadow-sm">
              <strong>{p.userName}</strong> – {p.userEmail}
              <br />
              Inscrit le : {new Date(p.registrationDate).toLocaleString()}
              <br />
              Statut : {p.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
