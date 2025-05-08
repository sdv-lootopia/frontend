import React from "react"

interface buttonProps {
    onClick: () => void
    className?: string
    children: React.ReactNode
}

export default function button({
    onClick,
    className = "",
    children
}: buttonProps) {
    <button onClick={onClick} className={className}>
        {children}
    </button>
}