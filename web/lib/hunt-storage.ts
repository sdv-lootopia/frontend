export interface Hunt {
    id: string
    title: string
    description: string
    organizer: string
    organizerAvatar?: string
    world: "real" | "cartographic"
    duration: string
    participants: number
    maxParticipants: number
    fee: number
    rating: number
    rewards: string[]
    image?: string
    difficulty: "Facile" | "Intermédiaire" | "Difficile"
    tags: string[]
    chatEnabled: boolean
    status: "active" | "draft" | "completed"
    createdAt: string
    steps: HuntStep[]
    maps: HuntMap[]
    digDelay: number
    digCost: number
}

export interface HuntStep {
    id: string
    title: string
    description: string
    validationType: "cache" | "passphrase" | "landmark"
    completed?: boolean
}

export interface HuntMap {
    id: string
    name: string
    style: string
    zone: string
    scale: string
}

export interface UserParticipation {
    huntId: string
    progress: number
    completedSteps: string[]
    joinedAt: string
    status: "active" | "completed" | "abandoned"
}

const HUNTS_KEY = "lootopia_hunts"
const PARTICIPATIONS_KEY = "lootopia_participations"

// Données initiales
const initialHunts: Hunt[] = [
    {
        id: "1",
        title: "Le Trésor du Château de Versailles",
        description: "Explorez les jardins secrets de Versailles et découvrez les trésors cachés de Marie-Antoinette...",
        organizer: "Château de Versailles",
        organizerAvatar: "/placeholder.svg?height=40&width=40",
        world: "real",
        duration: "2-3 heures",
        participants: 156,
        maxParticipants: 200,
        fee: 15,
        rating: 4.8,
        rewards: ["50 Couronnes", "Badge Explorateur Royal"],
        image: "/placeholder.svg?height=200&width=300",
        difficulty: "Intermédiaire",
        tags: ["Histoire", "Culture", "Patrimoine"],
        chatEnabled: true,
        status: "active",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        steps: [
            {
                id: "step1",
                title: "Le Bosquet de la Reine",
                description: "Trouvez l'arbre centenaire où Marie-Antoinette aimait se reposer",
                validationType: "landmark",
            },
            {
                id: "step2",
                title: "La Fontaine Secrète",
                description: "Résolvez l'énigme de la fontaine cachée dans les jardins",
                validationType: "passphrase",
            },
            {
                id: "step3",
                title: "Le Pavillon Mystérieux",
                description: "Découvrez le pavillon où la reine cachait ses trésors",
                validationType: "cache",
            },
        ],
        maps: [],
        digDelay: 1,
        digCost: 0,
    },
    {
        id: "2",
        title: "Mystères de la Carte Pirate",
        description: "Naviguez sur une carte interactive et résolvez les énigmes des pirates des Caraïbes...",
        organizer: "AdventureQuest",
        organizerAvatar: "/placeholder.svg?height=40&width=40",
        world: "cartographic",
        duration: "1-2 heures",
        participants: 89,
        maxParticipants: 100,
        fee: 0,
        rating: 4.6,
        rewards: ["30 Couronnes", "Artefact Boussole Dorée"],
        image: "/placeholder.svg?height=200&width=300",
        difficulty: "Facile",
        tags: ["Pirates", "Aventure", "Énigmes"],
        chatEnabled: false,
        status: "active",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        steps: [],
        maps: [
            {
                id: "map1",
                name: "Carte des Caraïbes",
                style: "retro",
                zone: "Mer des Caraïbes",
                scale: "1:100000",
            },
        ],
        digDelay: 2,
        digCost: 5,
    },
    {
        id: "3",
        title: "Les Secrets du Louvre",
        description: "Une chasse au trésor exclusive dans les couloirs du plus grand musée du monde...",
        organizer: "Musée du Louvre",
        organizerAvatar: "/placeholder.svg?height=40&width=40",
        world: "real",
        duration: "3-4 heures",
        participants: 45,
        maxParticipants: 50,
        fee: 25,
        rating: 4.9,
        rewards: ["100 Couronnes", "Artefact Mona Lisa", "Entrée VIP"],
        image: "/placeholder.svg?height=200&width=300",
        difficulty: "Difficile",
        tags: ["Art", "Culture", "Musée"],
        chatEnabled: true,
        status: "active",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        steps: [],
        maps: [],
        digDelay: 1,
        digCost: 0,
    },
]

export class HuntStorage {
    static initializeStorage() {
        if (typeof window === "undefined") return

        const existingHunts = localStorage.getItem(HUNTS_KEY)
        if (!existingHunts) {
            localStorage.setItem(HUNTS_KEY, JSON.stringify(initialHunts))
        }

        const existingParticipations = localStorage.getItem(PARTICIPATIONS_KEY)
        if (!existingParticipations) {
            localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify([]))
        }
    }

    static getAllHunts(): Hunt[] {
        if (typeof window === "undefined") return []

        const hunts = localStorage.getItem(HUNTS_KEY)
        return hunts ? JSON.parse(hunts) : []
    }

    static getHuntById(id: string): Hunt | null {
        const hunts = this.getAllHunts()
        return hunts.find((hunt) => hunt.id === id) || null
    }

    static createHunt(huntData: Omit<Hunt, "id" | "createdAt" | "participants" | "rating">): Hunt {
        const newHunt: Hunt = {
            ...huntData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            participants: 0,
            rating: 0,
        }

        const hunts = this.getAllHunts()
        hunts.push(newHunt)
        localStorage.setItem(HUNTS_KEY, JSON.stringify(hunts))

        return newHunt
    }

    static updateHunt(id: string, updates: Partial<Hunt>): Hunt | null {
        const hunts = this.getAllHunts()
        const huntIndex = hunts.findIndex((hunt) => hunt.id === id)

        if (huntIndex === -1) return null

        hunts[huntIndex] = { ...hunts[huntIndex], ...updates }
        localStorage.setItem(HUNTS_KEY, JSON.stringify(hunts))

        return hunts[huntIndex]
    }

    static deleteHunt(id: string): boolean {
        const hunts = this.getAllHunts()
        const filteredHunts = hunts.filter((hunt) => hunt.id !== id)

        if (filteredHunts.length === hunts.length) return false

        localStorage.setItem(HUNTS_KEY, JSON.stringify(filteredHunts))
        return true
    }

    static joinHunt(huntId: string): boolean {
        const hunt = this.getHuntById(huntId)
        if (!hunt || hunt.participants >= hunt.maxParticipants) return false

        // Mettre à jour le nombre de participants
        this.updateHunt(huntId, { participants: hunt.participants + 1 })

        // Ajouter la participation
        const participations = this.getUserParticipations()
        const newParticipation: UserParticipation = {
            huntId,
            progress: 0,
            completedSteps: [],
            joinedAt: new Date().toISOString(),
            status: "active",
        }

        participations.push(newParticipation)
        localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify(participations))

        return true
    }

    static leaveHunt(huntId: string): boolean {
        const hunt = this.getHuntById(huntId)
        if (!hunt) return false

        // Mettre à jour le nombre de participants
        this.updateHunt(huntId, { participants: Math.max(0, hunt.participants - 1) })

        // Supprimer la participation
        const participations = this.getUserParticipations()
        const filteredParticipations = participations.filter((p) => p.huntId !== huntId)
        localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify(filteredParticipations))

        return true
    }

    static getUserParticipations(): UserParticipation[] {
        if (typeof window === "undefined") return []

        const participations = localStorage.getItem(PARTICIPATIONS_KEY)
        return participations ? JSON.parse(participations) : []
    }

    static getUserParticipation(huntId: string): UserParticipation | null {
        const participations = this.getUserParticipations()
        return participations.find((p) => p.huntId === huntId) || null
    }

    static updateParticipation(huntId: string, updates: Partial<UserParticipation>): boolean {
        const participations = this.getUserParticipations()
        const participationIndex = participations.findIndex((p) => p.huntId === huntId)

        if (participationIndex === -1) return false

        participations[participationIndex] = { ...participations[participationIndex], ...updates }
        localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify(participations))

        return true
    }

    static getMyHunts(): Hunt[] {
        // Pour la démo, on retourne quelques chasses créées par l'utilisateur
        return this.getAllHunts().filter(
            (hunt) => hunt.organizer === "Utilisateur Actuel" || hunt.id === "4" || hunt.id === "5",
        )
    }
}

// Initialiser le storage au chargement
if (typeof window !== "undefined") {
    HuntStorage.initializeStorage()
}
