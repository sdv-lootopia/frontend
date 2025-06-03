"use client"

import LoggedHomePage from "./LoggedHomePage"
import { useUser } from "@/lib/useUser"
import UnloggedLootopiaHomepage from "./UnloggedHomePage"
import { useEffect } from "react"

export default function LootopiaHomepage() {
  const { user } = useUser()

  useEffect(() => {
    document.title = "Lootopia - Accueil"
  }, [])

  return (
    <>{user ?
      <LoggedHomePage /> :
      <UnloggedLootopiaHomepage />
    }</>
  )
}
