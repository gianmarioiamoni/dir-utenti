import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useMessage } from "@/hooks/useMessage";
import { fetchUsers, addUser } from "../services/userServices";
import { FetchUsersResponse, NewUser } from "@/interfaces/userInterfaces";

/**
 * Custom hook per la gestione degli utenti.
 * Recupera i dati degli utenti da un'API, gestisce l'aggiunta di nuovi utenti e la gestione di notifiche.
 *
 * @param {number} page - Il numero di pagina da recuperare.
 * @param {number} limit - Il numero massimo di utenti per pagina.
 *
 * @returns {object} Un oggetto contenente:
 * - `data` (FetchUsersResponse | undefined): I dati degli utenti.
 * - `isLoading` (boolean): Stato di caricamento dei dati.
 * - `isError` (boolean): Stato di errore nel recupero dei dati.
 * - `error` (unknown): Dettaglio dell'errore nel recupero dei dati.
 * - `refetch` (function): Funzione per ricaricare i dati degli utenti.
 * - `updateUsers` (function): Funzione per aggiungere un nuovo utente ai dati.
 * - `handleAddUser` (function): Funzione che gestisce l'aggiunta di un nuovo utente.
 * - `isModalOpen` (boolean): Stato che indica se il modal per aggiungere un nuovo utente è aperto.
 * - `setIsModalOpen` (function): Funzione per aprire/chiudere il modal.
 * - `onCloseModal` (function): Funzione per chiudere il modal.
 *
 * @example
 * const { data, isLoading, handleAddUser, setIsModalOpen } = useUsers(page, limit);
 * if (isLoading) {
 *   return <p>Loading...</p>;
 * }
 *
 * // Handling modal opening
 * setIsModalOpen(true);
 */
export const useUsers = (page: number, limit: number) => {
  const queryClient = useQueryClient();
  const { showSuccess } = useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } =
    useQuery<FetchUsersResponse>({
      queryKey: ["usersData", page, limit],
      queryFn: () => fetchUsers(page, limit),
      staleTime: 30000,
    });

  /**
   * Aggiunge un nuovo utente ai dati esistenti e aggiorna il cache di `react-query`.
   *
   * @param {NewUser} newUser - L'utente da aggiungere.
   * @param {number} newTotal - Il nuovo totale di utenti.
   *
   * @throws {Error} Se si verifica un errore durante l'aggiunta dell'utente.
   */
  const updateUsers = async (newUser: NewUser, newTotal: number) => {
    try {
      const addedUser = await addUser(newUser);

      const updatedUsers =
        (data?.users ?? []).length < limit
          ? [...(data?.users ?? []), addedUser]
          : [...(data?.users ?? [])];

      queryClient.setQueryData<FetchUsersResponse>(["usersData", page, limit], {
        users: updatedUsers,
        total: newTotal,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  /**
   * Funzione per gestire l'aggiunta di un nuovo utente.
   * Se l'utente viene aggiunto con successo, mostra un messaggio di successo.
   *
   * @param {NewUser} newUser - L'utente da aggiungere.
   *
   * @throws {Error} Se si verifica un errore durante l'aggiunta dell'utente.
   */
  const handleAddUser = async (newUser: NewUser): Promise<void> => {
    try {
      if (data?.users) {
        await updateUsers(newUser, data.total + 1);
        showSuccess("Utente creato con successo!");
      }
    } catch (error) {
      console.error(
        "*** handleAddUser: Errore durante l'aggiunta dell'utente:",
        error
      );
      throw error;
    }
  };

  /**
   * Funzione per chiudere il modal.
   */
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    updateUsers,
    handleAddUser,
    isModalOpen,
    setIsModalOpen,
    onCloseModal,
  };
};
