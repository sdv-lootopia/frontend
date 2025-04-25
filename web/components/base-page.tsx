"use client"

import Link from "next/link";
import Image from "next/image"
import { LootopiaLogo } from "./lootopia-logo";
import { ReactNode, useState } from "react";
import { useUser } from "@/lib/useUser";

interface BasePageProps {
    children: ReactNode;
}

export default function BasePage({ children }: BasePageProps) {
    const [open, setOpen] = useState(false);
    const { user } = useUser();

    return (
        <div className="min-h-screen w-screen bg-[#f5f5f0] mt-16 flex flex-col justify-between">
            <header className="bg-white p-2 px-6 flex justify-between items-center border-b fixed top-0 w-full z-50">
                <div className="flex items-center gap-2">
                    <LootopiaLogo />
                    <h1 className="text-2xl font-bold">Lootopia</h1>
                </div>

                <nav className="flex items-center gap-2 relative">
                    <Link href="#" className="text-lg font-medium hover:underline hidden sm:inline mr-4">
                        Boutique
                    </Link>
                    <Link href="#" className="text-lg font-medium hover:underline hidden sm:inline mr-4">
                        Chasses
                    </Link>
                    <div className="text-xs text-right flex flex-col">
                        <span>{user?.nickname}</span>
                        <span>{user?.email}</span>
                    </div>
                    <button onClick={() => setOpen(!open)} className="w-10 h-10 rounded-full overflow-hidden">
                        {user?.profilePicture && <Image
                            src={user?.profilePicture}
                            alt="Avatar"
                            width={40}
                            height={40}
                            className="object-cover"
                        />}
                    </button>

                    {open && (
                        <div className="absolute top-12 right-0 bg-white shadow-md rounded-md border w-40 p-2 z-50">
                            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                Profil
                            </Link>
                            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                                Paramètres
                            </Link>
                            <Link href="/auth" className="block px-4 py-2 hover:bg-gray-100">
                                Déconnexion
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            <main>{children}</main>

            <footer className="w-full border-t py-6 px-4 text-sm text-gray-500 bg-white mt-4">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} Lootopia. Tous droits réservés.</p>
                    <div className="flex gap-4">
                        <Link href="/mentions-legales" className="hover:underline">
                            Mentions légales
                        </Link>
                        <Link href="/cgu" className="hover:underline">
                            CGU
                        </Link>
                        <Link href="/contact" className="hover:underline">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}