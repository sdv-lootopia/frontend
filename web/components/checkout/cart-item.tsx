import { Minus, Plus, Trash2, Crown } from "lucide-react"
import type { CartItem } from "@/types/cart"

interface Props {
    item: CartItem
    updateQuantity: (id: string, quantity: number) => void
    removeItem: (id: string) => void
    isProcessing: boolean
}

export default function CartItem({ item, updateQuantity, removeItem, isProcessing }: Props) {
    return (
        <div className="flex items-center gap-4 py-4">
            <img
                src={item.product.image || "https://placehold.co/400x200/e2e8f0/64748b?text=Lootopia"}
                alt={item.product.name}
                className="h-16 w-16 rounded-md object-cover"
                onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x200/e2e8f0/64748b?text=Lootopia"
                }}
            />
            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sand-500">{item.product.name}</h3>
                    <button
                        onClick={() => removeItem(item.product.id)}
                        className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-red-500"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
                <p className="text-xs text-blue-200 line-clamp-1">{item.product.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="flex items-center text-blue-300">
                    <Crown className="mr-1 h-4 w-4" />
                    <span className="font-medium">{item.product.price}</span>
                </div>
                <div className="flex items-center rounded-lg border border-neutral-200">
                    <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-8 w-8 text-neutral-500 hover:bg-neutral-100"
                        disabled={isProcessing}
                    >
                        <Minus className="mx-auto h-3 w-3" />
                    </button>
                    <span className="h-8 w-8 border-x border-neutral-200 text-sm text-sand-500 flex items-center justify-center">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 text-neutral-500 hover:bg-neutral-100"
                        disabled={isProcessing}
                    >
                        <Plus className="mx-auto h-3 w-3" />
                    </button>
                </div>
            </div>
        </div>
    )
}