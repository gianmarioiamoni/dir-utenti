import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers } from "../services/userServices";
import { FetchUsersResponse, User } from "@/interfaces/userInterfaces";

export const useUsers = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  // React Query per ottenere i dati
  const { data, isLoading, isError, error } = useQuery<FetchUsersResponse>({
    queryKey: ["users", page, limit], // Unico identificativo per la query
    queryFn: () => fetchUsers(page, limit), // Funzione di fetch
    staleTime: 30000, // Ottimizzazione: evita di rifare richieste entro 30s
  });

  // Funzione per aggiornare manualmente i dati nella cache
  const updateUsers = (newUser: User, newTotal: number) => {
    // Aggiorniamo manualmente la cache di React Query
    const n_users = data?.users.length || 0;
    // TODO: AGGIORNARE _id CON VALORE restituito da MongoDB
    newUser._id = `${n_users + 1}`;
    const newUsers =
      n_users < limit
        ? [...(data?.users ?? []), newUser]
        : [...(data?.users ?? [])];

    queryClient.setQueryData<FetchUsersResponse>(["users", page, limit], {
      users: newUsers,
      total: newTotal,
    });
  };

  return {
    data,
    isLoading,
    isError,
    error,
    updateUsers, 
  };
};
