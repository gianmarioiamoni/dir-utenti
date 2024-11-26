"use client";

import { FC, useState, useEffect } from "react";

import { useUsers } from "@/hooks/useUsers";
import { usePagination } from "@/hooks/usePagination";
import { useErrorHandling } from "@/hooks/useErrorHandling";

import Link from "next/link";

import Navbar from "@/components/NavBar";
import CreateUserModal from "@/components/CreateUserModal";

import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

const Home: FC = () => {
  const [totalItems, setTotalItems] = useState<number>(0);

  const { currentPage } = usePagination(totalItems, ITEMS_PER_PAGE);

  const { data: usersData, isLoading, isError, error, isModalOpen, setIsModalOpen, onCloseModal, handleAddUser } = useUsers(currentPage, ITEMS_PER_PAGE);
  
  useErrorHandling(isError, error);

  // Aggiorna il totale degli utenti quando i dati vengono recuperati
  useEffect(() => {
    if (usersData) {
      setTotalItems(usersData.total);
    }
  }, [usersData]);


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
        handleAddUser={handleAddUser}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="title">Elenco Utenti</h1>

        {/* Lista Utenti */}
        <main className="main-container">
          {usersData?.users?.map((user) => (
            
            <div key={user._id} className="card-div group">
              <Link href={`/user/${user._id}`} key={user._id}>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="card-initials-div">{user.nome[0]}{user.cognome[0]}</div>
                <h3 className="font-semibold text-name-text text-sm">{user.nome} {user.cognome}</h3>
                <p className="card-email-p" title={user.email}>{user.email}</p>
              </div>
              <div className="card-hover-overlay">
                <p className="text-foreground font-semibold text-sm">Click to show details</p>
                </div>
              </Link>
            </div>
            
          ))}
        </main>

        {/* Paginazione */}
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={totalItems}
        />

      </div>
    </div>
  );
}


export default Home;