"use client"

import type React from "react"
import type { FormikProps } from "formik"

import { useEffect, useRef, useState } from "react"
import { Users, Globe, Handshake, HeadphonesIcon, Calendar } from "lucide-react"
import { LootopiaLogo } from "@/components/LootopiaLogo"
import { RegisterForm } from "./RegisterForm"
import { Card } from "./Card"

export default function PartenaireInscription() {
    const [currentTab, setCurrentTab] = useState(1)
    const totalTabs = 3
    const formikRef = useRef<FormikProps<any>>(null)

    const nextTab = () => {
        if (currentTab < totalTabs) {
            setCurrentTab(currentTab + 1)
        }
    }

    const prevTab = () => {
        if (currentTab > 1) {
            setCurrentTab(currentTab - 1)
        }
    }

    useEffect(() => {
        document.title = "Inscription - Partenaire";
    }, [])

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white p-6 shadow-xl md:p-8">
                <div className="mb-8 flex flex-col items-center justify-between border-b border-gray-200 pb-6 md:flex-row">
                    <div className="flex items-center">
                        <LootopiaLogo className="mr-4" />
                        <div>
                            <h1 className="text-3xl font-bold">Inscription Partenaire</h1>
                            <p className="text-gray-600">Bienvenue sur Lootopia !</p>
                        </div>
                    </div>

                    <div className="mt-4 flex w-full max-w-xs items-center justify-between md:mt-0 md:w-auto">
                        {Array.from({ length: totalTabs }).map((_, index) => (
                            <div key={index} className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setCurrentTab(index + 1)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors
                                ${index + 1 === currentTab
                                            ? "bg-indigo-500 text-white"
                                            : index + 1 < currentTab
                                                ? "bg-indigo-100 text-indigo-500 hover:bg-indigo-200"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                                {index < totalTabs - 1 && (
                                    <div className={`mx-2 h-1 w-8 ${index + 1 < currentTab ? "bg-indigo-500" : "bg-gray-200"}`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    {currentTab === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl text-center font-semibold text-gray-900">Avantages du partenariat</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <Card
                                    icon={<Users className="h-6 w-6 text-indigo-500" />}
                                    title="Accès à l'univers Lootopia"
                                    description="Intégrez votre projet dans un monde immersif, interactif et narratif"
                                />
                                <Card
                                    icon={<Globe className="h-6 w-6 text-indigo-500" />}
                                    title="Visibilité"
                                    description="Bénéficiez d'une diffusion auprès de notre base de joueurs engagés"
                                />
                                <Card
                                    icon={<Handshake className="h-6 w-6 text-indigo-500" />}
                                    title="Collaborations"
                                    description="Opportunités de collaborations exclusives"
                                />
                                <Card
                                    icon={<HeadphonesIcon className="h-6 w-6 text-indigo-500" />}
                                    title="Chasses personnalisées"
                                    description="Concevez des quêtes originales avec vos propres récompenses, thèmes et mécaniques"
                                />
                                <Card
                                    icon={<Calendar className="h-6 w-6 text-indigo-500" />}
                                    title="Événements"
                                    description="Faites vivre vos temps forts dans Lootopia : lancement, concours, etc."
                                />
                            </div>
                        </div>
                    )}

                    <RegisterForm currentTab={currentTab} formikRef={formikRef} />

                    {currentTab === 3 && (
                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                onClick={async () => {
                                    if (!formikRef.current) return

                                    const champsEtape2 = [
                                        "lastName", "firstName", "companyName", "siret",
                                        "phone", "email", "street", "city", "postcode", "country"
                                    ]

                                    const errors = await formikRef.current.validateForm()

                                    const hasStep2Errors = champsEtape2.some((champ) => errors[champ])

                                    if (hasStep2Errors) {
                                        setCurrentTab(2)

                                        const fieldsToMarkTouched = champsEtape2.reduce((acc, champ) => {
                                            acc[champ] = true
                                            return acc
                                        }, {} as Record<string, boolean>)

                                        formikRef.current.setTouched(fieldsToMarkTouched)
                                    } else {
                                        formikRef.current.handleSubmit()
                                    }
                                }}
                                className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600"
                            >
                                Envoyer la demande
                            </button>
                        </div>
                    )}

                </div>

                <div className="flex justify-between border-t border-gray-200 pt-6">
                    <button
                        type="button"
                        onClick={prevTab}
                        className={`rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-indigo-500 shadow-sm hover:bg-gray-50 ${currentTab === 1 ? "invisible" : ""}`}
                    >
                        Précédent
                    </button>

                    <button
                        type="button"
                        onClick={nextTab}
                        className={`rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 ${currentTab === 3 ? "invisible" : ""}`}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    )
}