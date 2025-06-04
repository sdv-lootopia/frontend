import type { ReactNode } from "react"

interface CardProps {
    children?: ReactNode
    icon: ReactNode
    title: string
    description: string
}

export function Card({ icon, title, description, children }: CardProps) {
    return (
        <div className="rounded-xl border border-gray-50 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                {icon}
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            {children}
        </div>
    )
}