"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, Calendar, MapPin } from "lucide-react"
import { HuntStorage, type UserCache, type Cache } from "@/lib/hunt-storage"

interface CacheInventoryProps {
  huntId: string
}

export function CacheInventory({ huntId }: CacheInventoryProps) {
  const [userCaches, setUserCaches] = useState<(UserCache & { cache: Cache })[]>([])

  useEffect(() => {
    const caches = HuntStorage.getUserCachesByHunt(huntId)
    const cachesWithDetails = caches
      .map((userCache) => {
        const cache = HuntStorage.getAllCaches().find((c) => c.id === userCache.cacheId)
        return cache ? { ...userCache, cache } : null
      })
      .filter(Boolean) as (UserCache & { cache: Cache })[]

    setUserCaches(cachesWithDetails)
  }, [huntId])

  if (userCaches.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Gift className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-400">Aucun cache découvert pour le moment.</p>
          <p className="text-sm text-gray-400 mt-2">Explorez et creusez pour trouver des trésors !</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="h-5 w-5 text-sand-400" />
        <h3 className="text-lg font-semibold">Mes Caches Découverts</h3>
        <Badge variant="secondary">{userCaches.length}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userCaches.map((userCache) => (
          <Card key={userCache.cacheId} className="border-green-200 bg-green-50/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    {userCache.cache.name}
                  </CardTitle>
                  <CardDescription>{userCache.cache.description}</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-600 border-green-200">{userCache.cache.difficulty}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Découvert le {new Date(userCache.discoveredAt).toLocaleDateString()}</span>
              </div>

              {userCache.reward && (
                <div className="bg-sand-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Gift className="h-4 w-4 text-sand-500" />
                    <span className="text-sm font-medium">Récompense obtenue</span>
                  </div>
                  <p className="text-sm text-sand-600">{userCache.reward}</p>
                </div>
              )}

              <div className="text-xs text-gray-400 font-mono">
                Position: {userCache.cache.latitude.toFixed(6)}, {userCache.cache.longitude.toFixed(6)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
