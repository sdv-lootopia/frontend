"use client"

import { useState, useEffect, type ReactNode } from "react"
import { X } from "lucide-react"

interface ToastProps {
    message: string
    type?: "success" | "error" | "info"
    duration?: number
    onClose?: () => void
    children?: ReactNode
}

export default function Toast({ message, type = "success", duration = 3000, onClose, children }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            if (onClose) onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    if (!isVisible) return null

    const bgColor = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-300",
    }[type]

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 flex items-center rounded-lg ${bgColor} px-4 py-3 text-white shadow-lg`}
            role="alert"
        >
            <div className="mr-3">{children}</div>
            <div className="mr-2">{message}</div>
            <button
                onClick={() => {
                    setIsVisible(false)
                    if (onClose) onClose()
                }}
                className="ml-auto rounded-full p-1 hover:bg-white/20"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}
