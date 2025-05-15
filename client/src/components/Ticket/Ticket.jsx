import { useState, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import TicketContext from "../../store/TicketContext";

import CardTicket from "./CardTicket";
import CreateTicket from "./CreateTicket";
import Button from "../ui/button";
import Select from "../ui/select";

export default function Ticket() {
  const { user } = useContext(AuthContext);
  const {
    tickets,
    loading,
    currentPage,
    totalPages,
    setCurrentPageNext,
    setCurrentPagePrev,
    setOrderByHandler,
    setLimitHandler,
    setFilterPriorityHandler,
  } = useContext(TicketContext);
  const [isCreating, setIsCreating] = useState(false);

  function handlePageChange(direction) {
    if (direction === "next") setCurrentPageNext();
    else direction === "prev" && setCurrentPagePrev();
  }

  return (
    <div className="mt-10 px-2">
      {loading && (
        <div className="flex gap-2 justify-center items-center w-full">
          <svg
            aria-hidden="true"
            class="inline w-4 h-4 text-gray-200 animate-spin fill-green-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <p className="text-green-300 text-center">Loading</p>
        </div>
      )}

      {isCreating ? (
        <CreateTicket
          onCancel={() => {
            setIsCreating(false);
          }}
          onCreate={() => console.log("Ticket created successfully")}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            {user && (
              <div>
                <Button
                  type="button"
                  className="cursor-pointer my-2 py-2 px-4 rounded-md text-stone-100 bg-indigo-600 hover:bg-indigo-700 transition duration-200 font-medium"
                  onClick={() => setIsCreating(true)}
                >
                  Create Ticket
                </Button>
              </div>
            )}
            <div className="flex justify-end gap-4">
              <Select
                labelText="Order By"
                id="orderBy"
                name="orderBy"
                onChange={(e) => setOrderByHandler(e.target.value)}
              >
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
              </Select>
              <Select
                labelText="Show Tickets"
                id="limit"
                name="limit"
                onChange={(e) => setLimitHandler(e.target.value)}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Select>
              <Select
                labelText="Filter By Priority"
                id="filterPriority"
                name="filterPriority"
                onChange={(e) => setFilterPriorityHandler(e.target.value)}
              >
                <option value={"all"}>All</option>
                <option value={"low"}>Low</option>
                <option value={"medium"}>Medium</option>
                <option value={"high"}>High</option>
              </Select>
            </div>
          </div>

          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <CardTicket ticket={ticket} key={ticket._id} />
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No tickets available.
                </p>
              )}
            </div>
          )}

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
        </>
      )}
    </div>
  );
}
