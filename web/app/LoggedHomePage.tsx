import Link from "next/link"
import { Crown, MapPin, ShoppingBag, Trophy } from "lucide-react"
import BasePage from "@/components/base-page"

export default function HomePage() {
  return (
    <BasePage>
      <div className="h-full w-full bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold text-sand-600 md:text-5xl lg:text-6xl">
              Bienvenue sur <span className="text-blue-300">Lootopia</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-200">
              Découvrez une plateforme immersive de chasses au trésor avec des caches virtuelles et semi-virtuelles.
              Participez à des aventures uniques ou créez les vôtres !
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/boutique"
                className="rounded-full bg-blue-300 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-400"
              >
                Découvrir la boutique
              </Link>
              <Link
                href="/acheter-couronnes"
                className="flex items-center rounded-full border border-blue-300 px-8 py-3 font-medium text-blue-300 transition-colors hover:bg-blue-50"
              >
                <Crown className="mr-2 h-5 w-5" />
                Acheter des Couronnes
              </Link>
              <Link
                href="/hunts"
                className="rounded-full bg-blue-300 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-400"
              >
                Découvrir les chasses
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-sand-600">Découvrez Lootopia</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 text-center shadow-sm transition-transform hover:scale-105">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-300">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-sand-500">Chasses au trésor</h3>
                <p className="text-blue-200">
                  Participez à des chasses au trésor immersives dans le monde réel ou cartographique.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 text-center shadow-sm transition-transform hover:scale-105">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-300">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-sand-500">Récompenses</h3>
                <p className="text-blue-200">
                  Gagnez des Couronnes et collectionnez des artefacts rares en complétant des chasses.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 text-center shadow-sm transition-transform hover:scale-105">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-300">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-sand-500">Boutique</h3>
                <p className="text-blue-200">
                  Dépensez vos Couronnes dans notre boutique pour obtenir des objets exclusifs et des avantages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold text-sand-600">{"Prêt à commencer l'aventure ?"}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-200">
              Rejoignez notre communauté de chasseurs de trésors et vivez des expériences uniques.
            </p>
            <Link
              href="/boutique"
              className="rounded-full bg-blue-300 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-400"
            >
              Explorer la boutique
            </Link>
          </div>
        </section>
      </div>
    </BasePage>
  )
}