"use client";

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

const ITEMS_PER_PAGE = 10;

export default function Home(): JSX.Element {
  const [page, setPage] = useState(1);
  const { data: usersData, isLoading, isError, error } = useUsers(page, ITEMS_PER_PAGE);

  const { users, total = 0 } = usersData || {};
  const TOTAL_PAGES = Math.ceil(total / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full border-4 border-t-4 border-foreground border-t-primary w-16 h-16 mb-4"></div>
        <p className="text-center text-gray-500">Caricamento...</p>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-16">Elenco Utenti</h1>

      {/* Lista Utenti */}
      <div className="mt-8 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {users?.map((user) => (
          // Scheda utente
          <div
            key={user._id}
            className="relative w-full max-w-xs p-4 bg-card-bg border border-card-border rounded-lg shadow transition-transform hover:scale-105 hover:shadow-lg group"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              {/* Iniziali */}
              <div className="bg-initials-bg w-14 h-14 flex items-center justify-center rounded-full text-initials-text font-bold text-lg mb-2">
                {user.nome[0]}{user.cognome[0]}
              </div>
              {/* Nome e Cognome */}
              <h3 className="font-semibold text-name-text text-sm">{user.nome} {user.cognome}</h3>
              {/* Tooltip e Troncamento dell'email */}
              <p
                className="text-xs text-gray-500 max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
                title={user.email}
              >
                {user.email}
              </p>
            </div>

            {/* Overlay per hover */}
            <div className="absolute inset-0 bg-card-hover-bg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-foreground font-semibold text-sm">Click to show details</p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginazione */}
      <div className="mt-12 flex flex-col sm:flex-row sm:justify-center items-center gap-4">
        {/* Bottone Precedente */}
        <button
          disabled={page === 1}
          onClick={() => handlePageClick(page - 1)}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${page === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            } transition`}
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
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${page === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-blue-100"
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
          className={`px-4 py-2 rounded-full text-sm font-semibold ${page === TOTAL_PAGES
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
            } transition`}
        >
          <span className="hidden sm:inline">Successivo</span>
          <span className="inline sm:hidden">Succ</span>
        </button>
      </div>
    </div>
  );
}

