import Link from "next/link"
import { ShoppingBag } from "lucide-react"

interface Props {
    message?: string
    buttonText?: string
    href?: string
    onClick?: () => void
}

export default function EmptyCartMessage({
    message = "Ajoutez des articles à votre panier pour finaliser un achat",
    buttonText = "Retourner sur la boutique",
    href = "/shop",
    onClick,
}: Props) {
    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingBag className="mb-4 h-16 w-16 text-gray-200" />
            <h2 className="mb-2 text-xl font-medium text-sand-500">Votre panier est vide</h2>
            <p className="mb-6 text-blue-200">{message}</p>
            {(href || onClick) && (
                <Link
                    href={href || "#"}
                    onClick={onClick}
                    className="rounded-full bg-blue-300 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-400"
                >
                    {buttonText}
                </Link>
            )}
        </div>
    )
}
