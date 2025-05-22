import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scroll, Mail } from "lucide-react";

export default function MentionsLegales() {
    return (
        <Card className="border-none shadow-lg bg-white/80 dark:bg-slate/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r py-4 from-blue-50 to-blue-200 dark:from-slate-600 dark:to-blue-600 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-400 dark:text-blue-50">
                    <Scroll className="h-5 w-5" />
                    Mentions Légales
                </CardTitle>
                <CardDescription className="text-blue-300 dark:text-blue-200">
                    {"Informations légales concernant l'éditeur et l'hébergeur du site"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        Éditeur du site
                    </h3>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        {"Lootopia est éditée par Out of Cache, agence web fictive dans le cadre d'un projet pédagogique."}
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        {"Composition de l'équipe"}
                    </h3>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">{"Fafa BLIVI, Mame FALL, Pauline LY"}</p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        Hébergement
                    </h3>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">
                        {"Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA."}


                    </p>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">📧 <a
                        href="mailto:contact@lootopia.fr"
                        className="text-[#5063A0] hover:text-[#35426D] dark:text-[#7687C6] dark:hover:text-[#A4AED9] hover:underline transition-colors"
                    >support@vercel.com</a></p>
                    <p className="ml-4 text-[#5063A0] dark:text-[#7687C6]">🌐 <a href="http://vercel.com" className="text-[#5063A0] hover:text-[#35426D] dark:text-[#7687C6] dark:hover:text-[#A4AED9] hover:underline transition-colors">http://vercel.com</a></p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#35426D] dark:text-[#A4AED9] flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#7687C6]"></div>
                        Contact
                    </h3>
                    <p className="ml-4 flex items-center gap-2 text-[#5063A0] dark:text-[#7687C6]">
                        <Mail className="h-4 w-4" />
                        <a
                            href="mailto:contact@lootopia.fr"
                            className="text-[#5063A0] hover:text-[#35426D] dark:text-[#7687C6] dark:hover:text-[#A4AED9] hover:underline transition-colors"
                        >
                            contact@lootopia.fr
                        </a>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}