"use client";

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

const ITEMS_PER_PAGE = 10;

export default function Home(): JSX.Element {
  const [page, setPage] = useState(1);
  const { data: users, isLoading, isError, error } = useUsers(page, ITEMS_PER_PAGE);

  if (isLoading) {
    return <p>Caricamento...</p>;
  }

  if (isError) {
    return <p>Errore: {error instanceof Error ? error.message : "Errore sconosciuto"}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users?.map((user) => (
          <div key={user._id} className="p-4 border rounded shadow">
            <h3 className="font-bold text-lg">
              {user.nome} {user.cognome}
            </h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 mr-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Precedente
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Successivo
        </button>
      </div>
    </div>
  );
}

