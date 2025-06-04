import type { LucideIcon } from "lucide-react"

interface SortDropdownProps {
    sortBy: string
    setSortBy: (value: string) => void
    options: { id: string; name: string }[]
    icon?: LucideIcon
    className?: string
}

export default function SortDropdown({
    sortBy,
    setSortBy,
    options,
    icon: Icon,
    className = "",
}: SortDropdownProps) {
    return (
        <div className={`flex items-center rounded-lg bg-white px-2 shadow-sm ${className}`}>
            {Icon && <Icon className="h-4 w-4 text-[#A4AED9]" />}
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border-0 bg-transparent py-2 pl-2 pr-8 text-sm text-[#423D28] focus:ring-0"
            >
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}