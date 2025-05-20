import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets } from "../../store/ticketSlice";
import TicketButtons from "./TicketButtons";
import CardTicket from "./CardTicket";
import Pagination from "./Pagination";

export default function Tickets() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets?.tickets);
  const loading = useSelector((state) => state.tickets?.loading);
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [limit, setLimit] = useState(20);
  const [priority, setPriority] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTickets({ orderBy, limit, priority, page }));
  }, [dispatch, orderBy, limit, priority, page]);

  return (
    <section className="p-4 mt-10">
      <TicketButtons
        setOrderBy={setOrderBy}
        setLimit={setLimit}
        setPriority={setPriority}
      />
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {tickets.length > 0 &&
              tickets.map((ticket) => (
                <CardTicket key={ticket._id} ticket={ticket} />
              ))}
          </div>
          <Pagination page={page} setPage={setPage} />
        </>
      )}
    </section>
  );
}
