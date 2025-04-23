import Image from "next/image";

interface LootopiaLogoProps {
    width?: number
    height?: number
    className?: string
}

export function LootopiaLogo({
    width = 50,
    height = 200,
    className = ""
}: LootopiaLogoProps) {
    return (
        <Image
            src="/lootopia-logo.png"
            alt="logo de Lootopia"
            width={width}
            height={height}
            className={className}
        />
    )
}