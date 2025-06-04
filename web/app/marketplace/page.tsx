"use client"

import { useState, useEffect } from "react"
import BaseLayout from "@/components/base-page"
import { Crown, Filter, Search, Clock, Gavel, Plus, TrendingUp, Eye, Users, AlertCircle } from "lucide-react"
import AuctionCard from "@/components/marketplace/card"
import CreateAuctionModal from "@/components/marketplace/create-auction-modal"
import { useInventory } from "@/contexts/inventory-context"
import { useCrownBalance } from "@/contexts/crown-balance-context"
import type { MarketplaceItem } from "@/types/marketplace"
import PageHeader from "@/components/shop/page-header"
import { CheckCircle, Info } from "lucide-react"

const INITIAL_AUCTION_ITEMS: MarketplaceItem[] = [
  {
    id: "1",
    artefact: {
      id: "art1",
      name: "Carte au Trésor Légendaire",
      description: "Une carte ancienne révélant l'emplacement de trésors perdus depuis des siècles.",
      image: "https://image.noelshack.com/fichiers/2025/23/2/1748979519-chatgpt-image-3-juin-2025-21-38-26.jpg",
      rarity: "légendaire",
      type: "carte",
    },
    seller: {
      id: "user1",
      nickname: "TreasureHunter42",
    },
    currentPrice: 850,
    startingPrice: 500,
    buyNowPrice: 1200,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    bidCount: 12,
    status: "active",
    highestBidder: {
      id: "user2",
      nickname: "GoldSeeker",
    },
  },
  {
    id: "2",
    artefact: {
      id: "art2",
      name: "Boussole Enchantée",
      description: "Cette boussole enchantée guide toujours vers le trésor le plus proche.",
      image: "https://image.noelshack.com/fichiers/2025/23/2/1748947155-chatgpt-image-3-juin-2025-12-39-09.jpg",
      rarity: "épique",
      type: "boussole",
    },
    seller: {
      id: "user3",
      nickname: "MysticExplorer",
    },
    currentPrice: 320,
    startingPrice: 200,
    buyNowPrice: 450,
    endTime: new Date(Date.now() + 45 * 60 * 1000),
    bidCount: 7,
    status: "active",
    highestBidder: {
      id: "user4",
      nickname: "CompassCollector",
    },
  },
  {
    id: "3",
    artefact: {
      id: "art3",
      name: "Clé Dorée Antique",
      description: "Une clé mystérieuse qui ouvre les coffres les plus précieux.",
      image: "https://image.noelshack.com/fichiers/2025/23/2/1748979109-chatgpt-image-3-juin-2025-21-31-44.jpg",
      rarity: "rare",
      type: "clé",
    },
    seller: {
      id: "user5",
      nickname: "KeyMaster",
    },
    currentPrice: 180,
    startingPrice: 100,
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    bidCount: 3,
    status: "active",
  },
  {
    id: "4",
    artefact: {
      id: "art4",
      name: "Amulette de Protection",
      description: "Protège son porteur des dangers lors des chasses les plus périlleuses.",
      image: "https://image.noelshack.com/fichiers/2025/23/2/1748980315-chatgpt-image-3-juin-2025-21-51-48.jpg",
      rarity: "épique",
      type: "objet",
    },
    seller: {
      id: "user6",
      nickname: "SafetyFirst",
    },
    currentPrice: 275,
    startingPrice: 150,
    buyNowPrice: 400,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    bidCount: 8,
    status: "active",
    highestBidder: {
      id: "user7",
      nickname: "ProtectionSeeker",
    },
  },
  {
    id: "5",
    artefact: {
      id: "art5",
      name: "Carte de Navigation Rare",
      description: "Révèle les chemins secrets vers les trésors cachés.",
      image: "https://image.noelshack.com/fichiers/2025/23/2/1748980067-chatgpt-image-3-juin-2025-21-47-21.jpg",
      rarity: "rare",
      type: "carte",
    },
    seller: {
      id: "user8",
      nickname: "Navigator",
    },
    currentPrice: 0,
    startingPrice: 80,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
    bidCount: 0,
    status: "active",
  },
  {
    id: "6",
    artefact: {
      id: "art6",
      name: "Détecteur de Métaux Enchanté",
      description: "Augmente drastiquement les chances de trouver des objets précieux.",
      image: "https://image.noelshack.com/fichiers/2025/23/2/1748980846-chatgpt-image-3-juin-2025-22-00-44.jpg",
      rarity: "légendaire",
      type: "objet",
    },
    seller: {
      id: "user9",
      nickname: "MetalHunter",
    },
    currentPrice: 1150,
    startingPrice: 800,
    endTime: new Date(Date.now() + 30 * 60 * 1000),
    bidCount: 15,
    status: "active",
    highestBidder: {
      id: "user10",
      nickname: "TechCollector",
    },
  },
  {
    id: "7",
    artefact: {
      id: "art7",
      name: "Cristal de Vision",
      description: "Permet de voir à travers les illusions et révèle les passages cachés.",
      image: "https://image.noelshack.com/fichiers/2025/23/2/1748979625-chatgpt-image-3-juin-2025-21-40-22.jpg",
      rarity: "épique",
      type: "objet",
    },
    seller: {
      id: "user11",
      nickname: "CrystalMage",
    },
    currentPrice: 0,
    startingPrice: 250,
    buyNowPrice: 380,
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    bidCount: 0,
    status: "active",
  },
  {
    id: "8",
    artefact: {
      id: "art8",
      name: "Parchemin de Téléportation",
      description: "Permet de se téléporter instantanément vers un point de repère connu.",
      image: "https://image.noelshack.com/fichiers/2025/23/2/1748978946-chatgpt-image-3-juin-2025-21-29-03.jpg",
      rarity: "rare",
      type: "autre",
    },
    seller: {
      id: "user12",
      nickname: "ScrollMaster",
    },
    currentPrice: 95,
    startingPrice: 60,
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    bidCount: 2,
    status: "active",
    highestBidder: {
      id: "user13",
      nickname: "FastTravel",
    },
  },
]

const RARITY_FILTERS = [
  { id: "all", name: "Toutes les raretés" },
  { id: "commun", name: "Commun" },
  { id: "rare", name: "Rare" },
  { id: "épique", name: "Épique" },
  { id: "légendaire", name: "Légendaire" },
]

const TYPE_FILTERS = [
  { id: "all", name: "Tous les types" },
  { id: "carte", name: "Cartes" },
  { id: "objet", name: "Objets" },
  { id: "clé", name: "Clés" },
  { id: "boussole", name: "Boussoles" },
  { id: "autre", name: "Autres" },
]

const SORT_OPTIONS = [
  { id: "ending_soon", name: "Se termine bientôt" },
  { id: "price_low", name: "Prix croissant" },
  { id: "price_high", name: "Prix décroissant" },
  { id: "most_bids", name: "Plus d'enchères" },
  { id: "newest", name: "Plus récent" },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRarity, setSelectedRarity] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("ending_soon")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [auctionItems, setAuctionItems] = useState<MarketplaceItem[]>([])
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const { addItem } = useInventory()
  const { balance, spendCrowns } = useCrownBalance()

  useEffect(() => {
    document.title = "Hôtel des ventes - Lootopia"
  }, [])
  useEffect(() => {
    try {
      setAuctionItems(INITIAL_AUCTION_ITEMS)

      localStorage.setItem("lootopia-auctions", JSON.stringify(INITIAL_AUCTION_ITEMS))
    } catch (error) {
      console.error("Erreur lors du chargement des enchères:", error)
      setAuctionItems(INITIAL_AUCTION_ITEMS)
    }
  }, [])

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleBid = (auctionId: string, bidAmount: number) => {
    if (bidAmount > balance) {
      showNotification("error", "Solde insuffisant pour cette enchère")
      return
    }

    const success = spendCrowns(bidAmount, `Enchère sur ${auctionItems.find((a) => a.id === auctionId)?.artefact.name}`)

    if (success) {
      setAuctionItems((prev) =>
        prev.map((auction) => {
          if (auction.id === auctionId) {
            return {
              ...auction,
              currentPrice: bidAmount,
              bidCount: auction.bidCount + 1,
              highestBidder: {
                id: "current_user",
                nickname: "Vous",
              },
            }
          }
          return auction
        }),
      )
      showNotification("success", "Enchère placée avec succès!")
    } else {
      showNotification("error", "Erreur lors de l'enchère")
    }
  }

  const handleBuyNow = (auctionId: string) => {
    const auction = auctionItems.find((a) => a.id === auctionId)
    if (!auction?.buyNowPrice) return

    if (auction.buyNowPrice > balance) {
      showNotification("error", "Solde insuffisant pour cet achat")
      return
    }

    const success = spendCrowns(auction.buyNowPrice, `Achat immédiat: ${auction.artefact.name}`)

    if (success) {
      addItem({
        id: `inv_${Date.now()}`,
        artefact: auction.artefact,
        quantity: 1,
        acquiredDate: new Date(),
        source: "achat",
        isOnSale: false,
      })

      setAuctionItems((prev) => prev.filter((a) => a.id !== auctionId))

      showNotification("success", `${auction.artefact.name} acheté avec succès!`)
    } else {
      showNotification("error", "Erreur lors de l'achat")
    }
  }

  const handleCreateAuction = (auctionData: any) => {
    const newAuction: MarketplaceItem = {
      id: `auction_${Date.now()}`,
      artefact: auctionData.artefact,
      seller: {
        id: "current_user",
        nickname: "Vous",
      },
      currentPrice: 0,
      startingPrice: auctionData.startingPrice,
      buyNowPrice: auctionData.buyNowPrice,
      endTime: auctionData.endTime,
      bidCount: 0,
      status: "active",
    }

    setAuctionItems((prev) => [newAuction, ...prev])
    showNotification("success", "Enchère créée avec succès!")
  }

  const filteredAndSortedItems = auctionItems
    .filter((item) => {
      const matchesSearch =
        item.artefact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.artefact.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.seller.nickname.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRarity = selectedRarity === "all" || item.artefact.rarity === selectedRarity
      const matchesType = selectedType === "all" || item.artefact.type === selectedType
      const isActive = item.status === "active" && item.endTime > new Date()
      return matchesSearch && matchesRarity && matchesType && isActive
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "ending_soon":
          return a.endTime.getTime() - b.endTime.getTime()
        case "price_low":
          return (a.currentPrice || a.startingPrice) - (b.currentPrice || b.startingPrice)
        case "price_high":
          return (b.currentPrice || b.startingPrice) - (a.currentPrice || a.startingPrice)
        case "most_bids":
          return b.bidCount - a.bidCount
        case "newest":
          return b.endTime.getTime() - a.endTime.getTime()
        default:
          return 0
      }
    })

  const totalActiveAuctions = auctionItems.filter(
    (item) => item.status === "active" && item.endTime > new Date(),
  ).length
  const totalBids = auctionItems.reduce((sum, item) => sum + item.bidCount, 0)
  const averagePrice = Math.round(
    auctionItems.reduce((sum, item) => sum + (item.currentPrice || item.startingPrice), 0) /
    Math.max(auctionItems.length, 1),
  )

  console.log("Nombre d'enchères chargées:", auctionItems.length)
  console.log("Nombre d'enchères filtrées:", filteredAndSortedItems.length)
  console.log("Enchères actives:", totalActiveAuctions)

  return (
    <BaseLayout>
      <div className="mx-auto max-w-7xl px-8 py-8">
        <div className="container mx-auto px-4">
          {notification && (
            <div
              className={`fixed top-20 right-4 z-50 rounded-lg px-4 py-3 shadow-lg ${notification.type === "success"
                ? "bg-green-100 text-white"
                : notification.type === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-200 text-white"
                }`}
            >
              <div className="flex items-center">
                {notification.type === "success" ? (
                  <CheckCircle className="mr-2 h-4 w-4" />
                ) : notification.type === "error" ? (
                  <AlertCircle className="mr-2 h-4 w-4" />
                ) : (
                  <Info className="mr-2 h-4 w-4" />
                )}
                {notification.message}
              </div>
            </div>
          )}

          <div className="space-y-4 pb-4">
            <PageHeader
              title="Hôtel des Ventes"
              description="Découvrez et enchérissez sur des artefacts rares mis en vente par d'autres joueurs. Vendez vos propres
                            trésors et participez à l'économie dynamique de Lootopia."
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center">
                  <Gavel className="mr-2 h-5 w-5 text-blue-200" />
                  <div>
                    <p className="text-sm text-blue-100">Enchères actives</p>
                    <p className="text-xl font-bold text-sand-500">{totalActiveAuctions}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-100" />
                  <div>
                    <p className="text-sm text-blue-100">Total des enchères</p>
                    <p className="text-xl font-bold text-sand-500">{totalBids}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center">
                  <Crown className="mr-2 h-5 w-5 text-blue-200" />
                  <div>
                    <p className="text-sm text-blue-100">Prix moyen</p>
                    <p className="text-xl font-bold text-sand-500">{averagePrice}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-green-200" />
                  <div>
                    <p className="text-sm text-blue-100">Votre solde</p>
                    <div className="flex items-center">
                      <Crown className="mr-1 h-4 w-4 text-blue-200" />
                      <p className="text-xl font-bold text-blue-200">{balance.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center rounded-lg bg-white px-2 shadow-sm">
                <Filter className="h-4 w-4 text-blue-100" />
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="rounded-lg border-0 bg-transparent py-2 pl-2 pr-8 text-sm text-sand-500 focus:ring-0"
                >
                  {RARITY_FILTERS.map((filter) => (
                    <option key={filter.id} value={filter.id}>
                      {filter.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center rounded-lg bg-white px-2 shadow-sm">
                <Filter className="h-4 w-4 text-blue-100" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="rounded-lg border-0 bg-transparent py-2 pl-2 pr-8 text-sm text-sand-500 focus:ring-0"
                >
                  {TYPE_FILTERS.map((filter) => (
                    <option key={filter.id} value={filter.id}>
                      {filter.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center rounded-lg bg-white px-2 shadow-sm">
                <Clock className="h-4 w-4 text-blue-100" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border-0 bg-transparent py-2 pl-2 pr-8 text-sm text-sand-500 focus:ring-0"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-blue-100" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un artefact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border-0 bg-white py-2 pl-10 pr-4 text-sm text-sand-500 shadow-sm focus:ring-0 sm:w-64"
                />
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center rounded-lg bg-blue-200 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-300"
              >
                <Plus className="mr-2 h-4 w-4" />
                Vendre un artefact
              </button>
            </div>
          </div>

          {filteredAndSortedItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedItems.map((item) => (
                <AuctionCard
                  key={item.id}
                  auction={item}
                  onBid={handleBid}
                  onBuyNow={handleBuyNow}
                  userBalance={balance}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <Eye className="mx-auto mb-4 h-16 w-16 text-gray-200" />
              <h2 className="mb-2 text-xl font-medium text-sand-500">Aucune enchère trouvée</h2>
              <p className="text-blue-100">Essayez de modifier vos critères de recherche ou revenez plus tard.</p>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateAuctionModal onClose={() => setShowCreateModal(false)} onCreateAuction={handleCreateAuction} />
      )}
    </BaseLayout>
  )
}
