import { useEffect } from "react";
import { useMessage } from "./useMessage";

export const useErrorHandling = (isError: boolean, error: unknown) => {
  const { showError } = useMessage();

  useEffect(() => {
    if (isError) {
      showError(
        error instanceof Error
          ? error.message
          : "Errore generico nel caricamento dati"
      );
    }
  }, [isError, error, showError]);
};
