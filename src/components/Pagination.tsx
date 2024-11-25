import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalJobs: number;
  jobsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalJobs,
  jobsPerPage,
}) => {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  return (
    <div className="flex justify-center items-center space-x-2">
      <Link
        to={`/page/${Math.max(1, currentPage - 1)}`}
        className={`p-2 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        <ChevronLeft size={24} />
      </Link>
      <span className="text-lg">
        Página {currentPage} de {totalPages}
      </span>
      <Link
        to={`/page/${Math.min(totalPages, currentPage + 1)}`}
        className={`p-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        <ChevronRight size={24} />
      </Link>
    </div>
  );
};

export default Pagination;
