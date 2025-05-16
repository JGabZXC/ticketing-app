import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets } from "../../store/ticketSlice";
import TicketButtons from "./TicketButtons";
import CardTicket from "./CardTicket";

export default function Tickets() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets?.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  console.log(tickets);

  return (
    <section className="p-4 mt-10">
      <TicketButtons />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {tickets.length > 0 &&
          tickets.map((ticket) => (
            <CardTicket key={ticket.id} ticket={ticket} />
          ))}
      </div>
    </section>
  );
}
