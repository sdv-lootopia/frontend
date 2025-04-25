"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LoginForm } from "./Login"
import { RegisterForm } from "./Register"
import LootopiaPresentation from "./LootopiaPresentation"

const formVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
    }),
}

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [direction, setDirection] = useState(0)

    const switchToLogin = () => {
        setDirection(-1)
        setIsLogin(true)
    }

    const switchToRegister = () => {
        setDirection(1)
        setIsLogin(false)
    }

    const handleSocialAuth = (provider: string) => {
        console.log(`Authentification avec ${provider}`)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
                <LootopiaPresentation />

                <div className="w-full md:w-1/2 p-8 md:p-8 relative overflow-hidden">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login"
                                custom={direction}
                                variants={formVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                            >
                                <LoginForm onSwitchToRegister={switchToRegister} onSocialAuth={handleSocialAuth} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="register"
                                custom={direction}
                                variants={formVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                            >
                                <RegisterForm onSwitchToLogin={switchToLogin} onSocialAuth={handleSocialAuth} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
