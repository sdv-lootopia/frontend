import { Crown } from "lucide-react"

export default function CrownsPack() {

    const crownPacks = [
        {
            id: "crown-25",
            amount: 25,
            price: 1.99,
            bonus: 2,
            paymentLink: "https://buy.stripe.com/test_fZu28r1QS77igXc11e7g402",
        },
        {
            id: "crown-50",
            amount: 50,
            price: 3.99,
            bonus: 5,
            paymentLink: "https://buy.stripe.com/test_5kQ14nbrsbny0YeeS47g406",
        },
        {
            id: "crown-100",
            amount: 100,
            price: 7.99,
            bonus: 15,
            paymentLink: "https://buy.stripe.com/test_dRm28rcvwbny7mC7pC7g407",
        },
        {
            id: "crown-300",
            amount: 300,
            price: 24.99,
            bonus: 60,
            paymentLink: "https://buy.stripe.com/test_eVqdR91QS8bm0YecJW7g408",
        },
        {
            id: "crown-600",
            amount: 600,
            price: 39.99,
            bonus: 120,
            paymentLink: "https://buy.stripe.com/test_9B6aEX1QS77i5eudO07g409",
        },
    ]

    const handleBuyCrownPack = (paymentLink: string) => {
        window.location.href = paymentLink
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
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                            <Crown className="h-6 w-6 text-blue-300" />
                        </div>
                        <div className="mb-3 text-center">
                            <p className="text-lg font-bold text-grey-500">{pack.amount} Couronnes</p>
                            {pack.bonus > 0 && <p className="text-xs text-green-500">+{pack.bonus} Couronnes bonus</p>}
                        </div>
                        <button
                            onClick={() => handleBuyCrownPack(pack.paymentLink)}
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