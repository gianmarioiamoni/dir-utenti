import { useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";

export const useMessage = () => {
  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  return { showError, showSuccess };
};
