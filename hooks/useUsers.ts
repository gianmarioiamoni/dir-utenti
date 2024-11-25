import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, addUser } from "../services/userServices";
import { FetchUsersResponse, User } from "@/interfaces/userInterfaces";

export const useUsers = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  // React Query per ottenere i dati
  const { data, isLoading, isError, error } = useQuery<FetchUsersResponse>({
    queryKey: ["users", page, limit], // Unico identificativo per la query
    queryFn: () => fetchUsers(page, limit), // Funzione di fetch
    staleTime: 30000, // Ottimizzazione: evita di rifare richieste entro 30s
  });


  const updateUsers = async (newUser: User, newTotal: number) => {
    try {
      // Invia l'utente al server
      const addedUser = await addUser(newUser);

      // Aggiorna manualmente la cache con i dati restituiti (incluso l'_id generato da MongoDB)
      const n_users = data?.users.length || 0;
      const updatedUsers =
        n_users < limit
          ? [...(data?.users ?? []), addedUser] // Aggiungi il nuovo utente alla lista
          : [...(data?.users ?? [])]; // Non aggiungere se la pagina è piena

      // 3. Aggiorna la cache di React Query
      queryClient.setQueryData<FetchUsersResponse>(["users", page, limit], {
        users: updatedUsers,
        total: newTotal,
      });
    } catch (error) {
      console.error("Errore durante l'aggiunta dell'utente:", error);
      throw new Error(
        "Non è stato possibile aggiungere l'utente. Riprova più tardi."
      );
    }
  };


  return {
    data,
    isLoading,
    isError,
    error,
    updateUsers, 
  };
};
