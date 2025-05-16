import { useState, createContext, useEffect } from "react";

const TicketContext = createContext({
  tickets: [],
  setTickets: () => {},
  handleCreateTicket: () => {},
  selectedTicketId: null,
  setSelectedTicket: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setErrorHandler: () => {},
  page: 1,
  setCurrentPageNext: () => {},
  setCurrentPagePrev: () => {},
  totalPages: 1,
  setTotalPagesHandler: () => {},
  orderBy: "-createdAt",
  setOrderByHandler: () => {},
  limit: 20,
  setLimitHandler: () => {},
  addCommentToSelectedTicket: () => {},
  filterByPriority: "all",
  setFilterPriorityHandler: () => {},
  setGetMyTicketHandler: () => {},
  message: null,
  setMessageHandler: () => {},
  updateTicketHandler: () => {},
  deleteTicketHandler: () => {},
});

export function TicketContextProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [limit, setLimit] = useState(20);
  const [error, setError] = useState(null);
  const [filterByPriority, setFilterPriority] = useState("all");
  const [getMyTicket, setGetMyTicket] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        setLoading(true);
        let response;

        const baseUrl = "http://localhost:3000/api/v1";
        let url = "";

        if (getMyTicket) {
          if (filterByPriority === "all") {
            url = `${baseUrl}/users/${getMyTicket}/tickets?page=${currentPage}&limit=${limit}&sort=${orderBy}`;
          } else {
            url = `${baseUrl}/tickets/priority/${filterByPriority}?page=${currentPage}&limit=${limit}&sort=${orderBy}&getmyticket=${getMyTicket}`;
          }
        } else if (filterByPriority !== "all") {
          url = `${baseUrl}/tickets/priority/${filterByPriority}?page=${currentPage}&limit=${limit}&sort=${orderBy}`;
        } else {
          url = `${baseUrl}/tickets?page=${currentPage}&limit=${limit}&sort=${orderBy}`;
        }

        response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        setTickets(data.data.tickets);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [currentPage, limit, orderBy, filterByPriority, getMyTicket]);

  function setErrorHandler(errorMessage) {
    setError(errorMessage);
  }

  function setCurrentPageNext() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function setCurrentPagePrev() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function setLimitHandler(limit) {
    setLimit(limit);
  }

  function setOrderByHandler(sortBy) {
    setOrderBy(sortBy);
  }

  function setTotalPagesHandler(totalPages) {
    setTotalPages(totalPages);
  }

  function setSelectedTicketHandler(ticketId) {
    setSelectedTicketId(ticketId);
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create ticket");
      }

      const data = await response.json();

      if (tickets.length === 20) {
        setTickets((prevTickets) => [
          data.data.ticket,
          ...prevTickets.slice(0, 19),
        ]);
      } else {
        setTickets((prevTickets) => [data.data.tickets, ...prevTickets]);
      }
      setMessage("Ticket created successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function addCommentToSelectedTicket(comment) {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket._id === selectedTicketId
          ? { ...ticket, comments: [...ticket.comments, comment] }
          : ticket
      )
    );
  }

  function setFilterPriorityHandler(priority) {
    setFilterPriority(priority);
  }

  function setGetMyTicketHandler(id) {
    setGetMyTicket(id);
  }

  function setMessageHandler(message) {
    setMessage(message);
  }

  async function updateTicketHandler(ticketId, fd) {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/v1/tickets/${ticketId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...fd,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch ticket");
      }
      setMessage("Ticket updated successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTicketHandler(ticketId) {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/v1/tickets/${ticketId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete ticket");
      }

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== ticketId)
      );
      setMessage("Ticket deleted successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const contextValue = {
    tickets,
    selectedTicketId,
    handleCreateTicket,
    loading,
    error,
    currentPage,
    totalPages,
    orderBy,
    filterByPriority,
    limit,
    setErrorHandler,
    setCurrentPageNext,
    setCurrentPagePrev,
    setLimitHandler,
    setOrderByHandler,
    setTotalPagesHandler,
    setSelectedTicketHandler,
    addCommentToSelectedTicket,
    setFilterPriorityHandler,
    setGetMyTicketHandler,
    message,
    setMessageHandler,
    updateTicketHandler,
    deleteTicketHandler,
  };

  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
}

export default TicketContext;
