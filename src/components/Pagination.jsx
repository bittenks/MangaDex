import React from "react";

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  return (
    <div className="join grid grid-cols-2 mt-4">
      <button
        className="join-item btn btn-outline"
        onClick={onPrevPage}
        disabled={currentPage === 0}
      >
        Previous page
      </button>
      <button
        className="join-item btn btn-outline"
        onClick={onNextPage}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;