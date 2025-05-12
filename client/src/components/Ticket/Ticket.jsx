import { useState, useEffect } from "react";

import CardTicket from "./CardTicket";
import CreateTicket from "./CreateTicket";
import Button from "../ui/button";

export default function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false); // Toggle between list and form
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

  // Fetch tickets from the server
  useEffect(() => {
    async function fetchTickets() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/v1/tickets?page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        console.log(data);
        setTickets(data.data.tickets);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [currentPage]);

  function handlePageChange(newPage) {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }

  async function handleCreateTicket(formData) {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/tickets", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      const newTicket = await response.json();
      if (currentPage === 1) {
        setTickets((prevTickets) => [
          newTicket.data.ticket,
          ...prevTickets.slice(0, 19),
        ]);
      } else {
        setCurrentPage(1);
      }

      // Update the total number of pages if necessary
      if (tickets.length >= 20) {
        setTotalPages((prevTotalPages) => prevTotalPages + 1);
      }
      setIsCreating(false); // Return to ticket list
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10">
      {loading && <p className="text-green-300 text-center">Loading...</p>}
      {error && <p className="text-red-300 text-center">{error}</p>}

      {isCreating ? (
        <CreateTicket
          onCancel={() => setIsCreating(false)}
          onCreate={handleCreateTicket}
        />
      ) : (
        <>
          <Button
            type="button"
            className="cursor-pointer my-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={() => setIsCreating(true)}
          >
            Create Ticket
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <CardTicket ticket={ticket} key={ticket._id} />
              ))
            ) : (
              <p className="text-gray-500 text-center">No tickets available.</p>
            )}
          </div>
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
