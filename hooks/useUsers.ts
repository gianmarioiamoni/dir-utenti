"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/userServices";

export const useUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => fetchUsers(page, limit),
    staleTime: 30000,
  });
};

