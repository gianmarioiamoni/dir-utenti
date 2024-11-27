import { FC } from "react";
import Link from "next/link";

import { User } from "../interfaces/userInterfaces";

interface UserCardProps {
    user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
    
    return(
    <div key={user._id} className="card-div group">
        <Link href={`/user/${user._id}`} key={user._id}>
            <div className="flex flex-col items-center text-center space-y-2">
                <div className="card-initials-div">{user.nome[0]}{user.cognome[0]}</div>
                <h3 className="font-semibold text-name-text text-sm">{user.nome} {user.cognome}</h3>
                <p className="card-email-p" title={user.email}>{user.email}</p>
            </div>
            <div className="card-hover-overlay">
                <p className="text-foreground font-semibold text-sm">Click to show details</p>
            </div>
        </Link>
        </div>
    )
};

export default UserCard;