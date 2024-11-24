import Link from 'next/link';
import { User } from '../services/userServices';

interface UserListProps {
    users: User[];
}

export const UserList = ({ users }: UserListProps): JSX.Element => {
    return (
        <>
        </>
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //     {users.map((user) => (
        //         <div
        //             key={user._id}
        //             className="border p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow"
        //         >
        //             <Link href={`/utente/${user._id}`} className="block">
        //                 <h2 className="font-semibold text-lg">{`${user.nome} ${user.cognome}`}</h2>
        //                 <p className="text-sm text-gray-600">{user.email}</p>
        //             </Link>
        //         </div>
        //     ))}
        // </div>
    );
};
