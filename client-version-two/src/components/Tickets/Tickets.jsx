import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import TicketButtons from "./TicketButtons";
import CardTicket from "./CardTicket";
import Pagination from "./Pagination";

export default function Tickets() {
  const data = useLoaderData();
  const tickets = data.data.tickets;
  const totalPages = data.totalPages;
  const currentPage = useSelector((state) => state.tickets.page);

  return (
    <section className="p-4 mt-10">
      <TicketButtons />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {tickets.length > 0 &&
          tickets.map((ticket) => (
            <CardTicket key={ticket._id} ticket={ticket} />
          ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const limit = url.searchParams.get("limit") || 20;
  const sort = url.searchParams.get("sort") || "-createdAt";
  const priority = url.searchParams.get("priority") || "all";

  let urlReq = `http://localhost:3000/api/v1/tickets?page=${page}&limit=${limit}&sort=${sort}&priority=${priority}`;

  if (params.userId) {
    urlReq = `http://localhost:3000//api/v1/users/${params.userId}/tickets?page=${page}&limit=${limit}&sort=${sort}&priority=${priority}`;
  }

  const response = await fetch(urlReq);

  if (!response.ok)
    throw new Response(
      JSON.stringify({ message: "Could not fetch tickets." }),
      { status: 500 }
    );

  return response;
}
