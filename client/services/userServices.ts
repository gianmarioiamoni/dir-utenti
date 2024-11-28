import axios from "axios";
import { User, NewUser, FetchUsersResponse } from "@/interfaces/userInterfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Recupera una lista di utenti con paginazione.
 *
 * @param {number} page - Il numero di pagina da recuperare.
 * @param {number} limit - Il numero massimo di utenti per pagina.
 * @returns {Promise<FetchUsersResponse>} Una Promise che restituisce i dati degli utenti con paginazione.
 *
 * @throws {Error} Se si verifica un errore durante il recupero dei dati.
 *
 * @example
 * const { users, total } = await fetchUsers(1, 10);
 */
export const fetchUsers = async (
  page: number,
  limit: number
): Promise<FetchUsersResponse> => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { page, limit, fields: "nome,cognome,email" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Recupera i dettagli di un singolo utente tramite ID.
 *
 * @param {string} id - L'ID dell'utente da recuperare.
 * @returns {Promise<User>} Una Promise che restituisce i dettagli dell'utente.
 *
 * @throws {Error} Se si verifica un errore durante il recupero dei dati.
 *
 * @example
 * const userDetails = await fetchUserDetails("123");
 */
export const fetchUserDetails = async (id: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Aggiunge un nuovo utente al sistema.
 *
 * @param {NewUser} user - I dettagli dell'utente da aggiungere.
 * @returns {Promise<User>} Una Promise che restituisce i dettagli dell'utente appena creato.
 *
 * @throws {Error} Se si verifica un errore durante l'aggiunta dell'utente o se l'email è già in uso.
 *
 * @example
 * const newUser = { nome: "Mario", cognome: "Rossi", email: "mario@example.com" };
 * const addedUser = await addUser(newUser);
 */
export const addUser = async (user: NewUser): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);

    // Check if response contains status 409 (email già in uso)
    if (response.status === 409) {
      throw new Error("Email già in uso.");
    }
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 409) {
      throw new Error("Email già in uso. Utilizzare un altro indirizzo email.");
    }
    throw new Error("Errore durante l'aggiunta dell'utente.");
  }
};
