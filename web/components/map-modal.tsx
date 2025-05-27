"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react"

interface MapModalProps {
    isOpen: boolean
    onClose: () => void
}

export function MapModal({ isOpen, onClose }: MapModalProps) {
    const [zoom, setZoom] = useState(15)
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

    useEffect(() => {
        if (isOpen && !coords) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCoords({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    })
                },
                (err) => {
                    console.error("Erreur géolocalisation :", err)
                }
            )
        }
    }, [isOpen, coords])

    const getIframeSrc = () => {
        const lat = coords?.lat ?? 48.8707
        const lng = coords?.lng ?? 2.3326
        return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}&zoom=${zoom}`
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Carte Interactive
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 relative">
                    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden relative">
                        <iframe
                            src={getIframeSrc()}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            title="Carte interactive"
                            className="rounded-lg"
                        />

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

                        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm">
                            <div className="flex items-center gap-2 text-sm">
                                <Navigation className="h-4 w-4 text-blue-500" />
                                <span>
                                    {coords
                                        ? `Lat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)}`
                                        : "Position inconnue"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button
                        className="bg-blue-400 hover:bg-blue-500 text-white"
                        onClick={() => {
                            setCoords(null) // force le refresh de la position
                        }}
                    >
                        Centrer sur ma position
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
