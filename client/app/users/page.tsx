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

const UsersList: FC = () => {
  const [page, setPage] = useState(1); // Gestisce la pagina attuale per la paginazione
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

  useErrorHandling(isError, error); // Gestione degli errori

  // Loader durante il caricamento dei dati
  <Loader isLoading={isLoading} /> 

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onAddUser={() => setIsModalOpen(true)} />

      {/* Modal per creare un nuovo utente */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        handleAddUser={handleAddUser}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="title">Elenco Utenti</h1>

        {/* Lista Utenti */}
        <main className="main-container">
          {usersData?.users?.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </main>

        {/* Paginazione */}
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={usersData?.total || 0} // Usa i dati dalla query
          currentPage={page}
          handlePageClick={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default UsersList;
