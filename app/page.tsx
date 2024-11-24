"use client";

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

const ITEMS_PER_PAGE = 10;

export default function Home(): JSX.Element {
  const [page, setPage] = useState(1);
  const { data: users, isLoading, isError, error } = useUsers(page, ITEMS_PER_PAGE);

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
        Errore: {error instanceof Error ? error.message : "Errore sconosciuto"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Elenco Utenti</h1>

      {/* Lista Utenti */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
        {users?.map((user) => (
          <div
            key={user._id}
            className="w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-gray-100 w-14 h-14 flex items-center justify-center rounded-full text-gray-400 font-bold text-lg mb-2">
                {user.nome[0]}{user.cognome[0]}
              </div>
              <h3 className="font-semibold text-gray-600 text-sm">{user.nome} {user.cognome}</h3>
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
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded-lg border ${page === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
            } transition`}
        >
          Precedente
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 rounded-lg border bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Successivo
        </button>
      </div>
    </div>
  );
}
