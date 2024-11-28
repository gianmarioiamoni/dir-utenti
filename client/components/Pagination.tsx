import { FC } from "react";

/**
 * Proprietà del componente `Pagination`.
 *
 * @typedef {Object} PaginationProps
 * @property {number} itemsPerPage - Numero di elementi mostrati per pagina.
 * @property {number} totalItems - Numero totale di elementi da paginare.
 * @property {number} currentPage - Pagina attualmente selezionata.
 * @property {(page: number) => void} handlePageClick - Funzione callback invocata al cambio di pagina.
 */
interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    handlePageClick: (page: number) => void;
}

/**
 * Componente Pagination per la gestione della paginazione.
 *
 * @component
 * @param {PaginationProps} props - Proprietà passate al componente.
 * @returns {JSX.Element} - Interfaccia di paginazione.
 *
 * @example
 * <Pagination
 *   itemsPerPage={10}
 *   totalItems={50}
 *   currentPage={1}
 *   handlePageClick={(page) => console.log("Pagina selezionata:", page)}
 * />
 */
const Pagination: FC<PaginationProps> = ({
    itemsPerPage,
    totalItems,
    currentPage,
    handlePageClick
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Numero totale di pagine
    const pageLimit = 5; // Numero massimo di pagine visibili in un gruppo

    // Calcolo dell'intervallo di pagine visibili
    const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);

    return (
        <div className="flex flex-col items-center justify-center my-8">
            <div className="paging-div">
                {/* Bottone Prima Pagina */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageClick(1)}
                    title={currentPage === 1 ? "" : "Vai alla prima pagina"}
                    className={`${currentPage === 1 ? "btn-inactive" : "btn"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 6l-6 6 6 6M6 6v12" />
                    </svg>
                </button>

                {/* Bottone Gruppo Precedente */}
                <button
                    disabled={startPage === 1}
                    onClick={() => handlePageClick(startPage - 1)}
                    title={startPage === 1 ? "" : "Gruppo precedente"}
                    className={`${startPage === 1 ? "btn-inactive" : "btn"}`}
                >
                    «
                </button>

                {/* Indicatori numerici delle pagine */}
                <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                        const pageNumber = startPage + index;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageClick(pageNumber)}
                                className={`${currentPage === pageNumber ? "paging-number-btn" : "paging-number-btn-inactive"} transition`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>

                {/* Bottone Gruppo Successivo */}
                <button
                    disabled={endPage === totalPages}
                    onClick={() => handlePageClick(endPage + 1)}
                    title={endPage === totalPages ? "" : "Gruppo successivo"}
                    className={`${endPage === totalPages ? "btn-inactive" : "btn"}`}
                >
                    »
                </button>

                {/* Bottone Ultima Pagina */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    title={currentPage === totalPages ? "" : "Vai all'ultima pagina"}
                    className={`${currentPage === totalPages ? "btn-inactive" : "btn"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18l6-6-6-6m12 0v12" />
                    </svg>
                </button>
            </div>
            {/* Intervallo di pagine */}
            <div className="text-center mt-4 text-gray-500">
                {itemsPerPage * (currentPage - 1) + 1}-{Math.min(itemsPerPage * currentPage, totalItems || 0)} di {totalItems} utenti
            </div>
        </div>
    );
};

export default Pagination;
