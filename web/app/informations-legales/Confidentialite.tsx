import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function Confidentialite() {
    return (
        <Card className="border-none shadow-lg bg-white/80 dark:bg-[#1B233E]/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r py-4 from-[#D2D6EC] to-[#A4AED9] dark:from-[#1B233E] dark:to-[#35426D] rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-[#35426D] dark:text-[#A4AED9]">
                    <Shield className="h-5 w-5" />
                    Politique de Confidentialité
                </CardTitle>
                <CardDescription className="text-[#5063A0] dark:text-[#7687C6]">
                    Informations sur la collecte et le traitement de vos données personnelles
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        1. Données collectées
                    </h3>
                    <ul className="list-none pl-8 space-y-1 text-[#5063A0] dark:text-[#7687C6]">
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                            Email, mot de passe (haché), nickname.
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                            Données de jeu (participations, scores, artefacts).
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                            Données de géolocalisation (en mode réel).
                        </li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        2. Finalité
                    </h3>
                    <ul className="list-none pl-8 space-y-1 text-[#5063A0] dark:text-[#7687C6]">
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                            Gestion du compte et des interactions.
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                            {"Statistiques d'usage."}
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                            Sécurisation des accès (MFA, journaux).
                        </li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        3. Sécurité
                    </h3>
                    <ul className="list-none pl-8 space-y-1 text-[#5063A0] dark:text-[#7687C6]">
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                            Mots de passe hachés (bcrypt/Argon2).
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                            Données chiffrées (AES-256).
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                            Connexion sécurisée (HTTPS).
                        </li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        4. Partage des données
                    </h3>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        {"Aucune donnée n'est transmise à des tiers sans consentement explicite."}
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        5. Droits RGPD
                    </h3>
                    <div className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        <p>Chaque utilisateur peut demander :</p>
                        <ul className="list-none pl-4 space-y-1 mt-2">
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                                Accès, rectification ou suppression de ses données.
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                                Export de ses données.
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5063A0] dark:bg-[#7687C6]"></div>
                                Opposition au traitement.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        6. Cookies
                    </h3>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        Lootopia utilise uniquement des cookies fonctionnels (authentification, préférences utilisateur).
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}