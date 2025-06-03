"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    MapPin,
    Trophy,
    Users,
    Crown,
    Search,
    Play,
    Target,
    Coins,
    Gift,
    Menu,
    X,
} from "lucide-react"
import Link from "next/link"
import { LootopiaLogo } from "@/components/lootopia-logo"

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export default function UnloggedLootopiaHomepage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-sand-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <LootopiaLogo />
                            <span className="text-2xl font-bold text-gray-900">Lootopia</span>
                        </motion.div>

                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Fonctionnalités
                            </Link>
                            <Link href="#modes" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Modes de jeu
                            </Link>
                            <Link href="#rewards" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Récompenses
                            </Link>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <Link href={"/auth#login"}>
                                <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hidden md:flex">
                                    Connexion
                                </Button>
                            </Link>
                            <Link href={"/auth#register"}>
                                <Button className="bg-blue-400 hover:bg-blue-500 text-white">{"S'inscrire"}</Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <nav className="flex flex-col space-y-4">
                                <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Fonctionnalités
                                </Link>
                                <Link href="#modes" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Modes de jeu
                                </Link>
                                <Link href="#rewards" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Récompenses
                                </Link>
                                <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Contact
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="space-y-6">
                                <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                                    🎯 Nouvelle expérience de chasse au trésor
                                </Badge>
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Découvrez des trésors cachés avec la
                                    <span className="text-blue-400"> Réalité Augmentée</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    {`Plongez dans l'univers immersif de Lootopia, la plateforme qui révolutionne les chasses au trésor
                                    grâce à la technologie AR et à la géolocalisation.`}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/auth#register">
                                    <Button size="lg" className="bg-blue-400 hover:bg-blue-500 text-white text-lg px-8">
                                        <Play className="w-5 h-5 mr-2" />
                                        {"Commencer l'aventure"}
                                    </Button>
                                </Link>
                            </div>

                            <motion.div
                                className="flex items-center space-x-8 pt-4"
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                            >
                                <motion.div className="text-center" variants={fadeInUp}>
                                    <div className="text-2xl font-bold text-blue-400">10K+</div>
                                    <div className="text-sm text-gray-500">Chasseurs actifs</div>
                                </motion.div>
                                <motion.div className="text-center" variants={fadeInUp}>
                                    <div className="text-2xl font-bold text-green-200">500+</div>
                                    <div className="text-sm text-gray-500">Chasses créées</div>
                                </motion.div>
                                <motion.div className="text-center" variants={fadeInUp}>
                                    <div className="text-2xl font-bold text-sand-300">50K+</div>
                                    <div className="text-sm text-gray-500">Trésors découverts</div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="bg-blue-50 text-blue-600 border-blue-200 mb-4">✨ Fonctionnalités innovantes</Badge>
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Une expérience de chasse révolutionnaire
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez les technologies qui font de Lootopia la plateforme de chasse au trésor la plus avancée au
                            monde.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                icon: MapPin,
                                title: "Géolocalisation Précise",
                                description: "Explorez le monde réel ou des cartes interactives avec une précision GPS optimale.",
                                color: "blue",
                            },
                            {
                                icon: Crown,
                                title: "Système de Couronnes",
                                description: "Gagnez et dépensez notre monnaie virtuelle pour accéder à des chasses exclusives.",
                                color: "orange",
                            },
                            {
                                icon: Search,
                                title: "Action Creuser",
                                description: "Utilisez l'action signature pour découvrir les trésors cachés dans votre environnement.",
                                color: "green",
                            },
                            {
                                icon: Users,
                                title: "Chat Intégré",
                                description: "Communiquez avec les autres chasseurs et organisateurs en temps réel.",
                                color: "blue",
                            },
                        ].map((feature, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="border-gray-200 hover:shadow-lg transition-all duration-300 bg-white h-full">
                                    <CardHeader>
                                        <div
                                            className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}
                                        >
                                            {feature.color === "green" && <feature.icon className={`w-6 h-6 text-green-200`} />}
                                            {feature.color === "blue" && <feature.icon className={`w-6 h-6 text-blue-400`} />}
                                            {feature.color === "orange" && <feature.icon className={`w-6 h-6 text-sand-300`} />}
                                        </div>
                                        <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                                        <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Modes Section */}
            <section id="modes" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="bg-green-50 text-green-600 border-green-200 mb-4">🎮 Deux modes de jeu</Badge>
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Jouez ou créez selon vos envies</h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white p-8 h-full">
                                <CardHeader className="pb-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                        <Play className="w-8 h-8 text-green-600" />
                                    </div>
                                    <CardTitle className="text-2xl text-green-600 mb-4">Mode Joueur</CardTitle>
                                    <CardDescription className="text-gray-600 text-lg">
                                        Explorez, découvrez et collectionnez dans des aventures immersives.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        {[
                                            "Participez à des chasses publiques et privées",
                                            "Découvrez des caches en Réalité Augmentée",
                                            "Collectionnez des artefacts rares",
                                            "Grimpez dans les classements",
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 h-full">
                                <CardHeader className="pb-6">
                                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                        <Target className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-2xl text-blue-600 mb-4">Mode Organisateur</CardTitle>
                                    <CardDescription className="text-gray-600 text-lg">
                                        Créez des expériences uniques et captivantes pour vos participants.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        {[
                                            "Concevez des chasses personnalisées",
                                            "Placez des étapes et repères en RA",
                                            "Gérez vos participants en temps réel",
                                            "Analysez les performances",
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Rewards Section */}
            <section id="rewards" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="bg-orange-50 text-orange-600 border-orange-200 mb-4">🏆 Système de récompenses</Badge>
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Collectionnez, échangez, progressez</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {"Un écosystème complet de gamification avec des récompenses uniques et des mécaniques d'échange innovantes."}
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-8 mb-12"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                icon: Crown,
                                title: "Couronnes",
                                description:
                                    "Notre monnaie virtuelle pour accéder aux chasses premium et acheter des objets exclusifs.",
                                color: "orange",
                            },
                            {
                                icon: Gift,
                                title: "Artefacts",
                                description: "Collectionnez des objets rares et thématiques, échangez-les sur l'Hôtel des Ventes.",
                                color: "green",
                            },
                            {
                                icon: Trophy,
                                title: "Classements",
                                description: "Grimpez dans les leaderboards et débloquez des badges d'accomplissement exclusifs.",
                                color: "blue",
                            },
                        ].map((reward, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="text-center border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                                    <CardHeader>
                                        <div
                                            className={`w-16 h-16 bg-${reward.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                                        >
                                            <reward.icon className={`w-8 h-8 text-${reward.color}-600`} />
                                        </div>
                                        <CardTitle className="text-gray-900">{reward.title}</CardTitle>
                                        <CardDescription className="text-gray-600">{reward.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hôtel des Ventes</h3>
                                <p className="text-gray-600 mb-6">
                                    Marketplace unique où les chasseurs peuvent échanger, vendre et enchérir sur des artefacts rares.
                                    Créez votre propre économie virtuelle !
                                </p>
                                <div className="space-y-3">
                                    {["Enchères en temps réel", "Échanges sécurisés", "Objets certifiés et authentifiés"].map(
                                        (feature, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <Coins className="w-5 h-5 text-orange-500" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-500">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        className="max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">{"Prêt à vivre l'aventure Lootopia ?"}</h2>
                        <p className="text-xl text-blue-100 mb-8">
                            {`Rejoignez des milliers de chasseurs de trésors et découvrez un monde d'aventures en Réalité Augmentée qui
                            vous attend.`}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={"/auth#register"}>
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
                                    <Play className="w-5 h-5 mr-2" />
                                    Commencer gratuitement
                                </Button>
                            </Link>

                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
