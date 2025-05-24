import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tableau de Chasse - Gestion de chasses",
  description: "Application de gestion de chasses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen">
            <header className="bg-[#211E12] text-white py-4">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">Tableau de Chasse</h1>
                  <nav className="hidden md:flex space-x-6">
                    <a href="/" className="hover:text-[#A7C55E] transition-colors">
                      Accueil
                    </a>
                    <a href="/creer" className="hover:text-[#A7C55E] transition-colors">
                      Créer une chasse
                    </a>
                    <a href="#" className="hover:text-[#A7C55E] transition-colors">
                      Mes chasses
                    </a>
                    <a href="#" className="hover:text-[#A7C55E] transition-colors">
                      Profil
                    </a>
                  </nav>
                </div>
              </div>
            </header>
            {children}
            <footer className="bg-[#211E12] text-white py-6 mt-auto">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-gray-300">
                    © {new Date().getFullYear()} Tableau de Chasse. Tous droits réservés.
                  </p>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-gray-300 hover:text-[#A7C55E]">
                      Conditions d'utilisation
                    </a>
                    <a href="#" className="text-gray-300 hover:text-[#A7C55E]">
                      Politique de confidentialité
                    </a>
                    <a href="#" className="text-gray-300 hover:text-[#A7C55E]">
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
