import Image from "next/image"

interface CrownProps {
    width?: number
    height?: number
    className?: string
}

export function Crown({
    width = 30,
    height = 200,
    className = ""
}: CrownProps) {
    return (
        <Image
            src="/crown.png"
            alt="couronne"
            width={width}
            height={height}
            className={className}
        />
    )
}