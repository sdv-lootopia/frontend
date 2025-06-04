"use client"

import { motion } from "framer-motion"
import { Map, Trophy, Smartphone, Users } from "lucide-react"

export function LootopiaPresentation() {
  const features = [
    {
      icon: <Map className="h-6 w-6" />,
      title: "Exploration urbaine",
      description: "Redécouvrez votre ville sous un nouvel angle",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Défis & Récompenses",
      description: "Collectionnez des trésors virtuels et réels",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Expérience cross-plateforme",
      description: "Jouez sur mobile ou web, où que vous soyez",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Aventures sociales",
      description: "Partagez l'expérience avec vos amis",
    },
  ]

  return (
    <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 p-8 md:p-12 flex flex-col items-center justify-center overflow-hidden rounded-lg shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 mb-8"
      >
        <div className="relative inline-block">
          <h2 className="text-lg font-medium tracking-wide text-blue-600 uppercase">{"Bienvenue dans l'univers de"}</h2>
          <motion.h3
            className="text-4xl md:text-5xl font-bold text-blue-600 mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            LOOTOPIA
          </motion.h3>
        </div>

        <motion.p
          className="text-md text-blue-500 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {`Plongez dans un monde où la réalité se mêle au jeu ! LOOTOPIA transforme votre environnement quotidien en
          terrain d'aventure avec des chasses au trésor captivantes en Réalité Augmentée. Débloquez des indices,
          résolvez des énigmes et découvrez des trésors cachés dans votre ville.`}
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-4 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur p-4 rounded-lg shadow-md flex items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(80, 99, 160, 0.2)" }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600">{feature.icon}</div>
              <div>
                <h4 className="font-semibold text-blue-600">{feature.title}</h4>
                <p className="text-xs text-blue-500">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 flex items-center justify-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="h-2 w-2 rounded-full bg-blue-400" />
        <div className="h-2 w-2 rounded-full bg-blue-400" />
        <div className="h-2 w-2 rounded-full bg-blue-400" />
        <p className="ml-2 text-blue-600 text-sm font-medium">{"Prêt à commencer l'aventure ?"}</p>
      </motion.div>
    </div>
  )
}
