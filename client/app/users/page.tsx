"use client";

import { FC, useState } from "react";

import { useUsers } from "@/hooks/useUsers";
import { useErrorHandling } from "@/hooks/useErrorHandling";

import Navbar from "@/components/NavBar";
import CreateUserModal from "@/components/CreateUserModal";
import Pagination from "@/components/Pagination";
import UserCard from "@/components/UserCard";
import Loader from "@/components/Loader";

const ITEMS_PER_PAGE = 10;

/**
 * Componente che visualizza una lista di utenti con paginazione.
 * Include un navbar per aggiungere utenti, una modale per la creazione di nuovi utenti
 * e funzionalità per gestire gli errori e il caricamento dei dati.
 * 
 * @component
 * @returns {JSX.Element} - L'interfaccia utente per la lista degli utenti.
 */
const UsersList: FC = () => {
  const [page, setPage] = useState<number>(1); // Gestisce la pagina attuale per la paginazione

  const {
    data: usersData,
    isLoading,
    isError,
    error,
    isModalOpen,
    setIsModalOpen,
    onCloseModal,
    handleAddUser
  } = useUsers(page, ITEMS_PER_PAGE);

  // Gestione degli errori tramite hook personalizzato
  useErrorHandling(isError, error);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar con azione per aprire la modale */}
      <Navbar onAddUser={() => setIsModalOpen(true)} />

      {/* Modale per creare un nuovo utente */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        handleAddUser={handleAddUser}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="title">Elenco Utenti</h1>

        {/* Mostra il loader durante il caricamento dei dati */}
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader isLoading={isLoading} />
          </div>
        ) : (
          <>
            {/* Lista degli utenti */}
            <main className="main-container">
              {usersData?.users?.map((user) => (
                /**
                 * Card utente.
                 * @param {Object} user - Dati dell'utente.
                 * @param {string} user._id - ID univoco dell'utente.
                 * @returns {JSX.Element} - Componente che rappresenta un singolo utente.
                 */
                <UserCard key={user._id} user={user} />
              ))}
            </main>

            {/* Componente per la paginazione */}
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={usersData?.total || 0} // Totale utenti dal server
              currentPage={page}
              handlePageClick={(newPage: number) => setPage(newPage)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UsersList;
