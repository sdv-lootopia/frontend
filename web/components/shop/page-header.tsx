import { ReactNode } from "react"

interface PageHeaderProps {
    title: string
    description: string
    children?: ReactNode
}
export default function PageHeader({
    title,
    description, 
    children
}: PageHeaderProps) {
    return (
        <div className="relative rounded-lg bg-white p-8">
            {children}
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <p className="mt-2 text-gray-400">
                {description}
            </p>
        </div>
    )
}