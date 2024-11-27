import { useState } from "react";

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageLimit = 5;

  const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        console.log("currentPage: ", currentPage);
    }
  };

  return {
    currentPage,
    totalPages,
    startPage,
    endPage,
    handlePageClick,
    setCurrentPage,
  };
};
