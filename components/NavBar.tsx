"use client";

import React, { FC, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiUsers } from "react-icons/hi"; 
import { AiOutlineUserAdd } from "react-icons/ai";

interface NavbarProps {
    onAddUser: () => void;
}

const Navbar: FC<NavbarProps> = ({ onAddUser }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    const onCLickAddUserMobile = () => {
        setMenuOpen(false);
        onAddUser();
    };

    return (
        <nav className="navbar">

            {/* Titolo App */}
            <div className="navbar-app-title">
                <span>DirUtenti</span>
                <HiUsers className="hidden sm:block text-xl" />
            </div>

            {/* Comando Aggiungi Utente */}
            <button className="navbar-menu-btn" onClick={onAddUser}>
                <AiOutlineUserAdd className="hidden sm:inline text-lg" />
                <span className="hidden sm:inline">Aggiungi Utente</span>
            </button>

            {/* Toast menu for small screens */}
            <button
                onClick={toggleMenu}
                className="navbar-toast-menu-btn hover:text-accent-hover"
            >
                <AiOutlineMenu size={24} />
            </button>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="navbar-mobile-menu">
                    <div className="navbar-mobile-menu-panel">
                        {/* Menu Title */}
                        <div className="navbar-mobile-menu-title">Menu</div>
                        {/* Menu */}
                        <button
                            className="navbar-mobile-menu-btn"
                            onClick={onCLickAddUserMobile}
                        >
                            Aggiungi Utente
                        </button>
                        {/* Close menu */}
                        <button
                            className="mt-auto navbar-mobile-menu-btn"
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

export default Navbar;
