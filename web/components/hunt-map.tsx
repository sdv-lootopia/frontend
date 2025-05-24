"use client"

import React from "react"

export type HuntLocation = {
  id: number
  title: string
  location: string
  coordinates: [number, number]
}

type HuntMapProps = {
  locations: HuntLocation[]
  height: string
  onMarkerClick?: (id: number) => void
}

export default function HuntMap({ locations, height, onMarkerClick }: HuntMapProps) {
  return (
    <div
      style={{
        height,
        backgroundColor: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <p>📍 Carte simulée :</p>
      {locations.map((loc) => (
        <button
          key={loc.id}
          onClick={() => onMarkerClick?.(loc.id)}
          style={{
            background: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <strong>{loc.title}</strong> — {loc.location}
        </button>
      ))}
    </div>
  )
}
