"use client";

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiUsers } from "react-icons/hi"; 
import { AiOutlineUserAdd } from "react-icons/ai"; 

export default function Navbar(): JSX.Element {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-primary text-foreground py-4 px-6 flex justify-between items-center">

            {/* Titolo App */}
            <div className="flex items-center text-accent gap-2 text-lg font-bold">
                <span>DirUtenti</span>
                {/* <AiOutlineMenu className="" /> */}
                <HiUsers className="hidden sm:block text-xl" />
            </div>

            {/* Comando Aggiungi Utente */}
            <button className="flex items-center gap-2 text-sm font-medium hover:text-accent transition">
                <AiOutlineUserAdd className="text-lg" />
                <span className="hidden sm:inline">Aggiungi Utente</span>
            </button>

            {/* Toast menu for small screens */}
            <button
                onClick={toggleMenu}
                className="sm:hidden text-accent hover:text-accent-dark transition"
            >
                <AiOutlineMenu size={24} />
            </button>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-10">
                    <div className="absolute top-0 right-0 w-3/4 sm:w-1/3 h-full bg-primary p-6 flex flex-col">
                        {/* App name */}
                        <div className="text-accent text-xl font-bold mb-4">DirUtenti</div>
                        {/* Menu */}
                        <button
                            className="text-sm text-foreground hover:text-accent mb-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Aggiungi Utente
                        </button>
                        {/* Close menu */}
                        <button
                            className="mt-auto text-sm text-foreground hover:text-accent"
                            onClick={() => setMenuOpen(false)}
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
