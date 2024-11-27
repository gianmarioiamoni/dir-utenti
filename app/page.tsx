"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Per navigare programmaticamente

import { useUsers } from "@/hooks/useUsers";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import Loader from "@/components/Loader";
import CreateUserModal from "@/components/CreateUserModal"; // Importa il componente modal

const Home: FC = () => {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
    error,
    isModalOpen,
    setIsModalOpen,
    onCloseModal,
    handleAddUser,
  } = useUsers(1, 10);
  const [totalUsers, setTotalUsers] = useState(0);

  useErrorHandling(isError, error);

  useEffect(() => {
    if (data?.total) {
      setTotalUsers(data.total);
    }
  }, [data]);

  // Handler per aggiungere un utente e reindirizzare
  const handleAddUserAndNavigate = async (newUser: any) => {
    try {
      await handleAddUser(newUser); // Aggiunge il nuovo utente
      router.push("/users"); // Reindirizza alla lista utenti
    } catch (error) {
      console.error("Errore durante l'aggiunta dell'utente:", error);
    }
  };

  return (
    <div className="flex flex-col align-center min-h-screen bg-background">
      <header className="py-6 bg-gray-800 text-white text-center">
        <h1 className="text-3xl bg-gray-800 text-white text-center font-bold">
          Benvenuto nella Directory Utenti
        </h1>
      </header>

      <main className="flex flex-col items-center flex-1 container mx-auto px-4 py-8 mt-6">
        <p className="text-center text-lg text-gray-500">
          Gestisci i tuoi utenti in modo semplice e intuitivo.
        </p>

        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <div className="mt-8 text-center">
            <p className="text-gray-600">Numero totale di utenti: {totalUsers}</p>

            <div className="flex justify-center gap-4 mt-6">
              <button onClick={() => setIsModalOpen(true)} className="btn-secondary">
                Aggiungi Nuovo Utente
              </button>
              <Link href="/users" className="btn-primary">
                Visualizza Lista Utenti
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Modal per creare un nuovo utente */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        handleAddUser={handleAddUserAndNavigate} // Usa il nuovo handler
      />
    </div>
  );
};

export default Home;

