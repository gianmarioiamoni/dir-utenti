"use client";

import { useState, useEffect } from "react";

import { useUsers } from "@/hooks/useUsers";
import { usePagination } from "@/hooks/usePagination";
import { useErrorHandling } from "@/hooks/useErrorHandling";

import Navbar from "@/components/NavBar";
import CreateUserModal from "@/components/CreateUserModal";

import { NewUser } from "@/interfaces/userInterfaces";

import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

export default function Home(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalItems, setTotalItems] = useState<number>(0);

  const { currentPage, totalPages, startPage, endPage, handlePageClick } = usePagination(totalItems, ITEMS_PER_PAGE);

  const { data: usersData, isLoading, isError, error, updateUsers } = useUsers(currentPage, ITEMS_PER_PAGE);
  
  useErrorHandling(isError, error);

  // Aggiorna il totale degli utenti quando i dati vengono recuperati
  useEffect(() => {
    if (usersData) {
      setTotalItems(usersData.total);
    }
  }, [usersData]);

  const handleAddUser = async (newUser: NewUser): Promise<void> => {
    try {
      if (usersData?.users) {
        await updateUsers(newUser, usersData.total + 1);
      }
    } catch (error) {
      console.error("*** handleAddUser: Errore durante l'aggiunta dell'utente:", error);
      throw error;
    }
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="loader"></div>
        <p className="text-center text-gray-500">Caricamento Utenti...</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onAddUser={() => setIsModalOpen(true)} />

      {/* Modal Creazione User */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        // updateUsers={updateUsers} 
        // total={total}
        handleAddUser={handleAddUser}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="title">Elenco Utenti</h1>

        {/* Lista Utenti */}
        <main className="main-container">
          {usersData?.users?.map((user) => (
            <div key={user._id} className="card-div group">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="card-initials-div">{user.nome[0]}{user.cognome[0]}</div>
                <h3 className="font-semibold text-name-text text-sm">{user.nome} {user.cognome}</h3>
                <p className="card-email-p" title={user.email}>{user.email}</p>
              </div>
              <div className="card-hover-overlay">
                <p className="text-foreground font-semibold text-sm">Click to show details</p>
              </div>
            </div>
          ))}
        </main>

        {/* Paginazione */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startPage={startPage}
          endPage={endPage}
          handlePageClick={handlePageClick}
        />

        {/* Intervallo di pagine */}
        <div className="text-center mt-4 text-gray-500">
          {ITEMS_PER_PAGE * (currentPage - 1) + 1}-{Math.min(ITEMS_PER_PAGE * currentPage, usersData?.total || 0)} di {usersData?.total} utenti
        </div>

      </div>
    </div>
  );
}

