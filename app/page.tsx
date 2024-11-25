"use client";

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

import Navbar from "@/components/NavBar";

const ITEMS_PER_PAGE = 10;

export default function Home(): JSX.Element {
  const [page, setPage] = useState(1);
  const { data: usersData, isLoading, isError, error } = useUsers(page, ITEMS_PER_PAGE);

  const { users, total = 0 } = usersData || {};
  const TOTAL_PAGES = Math.ceil(total / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="loader"></div>
        <p className="text-center text-gray-500">Caricamento Utenti...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Errore: {error instanceof Error ? error.message : "Errore di caricamento dati"}
      </div>
    );
  }

  const handlePageClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="title">Elenco Utenti</h1>

        {/* Lista Utenti */}
        <main className="main-container">
          {users?.map((user) => (
            // Scheda utente
            <div
              key={user._id}
              className="card-div group"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                {/* Iniziali */}
                <div className="card-initials-div">
                  {user.nome[0]}{user.cognome[0]}
                </div>
                {/* Nome e Cognome */}
                <h3 className="font-semibold text-name-text text-sm">{user.nome} {user.cognome}</h3>
                {/* Tooltip e Troncamento dell'email */}
                <p
                  className="card-email-p"
                  title={user.email}
                >
                  {user.email}
                </p>
              </div>

              {/* Overlay per hover */}
              <div className="card-hover-overlay">
                <p className="text-foreground font-semibold text-sm">Click to show details</p>
              </div>
            </div>
          ))}
        </main>

        {/* Paginazione */}
        <div className="paging-div">
          {/* Bottone Precedente */}
          <button
            disabled={page === 1}
            onClick={() => handlePageClick(page - 1)}
            className={` ${page === 1 ? "btn-inactive" : "btn"} `}
          >
          
            <span className="hidden sm:inline">Precedente</span>
            <span className="inline sm:hidden">Prec</span>
          </button>

          {/* Indicatori numerici delle pagine */}
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: TOTAL_PAGES }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={` ${page === index + 1
                  ? "paging-number-btn"
                  : "paging-number-btn-inactive"
                  } transition`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Bottone Successivo */}
          <button
            disabled={page === TOTAL_PAGES}
            onClick={() => handlePageClick(page + 1)}
            className={`${page === TOTAL_PAGES ? "btn-inactive" : "btn"} `}
          >
            <span className="hidden sm:inline">Successivo</span>
            <span className="inline sm:hidden">Succ</span>
          </button>
        </div>

      </div>
    </div>
  );
}

