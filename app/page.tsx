"use client";

import { FC, useState, useEffect } from "react";

import { useUsers } from "@/hooks/useUsers";
import { useErrorHandling } from "@/hooks/useErrorHandling";

import Link from "next/link";

import Navbar from "@/components/NavBar";
import CreateUserModal from "@/components/CreateUserModal";
import Pagination from "@/components/Pagination";
import UserCard from "@/components/UserCard";

const ITEMS_PER_PAGE = 10;

const Home: FC = () => {
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const {
    data: usersData,
    isLoading,
    isError,
    error,
    isModalOpen,
    setIsModalOpen,
    onCloseModal,
    handleAddUser,
  } = useUsers(page, ITEMS_PER_PAGE);

  useErrorHandling(isError, error);

  useEffect(() => {
    if (usersData) {
      setTotalUsers(usersData.total);
    }
  }, [usersData]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="loader" />
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
            // User Card
            <UserCard key={user._id} user={user} />
          ))}
        </main>

        {/* Paginazione */}
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={totalUsers}
          currentPage={page}
          handlePageClick={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};


export default Home;