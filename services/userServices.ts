import axios from "axios";

import {User, FetchUsersResponse} from "@/interfaces/userInterfaces"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";


export const fetchUsers = async (
  page: number,
  limit: number
): Promise<FetchUsersResponse> => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
    params: { page, limit, fields: "nome,cognome,email" },
  });
  console.log("fetchUsers - response.data", response.data);
  return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
  
};

export const fetchUserDetails = async (id: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/utenti/${id}`);
  return response.data;
};

export const addUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
