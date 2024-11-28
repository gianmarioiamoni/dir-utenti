import { fetchUserDetails } from "@/services/userServices";
import Link from "next/link";

/**
 * Calcola l'età di un utente basandosi sulla data di nascita.
 *
 * @param {string | Date} birthDate - La data di nascita dell'utente in formato stringa o oggetto Date.
 * @returns {number} - L'età calcolata dell'utente.
 */
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

/**
 * Proprietà del componente `UserDetail`.
 *
 * @typedef {Object} UserDetailProps
 * @property {Object} params - Parametri URL forniti da Next.js.
 * @property {string} params.id - ID dell'utente da recuperare.
 */
interface UserDetailProps {
    params: { id: string };
}

/**
 * Componente asincrono per visualizzare i dettagli di un utente specifico.
 *
 * @async
 * @param {UserDetailProps} props - Le proprietà passate al componente, incluso l'ID utente.
 * @returns {JSX.Element} - Il layout con i dettagli dell'utente.
 *
 * @example
 * // Esempio di utilizzo in una rotta dinamica di Next.js
 * <UserDetail params={{ id: "12345" }} />
 */
const UserDetail = async ({ params }: UserDetailProps): Promise<JSX.Element> => {
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
                        <Link href="/users" className="hover:text-blue-500">Users</Link>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="text-foreground font-semibold">{user.nome} {user.cognome}</li>
                </ol>
            </nav>

            <h1 className="text-3xl font-semibold mb-6 text-foreground">{user.nome} {user.cognome}</h1>

            {/* Dettagli Utente */}
            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
                {/* Foto Profilo */}
                <div className="w-32 h-32 text-foreground rounded-full overflow-hidden shadow-lg">
                    <img
                        src={user.fotoProfilo || "/default-avatar.png"}
                        alt="Foto Profilo"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Dettagli */}
                <div className="flex flex-col space-y-4">
                    <p className="text-lg text-foreground"><strong>Email:</strong> {user.email}</p>
                    <p className="text-lg text-foreground"><strong>Età:</strong> {age}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
