import { Await, useLoaderData } from "react-router-dom";

import Tickets from "../../../components/Tickets/Tickets";
import { Suspense } from "react";
import Loading from "../../../components/Loading/Loading";
import ErrorTicket from "../ErrorTicket";

export default function MyTicket() {
  const { tickets } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={tickets} errorElement={<ErrorTicket />}>
        {(resolvedTickets) => {
          return (
            <Tickets
              tickets={resolvedTickets.data.tickets}
              totalPages={resolvedTickets.totalPages}
            />
          );
        }}
      </Await>
    </Suspense>
  );
}
