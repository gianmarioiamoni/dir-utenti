import { FC } from "react";

interface LoaderProps {
    isLoading: boolean;
}

const Loader: FC<LoaderProps> = ({ isLoading }) => {
    return isLoading ? (
        <div className="flex flex-col items-center justify-center loader-container">
            <div className="loader" />
            <p className="loader-text">Caricamento Utenti...</p>
        </div>
    ) : null;
};

export default Loader;