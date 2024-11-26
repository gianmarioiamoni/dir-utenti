"use client";

import { useState, useEffect } from "react";
import { useUsers } from "../hooks/useUsers";

import { toast } from "react-toastify";

import Navbar from "@/components/NavBar";
import CreateUserModal from "@/components/CreateUserModal";
import { User, NewUser } from "@/interfaces/userInterfaces";

const ITEMS_PER_PAGE = 10;

export default function Home(): JSX.Element {
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: usersData, isLoading, isError, error, updateUsers } = useUsers(page, ITEMS_PER_PAGE);

  let { total = 0 } = usersData || {};
  const users = usersData?.users || [];

  const TOTAL_PAGES = Math.ceil(total / ITEMS_PER_PAGE);

  // Calcolo le pagine da visualizzare
  const PAGE_LIMIT = 5; // Mostra al massimo 5 bottoni per gruppo
  const startPage = Math.floor((page - 1) / PAGE_LIMIT) * PAGE_LIMIT + 1;
  const endPage = Math.min(startPage + PAGE_LIMIT - 1, TOTAL_PAGES);

  // Gestione errori con Toast
  useEffect(() => {
    if (isError) {
      toast.error(
        error instanceof Error ? error.message : "Errore generico nel caricamento dati"
      );
    }
  }, [isError, error]);

  // Gestione click su pagina
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= TOTAL_PAGES) {
      setPage(pageNumber);
    }
  };

  // Gestione click sul bottone "Aggiungi Utente"
  const handleAddUser = async (newUser: NewUser): Promise<void> => {
    try {
      if (usersData?.users) {
        await updateUsers(newUser, usersData.total + 1);
      }
    } catch (error) {
      console.error("*** handleAddUser: Errore durante l'aggiunta dell'utente:", error);
      throw(error);
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
          {users?.map((user) => (
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
        <div className="paging-div">
          {/* Bottone Prima */}
          <button
            disabled={page === 1}
            onClick={() => handlePageClick(1)}
            title={page === 1 ? "" : "Vai alla prima pagina"}
            className={`${page === 1 ? "btn-inactive" : "btn"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 6l-6 6 6 6M6 6v12"
              />
            </svg>
          </button>

          {/* Bottone Precedente Gruppo */}
          <button
            disabled={startPage === 1}
            onClick={() => handlePageClick(startPage - 1)}
            title={startPage === 1 ? "" : "Gruppo precedente"}
            className={`${startPage === 1 ? "btn-inactive" : "btn"}`}
          >
            «
          </button>

          {/* Indicatori numerici delle pagine */}
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
              const pageNumber = startPage + index;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  className={`${page === pageNumber
                    ? "paging-number-btn"
                    : "paging-number-btn-inactive"
                    } transition`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          {/* Bottone Successivo Gruppo */}
          <button
            disabled={endPage === TOTAL_PAGES}
            onClick={() => handlePageClick(endPage + 1)}
            title={endPage === TOTAL_PAGES ? "" : "Gruppo successivo"}
            className={`${endPage === TOTAL_PAGES ? "btn-inactive" : "btn"}`}
          >
            »
          </button>

          {/* Bottone Ultima */}
          <button
            disabled={page === TOTAL_PAGES}
            onClick={() => handlePageClick(TOTAL_PAGES)}
            title={page === TOTAL_PAGES ? "" : "Vai all'ultima pagina"}
            className={`${page === TOTAL_PAGES ? "btn-inactive" : "btn"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18l6-6-6-6m12 0v12"
              />
            </svg>
          </button>
        </div>

        {/* Intervallo di pagine */}
        <div className="text-center mt-4 text-gray-500">
          {ITEMS_PER_PAGE * (page - 1) + 1}-{Math.min(ITEMS_PER_PAGE * page, total)} di {total} utenti
        </div>
      </div>
    </div>
  );
}

