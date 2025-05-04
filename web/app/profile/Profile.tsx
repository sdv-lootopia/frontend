"use client"

import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil } from "lucide-react"
import BasePage from "@/components/base-page"
import { useUser } from "@/lib/useUser"
import { useEffect } from "react"

export default function Profile() {
    const { user } = useUser();

    useEffect(() => {
        document.title = "Profil - Lootopia";
    }, [])

    return (
        <BasePage>
            <div className="relative h-40">
                <div className="absolute top-0 h-40 overflow-hidden z-0">
                    <Image
                        src={"/map.png"}
                        alt={"oldmap"}
                        width={10000}
                        height={128}
                    />
                </div>
                <div className="absolute top-20 h-20 bg-gradient-to-t from-[#96C4C4] to-transparent z-10 w-full"></div>

                <div className="absolute -bottom-16 px-8 w-full flex flex-row items-center gap-4 z-20">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white bg-white">
                        {user.profilePicture && <Image
                            src={user.profilePicture}
                            alt={`photo de profil de ${user.profilePicture}`}
                            width={128}
                            height={128}
                            className="object-cover"
                        />}
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold">{user.nickname}</h2>
                            <button className="text-gray-500 hover:text-gray-700">
                                <Pencil size={18} />
                            </button>
                        </div>
                        <p className="text-gray-600 mt-1">{user.biography}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold">{user.nickname}</h2>
            </div>

            <div className="mt-20 px-8">
                <Tabs defaultValue="tableau-chasse" className="mt-8">
                    <div className="flex w-full justify-between">
                        <TabsList className="mb-4">
                            <TabsTrigger value="tableau-chasse">Tableau de Chasse</TabsTrigger>
                            <TabsTrigger value="inventaire">Inventaire</TabsTrigger>
                            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
                        </TabsList>
                        <div className="text-right">
                            <p className="text-xl font-bold">290 trophées</p>
                            <p className="text-gray-600">25 chasses complétées</p>
                        </div>
                    </div>
                    <TabsContent value="tableau-chasse" className="space-y-6">
                        <div className="p-4 text-center text-gray-500">{"Tableau de chasse à venir..."}</div>
                        {/* <CompletedHunts /> */}
                    </TabsContent>
                    <TabsContent value="inventaire">
                        <div className="p-4 text-center text-gray-500">{"Contenu de l'inventaire à venir..."}</div>
                    </TabsContent>
                    <TabsContent value="statistiques">
                        <div className="p-4 text-center text-gray-500">{"Statistiques détaillées à venir..."}</div>
                    </TabsContent>
                </Tabs>
            </div>
        </BasePage>
    )
}
