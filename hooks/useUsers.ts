import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchUsers, addUser } from "../services/userServices";
import { FetchUsersResponse, NewUser } from "@/interfaces/userInterfaces";

export const useUsers = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery<FetchUsersResponse>({
    queryKey: ["users", page, limit],
    queryFn: () => fetchUsers(page, limit),
    staleTime: 30000,
  });

  const updateUsers = async (newUser: NewUser, newTotal: number) => {
    try {
      const addedUser = await addUser(newUser);

      const updatedUsers =
        // nullish coalescing operator to provide a default value for data?.users when it's null or undefined
        (data?.users ?? []).length < limit
          ? [...(data?.users ?? []), addedUser]
          : [...(data?.users ?? [])];

      queryClient.setQueryData<FetchUsersResponse>(["users", page, limit], {
        users: updatedUsers,
        total: newTotal,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleAddUser = async (newUser: NewUser): Promise<void> => {
    try {
      if (data?.users) {
        await updateUsers(newUser, data.total + 1);
      }
    } catch (error) {
      console.error(
        "*** handleAddUser: Errore durante l'aggiunta dell'utente:",
        error
      );
      throw error;
    }
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    data,
    isLoading,
    isError,
    error,
    updateUsers,
    handleAddUser,
    isModalOpen,
    setIsModalOpen,
    onCloseModal,
  };
};
