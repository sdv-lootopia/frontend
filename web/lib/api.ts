import type { Hunt } from "@/app/api/hunts/route"

// Fonction pour récupérer toutes les chasses
export async function getHunts(filters?: {
  type?: string
  difficulty?: string
  afterDate?: string
  region?: string
}) {
  let url = "/api/hunts"

  // Ajouter les filtres à l'URL si nécessaire
  if (filters) {
    const params = new URLSearchParams()

    if (filters.type) params.append("type", filters.type)
    if (filters.difficulty) params.append("difficulty", filters.difficulty)
    if (filters.afterDate) params.append("afterDate", filters.afterDate)
    if (filters.region) params.append("region", filters.region)

    const queryString = params.toString()
    if (queryString) {
      url += `?${queryString}`
    }
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des chasses")
  }

  return response.json() as Promise<Hunt[]>
}

// Fonction pour récupérer une chasse par son ID
export async function getHunt(id: number) {
  const response = await fetch(`/api/hunts/${id}`)

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de la chasse")
  }

  return response.json() as Promise<Hunt>
}

// Fonction pour créer une nouvelle chasse
export async function createHunt(hunt: Omit<Hunt, "id" | "createdAt" | "updatedAt">) {
  const response = await fetch("/api/hunts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hunt),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erreur lors de la création de la chasse")
  }

  return response.json() as Promise<Hunt>
}

// Fonction pour mettre à jour une chasse
export async function updateHunt(id: number, hunt: Partial<Hunt>) {
  const response = await fetch(`/api/hunts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hunt),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erreur lors de la mise à jour de la chasse")
  }

  return response.json() as Promise<Hunt>
}

// Fonction pour supprimer une chasse
export async function deleteHunt(id: number) {
  const response = await fetch(`/api/hunts/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erreur lors de la suppression de la chasse")
  }

  return response.json()
}

// Fonction pour s'inscrire à une chasse
export async function registerForHunt(
  huntId: number,
  userData: {
    userId: string
    userName: string
    userEmail: string
  },
) {
  const response = await fetch(`/api/hunts/${huntId}/participants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erreur lors de l'inscription à la chasse")
  }

  return response.json()
}

// Fonction pour récupérer les participants d'une chasse
export async function getHuntParticipants(huntId: number) {
  const response = await fetch(`/api/hunts/${huntId}/participants`)

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des participants")
  }

  return response.json()
}