// /app/page.tsx
"use client";

import { UserList } from '../components/UserList';
import { useUsers } from '../hooks/useUsers';

const ITEMS_PER_PAGE = 10;

export default function Home(): JSX.Element {
  const { users, page, setPage, loading, error } = useUsers(1, ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Elenco Utenti</h1>

      {loading && <p className="text-center text-lg">Caricamento...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && <UserList users={users} />}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className={`bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 ${page === 1 && 'opacity-50 pointer-events-none'
            }`}
        >
          Indietro
        </button>
        <span>Pagina {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}
