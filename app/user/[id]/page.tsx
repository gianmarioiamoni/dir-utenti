// /app/utente/[id]/page.tsx
import { GetServerSideProps } from 'next';
import { format } from 'date-fns';

import { fetchUserDetails, User } from '../../../services/userServices';

interface UserDetailProps {
    user: User;
}

export const UserDetail = ({ user }: UserDetailProps) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">
                {user.nome} {user.cognome}
            </h1>
            <p>Email: {user.email}</p>
            <p>Data di nascita: {format(user.dataNascita, 'dd/MM/yyyy')}</p>
            {/* Altri dettagli utente */}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };
    const user = await fetchUserDetails(id);

    return {
        props: { user },
    };
};

export default UserDetail;
