import { Await, useLoaderData } from "react-router-dom";
import TicketItem from "../components/Tickets/TicketItem/TicketItem";
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";

export default function TicketDetailPage() {
  const { ticket } = useLoaderData();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={ticket}>
          {(resolvedTicket) => (
            <TicketItem ticket={resolvedTicket.data.ticket} />
          )}
        </Await>
      </Suspense>
    </>
  );
}

async function loadTicket(ticketId) {
  const response = await fetch(
    `http://localhost:3000/api/v1/tickets/${ticketId}`
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Response(JSON.stringify({ message: data.message }), {
      status: response.status,
    });
  }

  const resData = await response.json();
  return resData;
}

export async function loader({ params }) {
  return {
    ticket: loadTicket(params.ticketId),
  };
}
