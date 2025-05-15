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
  setError: () => {},
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

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        setLoading(true);
        let response;

        if (filterByPriority !== "all") {
          response = await fetch(
            `http://localhost:3000/api/v1/tickets/priority/${filterByPriority}?page=${currentPage}&limit=${limit}&sort=${orderBy}&getmyticket=${getMyTicket}`
          );
        } else {
          response = await fetch(
            `http://localhost:3000/api/v1/tickets?page=${currentPage}&limit=${limit}&sort=${orderBy}`
          );
        }

        console.log(response);

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

  const contextValue = {
    tickets,
    selectedTicketId,
    handleCreateTicket,
    loading,
    error,
    currentPage,
    totalPages,
    setOrderBy,
    limit,
    setCurrentPageNext,
    setCurrentPagePrev,
    setLimitHandler,
    setOrderByHandler,
    setTotalPagesHandler,
    setSelectedTicketHandler,
    addCommentToSelectedTicket,
    setFilterPriorityHandler,
  };

  return <TicketContext value={contextValue}>{children}</TicketContext>;
}

export default TicketContext;
