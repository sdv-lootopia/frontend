import { Filter, Search } from "lucide-react"

type SortOption = "popular" | "recent" | "price-asc" | "price-desc"

interface Props {
    searchQuery: string
    setSearchQuery: (value: string) => void
    sortBy: SortOption
    setSortBy: (value: SortOption) => void
    productCount: number
}

export default function SearchAndSortBar({
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
}: Props) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300" />
                <input
                    type="text"
                    placeholder="Rechercher dans la boutique..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:border-blue-300 focus:outline-none"
                />
            </div>

            <div className="flex items-center rounded-md border border-neutral-200 bg-white px-3 py-2">
                <Filter className="mr-2 h-4 w-4 text-blue-300" />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-transparent text-sm text-gray-700 focus:outline-none"
                >
                    <option value="popular">Populaires</option>
                    <option value="recent">Nouveautés</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                </select>
            </div>
        </div>
    )
}
