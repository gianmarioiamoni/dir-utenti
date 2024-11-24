"use client";

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

const ITEMS_PER_PAGE = 10;

export default function Home(): JSX.Element {
  const [page, setPage] = useState(1);
  const { data: usersData, isLoading, isError, error } = useUsers(page, ITEMS_PER_PAGE);

  const { users, total = 0 } = usersData || {};
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full border-4 border-t-4 border-gray-400 w-16 h-16 mb-4"></div>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Elenco Utenti</h1>

      {/* Lista Utenti */}
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {users?.map((user) => (
          
          // Scheda utente
          <div
            key={user._id}
            className="w-full max-w-xs p-4 bg-card-bg border border-card-border rounded-lg shadow hover:shadow-md transition-shadow"
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
                title={user.email}  // Mostra l'email completa al passaggio del mouse
              >
                {user.email}
              </p>
            </div>
          </div>

        ))}
      </div>

      {/* Paginazione */}
      <div className="mt-6 flex justify-center items-center gap-4">
        {/* Bottone Precedente */}
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className={`${page === 1
            ? "btn-inactive"
            : "btn"
            } transition`}
        >
          Precedente
        </button>
        {/* Bottone Successivo */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`${page === totalPages
            ? "btn-inactive"
            : "btn"
            } transition`}
        >
          Successivo
        </button>
      </div>

    </div>
  );
}
