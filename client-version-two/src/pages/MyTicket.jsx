import { Await, useLoaderData } from "react-router-dom";

import Tickets from "../components/Tickets/Tickets";
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";
import TicketButtons from "../components/Tickets/TicketButtons";

export default function MyTicket() {
  const { tickets } = useLoaderData();
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={tickets}>
        {(resolvedTickets) => {
          console.log(resolvedTickets);
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
