import { useSelector } from "react-redux";
import Tickets from "../../../components/Tickets/Tickets";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import ErrorContent from "../../../components/Error/ErrorContent";
import ErrorTicket from "../ErrorTicket";
import Loading from "../../../components/Loading/Loading";

export default function AssignedTickets() {
  const { user } = useSelector((state) => state.auth);
  const { tickets } = useLoaderData();

  if (user.role === "user")
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
