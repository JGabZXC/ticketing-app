import { useSubmit } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ticketActions } from "../../store/ticketSlice";
export default function Pagination({ currentPage, totalPages }) {
  const submit = useSubmit();
  const dispatch = useDispatch();

  if (currentPage > totalPages) {
    dispatch(ticketActions.setPage(1));
    const page = 1;
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    submit(params, { method: "GET" });
  }

  function handlePageChange(newPage) {
    dispatch(ticketActions.setPage(newPage));
    const page = newPage;
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    submit(params, { method: "GET" });
  }

  return (
    <div className="flex gap-4 justify-center mt-4">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-slate-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <span className="text-slate-600">
        Pages {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-slate-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
}
