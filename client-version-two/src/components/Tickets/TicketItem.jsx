import { useSelector } from "react-redux";
import TicketItemContent from "./TicketItemContent";
import TicketItemMessage from "./TicketItemMessage";

export default function TicketItem({ ticket }) {
  const selectedTicketId = useSelector(
    (state) => state.tickets?.selectedTicketId
  );

  return (
    <>
      <TicketItemContent ticket={ticket} />
      <TicketItemMessage ticket={ticket} />
    </>
  );
}

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/api/v1/tickets/${params.ticketId}`
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Response(JSON.stringify({ message: data.message }), {
      status: response.status,
    });
  }

  return response;
}
