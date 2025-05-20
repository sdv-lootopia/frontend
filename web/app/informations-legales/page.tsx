"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, Shield, Scroll } from "lucide-react"
import BasePage from "@/components/base-page"
import MentionsLegales from "./Mentions"
import Cgu from "./Cgu"
import Confidentialite from "./Confidentialite"

const tabHashMap: Record<string, string> = {
    mentions: "mentions-legales",
    cgu: "cgu",
    confidentialite: "confidentialite",
}

const hashTabMap: Record<string, string> = {
    "mentions-legales": "mentions",
    cgu: "cgu",
    confidentialite: "confidentialite",
}

export default function InfosPage() {
    const [activeTab, setActiveTab] = useState("mentions")

    // Gestion du hash dans l'URL
    useEffect(() => {
        // Fonction pour extraire le hash de l'URL (sans le #)
        const getHashFromUrl = () => {
            if (typeof window !== "undefined") {
                const hash = window.location.hash.replace("#", "")
                return hash
            }
            return ""
        }

        // Fonction pour mettre à jour l'onglet actif en fonction du hash
        const handleHashChange = () => {
            const hash = getHashFromUrl()
            if (hash && hashTabMap[hash]) {
                setActiveTab(hashTabMap[hash])
            }
        }

        // Vérifier le hash initial
        handleHashChange()

        // Écouter les changements de hash
        window.addEventListener("hashchange", handleHashChange)

        // Nettoyage
        return () => {
            window.removeEventListener("hashchange", handleHashChange)
        }
    }, [])

    // Fonction pour gérer le changement d'onglet
    const handleTabChange = (value: string) => {
        setActiveTab(value)
        // Mettre à jour le hash dans l'URL
        if (typeof window !== "undefined") {
            window.location.hash = tabHashMap[value]
        }
    }

    return (
        <BasePage>
            <div className="container mx-auto py-10 p-4 max-w-6xl">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold mb-2 text-[#35426D] dark:text-[#A4AED9]">Informations Légales</h1>
                    <div className="h-1 w-24 bg-[#7687C6] mx-auto rounded-full"></div>
                </div>

                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8 bg-[#CECEC9]/50 dark:bg-[#3D3D3B]/50 p-1 rounded-xl">
                        <TabsTrigger
                            value="mentions"
                            className="flex items-center gap-2 data-[state=active]:bg-[#7687C6] data-[state=active]:text-white rounded-lg transition-all"
                        >
                            <Scroll className="h-4 w-4" />
                            <span className="hidden sm:inline">Mentions Légales</span>
                            <span className="sm:hidden">Mentions</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="cgu"
                            className="flex items-center gap-2 data-[state=active]:bg-[#7687C6] data-[state=active]:text-white rounded-lg transition-all"
                        >
                            <Book className="h-4 w-4" />
                            <span className="hidden sm:inline">{"Conditions d'Utilisation"}</span>
                            <span className="sm:hidden">CGU</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="confidentialite"
                            className="flex items-center gap-2 data-[state=active]:bg-[#7687C6] data-[state=active]:text-white rounded-lg transition-all"
                        >
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">Politique de Confidentialité</span>
                            <span className="sm:hidden">Confidentialité</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="mentions">
                        <MentionsLegales />
                    </TabsContent>

                    <TabsContent value="cgu">
                        <Cgu />
                    </TabsContent>

                    <TabsContent value="confidentialite">
                        <Confidentialite />
                    </TabsContent>
                </Tabs>
            </div>
        </BasePage>
    )
}
