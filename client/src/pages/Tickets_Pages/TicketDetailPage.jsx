import { Await, useLoaderData } from "react-router-dom";
import TicketItem from "../../components/Tickets/TicketItem/TicketItem";
import { Suspense } from "react";
import Loading from "../../components/Loading/Loading";
import ErrorTicket from "./ErrorTicket";

export default function TicketDetailPage() {
  const { ticket } = useLoaderData();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={ticket} errorElement={<ErrorTicket />}>
          {(resolvedTicket) => (
            <TicketItem ticket={resolvedTicket.data.ticket} />
          )}
        </Await>
      </Suspense>
    </>
  );
}

async function loadTicket(ticketId) {
  if (!ticketId || ticketId === "myticket")
    throw new Response(JSON.stringify({ message: "Ticket ID is required" }), {
      status: 400,
    });

  const response = await fetch(
    `http://localhost:3000/api/v1/tickets/${ticketId}`
  );

  if (!response.ok) {
    const data = await response.json();
    throw {
      message: data.message,
      status: response.status,
    };
  }

  const resData = await response.json();
  return resData;
}

export async function loader({ params }) {
  return {
    ticket: loadTicket(params.ticketId),
  };
}
