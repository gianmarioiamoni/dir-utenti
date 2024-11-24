"use client";

import { useState, useEffect } from "react";
import { fetchUsers, User } from "../services/userServices";

export const useUsers = (initialPage: number, limit: number) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers(page, limit);
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Errore durante il caricamento");
      }
      setLoading(false);
    };

    loadUsers();
  }, [page, limit]);

  return { users, page, setPage, loading, error };
};
