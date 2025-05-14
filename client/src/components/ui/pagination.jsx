import Button from "./button";

export default function Pagination({
  handlePageChange,
  currentPage,
  totalPages,
}) {
  return (
    <div className="flex justify-center items-center gap-4 m-6">
      <Button
        type="button"
        className="px-4 py-2 text-gray-700 hover:text-gray-300"
        onClick={() => handlePageChange("prev")}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </Button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        type="button"
        className="px-4 py-2 text-gray-700 hover:text-gray-300"
        onClick={() => handlePageChange("next")}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </Button>
    </div>
  );
}
