"use client"

import { useEffect, useState } from "react"

interface User {
    nickname: string
    email: string
    profilePicture: string,
    biography: string
}

export const useUser = () => {
    const [user, setUser] = useState<User>({
        nickname: "",
        email: "",
        profilePicture: "",
        biography: "",
    });

    useEffect(() => {
        // A remplacer par un appel API
        setUser({
            nickname: "Grogu (Baby Yoda)",
            email: "baby.yoda@gmail.com",
            profilePicture: "/bbyoda.jpg",
            biography: "Voici ma super biographie où j'écris plein de trucs inutiles hahahahahahahhahaha",
        })
    }, [])

    return { user }
}