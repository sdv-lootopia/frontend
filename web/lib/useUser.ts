"use client";

import { useEffect, useState } from "react";

interface User {
    nickname: string;
    email: string;
    profilePicture: string;
    biography: string;
}

// Simulated backend using localStorage
const saveUserToLocalStorage = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const getUserFromLocalStorage = (): User | null => {
    if (typeof window === "undefined") {
        return null; // Ensure this code runs only in the browser
    }
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
};

// Inscription (Register)
const registerUser = (nickname: string, email: string, profilePicture: string, biography: string): User => {
    // Simulated registration logic (in reality, you'd interact with a backend)
    const newUser: User = {
        nickname,
        email,
        profilePicture,
        biography,
    };

    // Save the new user to localStorage
    saveUserToLocalStorage(newUser);

    return newUser;
};

const loginUser = (email: string): User | null => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser && storedUser.email === email) {
        return storedUser;
    }

    const newUser: User = {
        nickname: "grogu",
        email,
        profilePicture: "/bbyoda.jpg",
        biography: "",
    };

    // Save the new user to localStorage
    saveUserToLocalStorage(newUser);
    return newUser;
};

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) {
            setUser(storedUser);
        } else {
            setUser(null);
        }
    }, []);

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        saveUserToLocalStorage(updatedUser);
    };

    const logoutUser = () => {
        removeUserFromLocalStorage();
        setUser(null);
    };

    return { user, setUser: updateUser, registerUser, loginUser, logoutUser, updateUser };
};
