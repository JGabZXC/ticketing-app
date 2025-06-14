import { Await, useLoaderData } from "react-router-dom";

import Tickets from "../../../components/Tickets/Tickets";
import { Suspense } from "react";
import Loading from "../../../components/Loading/Loading";
import ErrorTicket from "../ErrorTicket";
import { useSelector } from "react-redux";
import ErrorContent from "../../../components/Error/ErrorContent";

export default function MyTicket() {
  const { tickets } = useLoaderData();
  const { user } = useSelector((state) => state.auth);

  if (user.role === "agent")
    return (
      <ErrorContent title="403 | Forbidden">
        <p className="text-lg text-slate-600">
          You are not allowed to view this page
        </p>
      </ErrorContent>
    );

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
