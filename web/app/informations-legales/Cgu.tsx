"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Book } from "lucide-react"

export default function Cgu() {
    return (
        <Card className="border-none shadow-lg bg-white/80 dark:bg-slate/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r py-4 from-blue-50 to-blue-200 dark:from-slate-600 dark:to-blue-600 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-400 dark:text-blue-50">
                    <Book className="h-5 w-5" />
                    {"Conditions Générales d'Utilisation (CGU)"}
                </CardTitle>
                <CardDescription className="text-blue-300 dark:text-blue-200">
                    {"Règles encadrant l'utilisation de la plateforme Lootopia"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-blue-400 dark:text-blue-50 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-200"></div>
                        1. Objet
                    </h3>
                    <p className="ml-4 text-blue-400 dark:text-blue-200">
                        {"Les présentes CGU encadrent l'utilisation de la plateforme Lootopia."}
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-blue-400 dark:text-blue-50 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-200"></div>
                        2. Inscription et accès
                    </h3>
                    <div className="ml-4 text-blue-400 dark:text-blue-200">
                        <p>Deux types de comptes existent :</p>
                        <ul className="list-none pl-4 space-y-1 mt-2">
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue dark:bg-blue-200"></div>
                                Commun : participation aux chasses.
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue dark:bg-blue-200"></div>
                                Partenaire : création et gestion de chasses personnalisées.
                            </li>
                        </ul>
                        <p className="mt-2">{"L'inscription nécessite une adresse email valide et un mot de passe sécurisé."}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-blue-400 dark:text-blue-50 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-200"></div>
                        3. Fonctionnalités
                    </h3>
                    <div className="ml-4 text-blue-400 dark:text-blue-200">
                        <p>Les utilisateurs peuvent :</p>
                        <ul className="list-none pl-4 space-y-1 mt-2">
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue dark:bg-blue-200"></div>
                                Participer à des chasses virtuelles ou semi-virtuelles.
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue dark:bg-blue-200"></div>
                                Créer des chasses (organisateurs).
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue dark:bg-blue-200"></div>
                                Gagner ou acheter des Couronnes, artefacts, ou objets.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-blue-400 dark:text-blue-50 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-200"></div>
                        4. Obligations des utilisateurs
                    </h3>
                    <p className="ml-4 text-blue-400 dark:text-blue-200">
                        Interdiction de tricher, frauder, diffuser du contenu inapproprié, ou perturber les autres utilisateurs.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-blue-400 dark:text-blue-50 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-200"></div>
                        5. Responsabilité
                    </h3>
                    <p className="ml-4 text-blue-400 dark:text-blue-200">
                        Lootopia ne peut être tenue responsable en cas de perte de données ou dysfonctionnements techniques.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-blue-400 dark:text-blue-50 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-200"></div>
                        6. Résiliation
                    </h3>
                    <p className="ml-4 text-blue-400 dark:text-blue-200">
                        Tout manquement aux CGU peut entraîner la suspension ou suppression du compte.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
