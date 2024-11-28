import { FC } from "react";
import Link from "next/link";

import { User } from "../interfaces/userInterfaces";

/**
 * Proprietà del componente `UserCard`.
 *
 * @typedef {Object} UserCardProps
 * @property {User} user - Oggetto utente contenente i dati da visualizzare nella card.
 */
interface UserCardProps {
    user: User;
}

/**
 * Componente `UserCard` per visualizzare le informazioni di un utente in formato card.
 *
 * @component
 * @param {UserCardProps} props - Proprietà passate al componente.
 * @returns {JSX.Element} - Card che rappresenta un utente.
 *
 * @example
 * <UserCard user={{ _id: "1", nome: "Mario", cognome: "Rossi", email: "mario.rossi@example.com" }} />
 */
const UserCard: FC<UserCardProps> = ({ user }) => {
    return (
        <div key={user._id} className="card-div group">
            {/* Link dinamico alla pagina dettagli utente */}
            <Link href={`/user/${user._id}`} key={user._id}>
                <div className="flex flex-col items-center text-center space-y-2">
                    {/* Iniziali dell'utente */}
                    <div className="card-initials-div">
                        {user.nome[0]}{user.cognome[0]}
                    </div>
                    {/* Nome e Cognome */}
                    <h3 className="font-semibold text-name-text text-sm">
                        {user.nome} {user.cognome}
                    </h3>
                    {/* Email con tooltip */}
                    <p className="card-email-p" title={user.email}>
                        {user.email}
                    </p>
                </div>
                {/* Overlay visibile al passaggio del mouse */}
                <div className="card-hover-overlay">
                    <p className="text-foreground font-semibold text-sm">Click to show details</p>
                </div>
            </Link>
        </div>
    );
};

export default UserCard;
