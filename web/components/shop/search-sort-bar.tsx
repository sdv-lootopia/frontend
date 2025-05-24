import { Filter, Search } from "lucide-react"
import SortDropdown from "../ui/sort-dropdown"

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

            <SortDropdown
                sortBy={sortBy}
                setSortBy={(value) => setSortBy(value as SortOption)}
                options={[
                    { id: "popular", name: "Populaires" },
                    { id: "recent", name: "Nouveautés" },
                    { id: "price-asc", name: "Prix croissant" },
                    { id: "price-desc", name: "Prix décroissant" },
                ]}
                icon={Filter}
            />
        </div>
    )
}
