import { FC } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    handlePageClick: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    startPage,
    endPage,
    handlePageClick
}) => {

    return (
        <div className="paging-div">
            {/* Bottone Prima Pagina */}
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageClick(1)}
                title={currentPage === 1 ? "" : "Vai alla prima pagina"}
                className={`${currentPage === 1 ? "btn-inactive" : "btn"}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 6l-6 6 6 6M6 6v12"
                    />
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
                            className={`${currentPage === pageNumber
                                ? "paging-number-btn"
                                : "paging-number-btn-inactive"
                                } transition`}
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18l6-6-6-6m12 0v12"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
