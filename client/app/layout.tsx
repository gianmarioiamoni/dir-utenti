// /app/layout.tsx
"use client";

import "./globals.css";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ToastContainer
            position="top-right" // Posizione del toast
            autoClose={5000}     // Tempo di auto-chiusura in millisecondi
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored" // Può essere "light", "dark" o "colored"
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
