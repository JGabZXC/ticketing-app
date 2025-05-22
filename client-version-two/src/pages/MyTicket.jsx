import { Await, useLoaderData, useNavigate } from "react-router-dom";

import Tickets from "../components/Tickets/Tickets";
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";
import { useSelector } from "react-redux";

export default function MyTicket() {
  const { tickets } = useLoaderData();
  const user = useSelector((state) => state.auth?.user);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const navigate = useNavigate();

  if (!user && !isLoggedIn) navigate("/tickets");

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={tickets}>
        {(resolvedTickets) => {
          // if (resolvedTickets.data.tickets.length === 0) {
          //   return (
          //     <section className="p-4 mt-10">
          //       <TicketButtons />
          //       <div>
          //         <h2 className="text-center text-slate-700 text-lg lg:text-2xl">
          //           No tickets found
          //         </h2>
          //         <p className="text-center text-slate-500 text-sm lg:text-md">
          //           You have not created any tickets yet.
          //         </p>
          //       </div>
          //     </section>
          //   );
          // }
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
