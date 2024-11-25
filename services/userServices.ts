import axios from "axios";

import {User, FetchUsersResponse} from "@/interfaces/userInterfaces"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";




export const fetchUsers = async (
  page: number,
  limit: number
): Promise<FetchUsersResponse> => {
  const response = await axios.get(`${API_URL}/users`, {
    params: { page, limit, fields: "nome,cognome,email" },
  });
  console.log("fetchUsers - response.data", response.data);
  return response.data;
};

export const fetchUserDetails = async (id: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/utenti/${id}`);
  return response.data;
};
