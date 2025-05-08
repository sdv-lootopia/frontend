import { Crown } from "lucide-react"

export default function CrownsPack() {
    const crownPacks = [
        { id: "crown-10", amount: 10, price: 0.99, bonus: 0 },
        { id: "crown-25", amount: 25, price: 1.99, bonus: 2 },
        { id: "crown-50", amount: 50, price: 3.99, bonus: 5 },
        { id: "crown-100", amount: 100, price: 7.99, bonus: 15 },
        { id: "crown-1000", amount: 1000, price: 69.99, bonus: 200 },
    ]
    const handleBuyCrownPack = (pack: { id: string; amount: number; price: number; bonus: number }) => {
        alert(`Achat de ${pack.amount} Couronnes (+ ${pack.bonus} bonus) pour ${pack.price.toFixed(2)}€`)
        // TO DO: Logique d'achat
    }

    return (
        <div className="mb-8 rounded-xl bg-blue-50 p-6">
            <h2 className="text-xl font-medium text-grey-500">Acheter des Couronnes</h2>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {crownPacks.map((pack) => (
                    <div
                        key={pack.id}
                        className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <Crown className="h-6 w-6 text-blue-300" />
                        </div>
                        <div className="mb-3 text-center">
                            <p className="text-lg font-bold text-grey-500">{pack.amount} Couronnes</p>
                            {pack.bonus > 0 && <p className="text-xs text-green-500">+{pack.bonus} Couronnes bonus</p>}
                        </div>
                        <button
                            onClick={() => handleBuyCrownPack(pack)}
                            className="mt-auto w-full rounded-full bg-blue-300 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400"
                        >
                            {pack.price.toFixed(2)}€
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}