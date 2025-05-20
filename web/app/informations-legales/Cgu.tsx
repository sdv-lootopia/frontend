"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";

export default function Cgu() {
    return (
        <Card className="border-none shadow-lg bg-white/80 dark:bg-[#1B233E]/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r py-4 from-[#D2D6EC] to-[#A4AED9] dark:from-[#1B233E] dark:to-[#35426D] rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-[#35426D] dark:text-[#A4AED9]">
                    <Book className="h-5 w-5" />
                    {"Conditions Générales d'Utilisation (CGU)"}
                </CardTitle>
                <CardDescription className="text-[#5063A0] dark:text-[#7687C6]">
                    {"Règles encadrant l'utilisation de la plateforme Lootopia"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        1. Objet
                    </h3>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        {"Les présentes CGU encadrent l'utilisation de la plateforme Lootopia."}
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        2. Inscription et accès
                    </h3>
                    <div className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        <p>Deux types de comptes existent :</p>
                        <ul className="list-none pl-4 space-y-1 mt-2">
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                                Commun : participation aux chasses.
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                                Partenaire : création et gestion de chasses personnalisées.
                            </li>
                        </ul>
                        <p className="mt-2">
                            {"L'inscription nécessite une adresse email valide et un mot de passe sécurisé."}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        3. Fonctionnalités
                    </h3>
                    <div className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        <p>Les utilisateurs peuvent :</p>
                        <ul className="list-none pl-4 space-y-1 mt-2">
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                                Participer à des chasses virtuelles ou semi-virtuelles.
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                                Créer des chasses (organisateurs).
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                                Gagner ou acheter des Couronnes, artefacts, ou objets.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        4. Obligations des utilisateurs
                    </h3>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        Interdiction de tricher, frauder, diffuser du contenu inapproprié, ou perturber les autres
                        utilisateurs.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        5. Responsabilité
                    </h3>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        Lootopia ne peut être tenue responsable en cas de perte de données ou dysfonctionnements techniques.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        6. Résiliation
                    </h3>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        Tout manquement aux CGU peut entraîner la suspension ou suppression du compte.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}