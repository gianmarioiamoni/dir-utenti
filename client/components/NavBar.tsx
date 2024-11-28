"use client";

import React, { FC, useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";

/**
 * Proprietà del componente `Navbar`.
 *
 * @typedef {Object} NavbarProps
 * @property {() => void} onAddUser - Funzione callback invocata per aggiungere un nuovo utente.
 */
interface NavbarProps {
    onAddUser: () => void;
}

/**
 * Componente Navbar per la navigazione e gestione degli utenti.
 *
 * @component
 * @param {NavbarProps} props - Proprietà passate al componente.
 * @returns {JSX.Element} - La barra di navigazione dell'applicazione.
 *
 * @example
 * <Navbar onAddUser={() => console.log("Aggiungi Utente cliccato")} />
 */
const Navbar: FC<NavbarProps> = ({ onAddUser }) => {
    // Stato per gestire la visibilità del menu mobile
    const [isMenuOpen, setMenuOpen] = useState(false);

    /**
     * Alterna lo stato del menu mobile.
     */
    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    /**
     * Chiude il menu mobile e invoca la funzione `onAddUser`.
     */
    const onCLickAddUserMobile = () => {
        setMenuOpen(false);
        onAddUser();
    };

    return (
        <nav className="navbar">
            {/* Titolo dell'applicazione */}
            <div className="navbar-app-title">
                <span>DirUtenti</span>
                <HiUsers className="hidden sm:block text-xl" />
            </div>

            {/* Pulsante Aggiungi Utente */}
            <button className="navbar-menu-btn" onClick={onAddUser}>
                <AiOutlineUserAdd className="hidden sm:inline text-lg" />
                <span className="hidden sm:inline">Aggiungi Utente</span>
            </button>

            {/* Menu Toast per dispositivi piccoli */}
            <button
                onClick={toggleMenu}
                className="navbar-toast-menu-btn hover:text-accent-hover"
            >
                <AiOutlineMenu size={24} />
            </button>

            {/* Menu Mobile */}
            {isMenuOpen && (
                <div className="navbar-mobile-menu">
                    <div className="navbar-mobile-menu-panel">
                        {/* Icona di chiusura */}
                        <button
                            className="navbar-mobile-menu-close-icon"
                            onClick={() => setMenuOpen(false)}
                        >
                            <AiOutlineClose />
                        </button>
                        {/* Titolo del menu */}
                        <div className="navbar-mobile-menu-title">Menu</div>
                        {/* Pulsante Aggiungi Utente */}
                        <button
                            className="navbar-mobile-menu-btn"
                            onClick={onCLickAddUserMobile}
                        >
                            Aggiungi Utente
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
