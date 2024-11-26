import { format } from "date-fns";
import { fetchUserDetails } from "@/services/userServices";
import Link from "next/link";

// Funzione per calcolare l'età
const calculateAge = (birthDate: string | Date): number => {
    const birth = new Date(birthDate); // Converte in oggetto Date
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    // Se non hai ancora compiuto gli anni quest'anno
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

interface UserDetailProps {
    params: { id: string };
}

// La funzione async per il recupero dei dettagli dell'utente
const UserDetail = async ({ params }: UserDetailProps) => {
    // Esegue l'await su params per accedere al valore di 'id'
    const { id } = await params;

    // Recupera i dettagli dell'utente
    const user = await fetchUserDetails(id);

    // Calcola l'età
    const age = calculateAge(user.dataNascita);

    // Renderizza i dettagli dell'utente
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <nav className="mb-4">
                <ol className="list-reset flex text-sm text-gray-600">
                    <li>
                        <Link href="/" className="hover:text-blue-500">Home</Link>
                        <span className="mx-2">/</span>
                    </li>
                    <li>
                        <Link href="/user" className="hover:text-blue-500">Users</Link>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="text-gray-500">{user.nome} {user.cognome}</li>
                </ol>
            </nav>

            <h1 className="text-3xl font-semibold mb-6 text-gray-800">{user.nome} {user.cognome}</h1>

            {/* Dettagli Utente */}
            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
                {/* Foto Profilo */}
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
                    <img
                        src={user.fotoProfilo || "/default-avatar.png"}
                        alt="Foto Profilo"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Dettagli */}
                <div className="flex flex-col space-y-4">
                    <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
                    <p className="text-lg text-gray-700"><strong>Età:</strong> {age}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
