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
    <section className="p-4 mt-5">
      <TicketButtons totalPages={totalPages} />

      {tickets.length !== 0 ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {tickets.length > 0 &&
                  tickets.map((ticket) => (
                    <CardTicket key={ticket._id} ticket={ticket} />
                  ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-xl text-slate-700 font-medium text-center">
            No tickets were found
          </h2>
          <p className="text-center text-sm text-slate-500">
            No tickets were found, try creating one.
          </p>
        </>
      )}

      {totalPages !== 0 && totalPages !== 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </section>
  );
}
