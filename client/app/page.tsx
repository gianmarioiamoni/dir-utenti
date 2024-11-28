"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useUsers } from "@/hooks/useUsers";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import Loader from "@/components/Loader";
import CreateUserModal from "@/components/CreateUserModal";

/**
 * Componente principale della pagina Home.
 * Mostra il messaggio di benvenuto, il numero totale di utenti, e fornisce opzioni
 * per aggiungere nuovi utenti o visualizzare la lista degli utenti esistenti.
 * 
 * @component
 * @returns {JSX.Element} - L'interfaccia utente della pagina Home.
 */
const Home: FC<{}> = () => {
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

  const [totalUsers, setTotalUsers] = useState<number>(0);

  // Gestione degli errori globali
  useErrorHandling(isError, error);

  /**
   * Aggiorna il numero totale di utenti quando cambia il valore di `data`.
   */
  useEffect(() => {
    if (data?.total) {
      setTotalUsers(data.total);
    }
  }, [data]);

  /**
   * Gestisce l'aggiunta di un nuovo utente e reindirizza alla pagina degli utenti.
   *
   * @async
   * @function
   * @param {Object} newUser - Oggetto contenente i dati del nuovo utente.
   * @returns {Promise<void>}
   */
  const handleAddUserAndNavigate = async (newUser: any): Promise<void> => {
    try {
      await handleAddUser(newUser);
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
          /**
           * Mostra il componente Loader se i dati sono in caricamento.
           */
          <Loader isLoading={isLoading} />
        ) : (
          <div className="mt-8 text-center">
            {totalUsers > 0 ? (
              <>
                <p className="text-gray-600">Numero totale di utenti: {totalUsers}</p>
                <div className="flex justify-center gap-4 mt-6">
                  <button onClick={() => setIsModalOpen(true)} className="btn-secondary">
                    Aggiungi Nuovo Utente
                  </button>
                  <Link href="/users" className="btn-primary">
                    Visualizza Lista Utenti
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600">Nessun utente trovato.</p>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-2">
                  Aggiungi Nuovo Utente
                </button>
              </>
            )}
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
