"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useUsers } from "@/hooks/useUsers";
import { useErrorHandling } from "@/hooks/useErrorHandling";

const Home: FC = () => {
  const { data, isLoading, isError, error, isModalOpen, setIsModalOpen, onCloseModal, handleAddUser } = useUsers(1, 10);
  const [totalUsers, setTotalUsers] = useState(0);

  useErrorHandling(isError, error);

  useEffect(() => {
    if (data?.total) {
      setTotalUsers(data.total);
    }
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 bg-gray-800 text-white text-center">
        <h1 className="text-3xl font-bold">Benvenuto nella Directory Utenti</h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <p className="text-center text-lg text-gray-700">
          Gestisci i tuoi utenti in modo semplice e intuitivo.
        </p>

        {isLoading ? (
          <p className="text-center mt-4">Caricamento in corso...</p>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-gray-600">Numero totale di utenti: {totalUsers}</p>

            <div className="flex justify-center gap-4 mt-6">
                <Link href="/users" className="btn btn-primary">
                  Visualizza Lista Utenti
                </Link>
              <button onClick={() => setIsModalOpen(true)} className="btn btn-secondary">
                Aggiungi Nuovo Utente
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
