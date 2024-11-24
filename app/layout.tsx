// /app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head />
      <body className="bg-gray-100">
        <header className="p-4 bg-blue-500 text-white">
          <h1 className="text-xl">Directory Utenti</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}