import axios from "axios";

import {User, NewUser, FetchUsersResponse} from "@/interfaces/userInterfaces"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";


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

export const fetchUserDetails = async (id: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (user: NewUser): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);

    // check if response contains status 409
    if (response.status === 409) {
      throw new Error("Email già in uso.");
    }
    return response.data;
  } catch (error: any) {
    if (error.response.status === 409) {
      throw new Error("Email già in uso. Utilizzare un altro indirizzo email.");
    }
    throw new Error("Errore durante l'aggiunta dell'utente.");    
  }
};