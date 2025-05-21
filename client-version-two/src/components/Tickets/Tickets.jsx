import { useSelector } from "react-redux";
import TicketButtons from "./TicketButtons";
import CardTicket from "./CardTicket";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function Tickets({ tickets, totalPages }) {
  const currentPage = useSelector((state) => state.tickets.page);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.search]);

  return (
    <section className="p-4 mt-10">
      <TicketButtons />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {tickets.length > 0 &&
            tickets.map((ticket) => (
              <CardTicket key={ticket._id} ticket={ticket} />
            ))}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}
