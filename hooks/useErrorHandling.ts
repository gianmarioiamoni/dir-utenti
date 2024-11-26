import { useEffect } from "react";
import { toast } from "react-toastify";

export const useErrorHandling = (isError: boolean, error: unknown) => {
  useEffect(() => {
    if (isError) {
      toast.error(
        error instanceof Error ? error.message : "Errore generico nel caricamento dati"
      );
    }
  }, [isError, error]);
};
