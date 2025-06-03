"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react"
import { HuntStorage, type Cache } from "@/lib/hunt-storage"
import { Badge } from "@/components/ui/badge"

interface MapModalProps {
  isOpen: boolean
  onClose: () => void
  huntId?: string
}

export function MapModal({ isOpen, onClose, huntId }: MapModalProps) {
  const [zoom, setZoom] = useState(15)
  const [caches, setCaches] = useState<Cache[]>([])

  useEffect(() => {
    if (huntId) {
      const huntCaches = HuntStorage.getCachesByHuntId(huntId)
      setCaches(huntCaches)
    }
  }, [huntId])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Carte Interactive
            {caches.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {caches.filter((c) => !c.discovered).length} caches à découvrir
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 relative">
          {/* Simulation d'une carte réelle avec OpenStreetMap */}
          <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden relative">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.2945%2C48.8566%2C2.3708%2C48.8848&layer=mapnik&marker=48.8707%2C2.3326"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="Carte interactive"
              className="rounded-lg"
            />

            {/* Affichage des caches sur la carte */}
            {caches.map((cache) => (
              <div
                key={cache.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                  cache.discovered
                    ? "bg-green-500"
                    : cache.difficulty === "Facile"
                      ? "bg-green-400"
                      : cache.difficulty === "Intermédiaire"
                        ? "bg-sand-400"
                        : "bg-red-400"
                }`}
                style={{
                  left: `${((cache.longitude - 2.2945) / (2.3708 - 2.2945)) * 100}%`,
                  top: `${((48.8848 - cache.latitude) / (48.8848 - 48.8566)) * 100}%`,
                }}
                title={`${cache.name} - ${cache.discovered ? "Découvert" : cache.difficulty}`}
              >
                {cache.discovered && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            ))}

            {/* Contrôles de la carte */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                size="icon"
                variant="outline"
                className="bg-white/90 hover:bg-white"
                onClick={() => setZoom(Math.min(zoom + 1, 20))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="bg-white/90 hover:bg-white"
                onClick={() => setZoom(Math.max(zoom - 1, 1))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Légende des caches */}
            {caches.length > 0 && (
              <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium mb-2">Légende des caches</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                    <span>Facile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-sand-400 rounded-full border border-white"></div>
                    <span>Intermédiaire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full border border-white"></div>
                    <span>Difficile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-white flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <span>Découvert</span>
                  </div>
                </div>
              </div>
            )}

            {/* Indicateur de position */}
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-sm">
                <Navigation className="h-4 w-4 text-blue-500" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button className="bg-blue-400 hover:bg-blue-500 text-white">Centrer sur ma position</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
