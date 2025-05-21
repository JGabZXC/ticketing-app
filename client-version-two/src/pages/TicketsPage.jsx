import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Tickets from "../components/Tickets/Tickets";
import Loading from "../components/Loading/Loading";

export default function TicketsPage() {
  const { tickets } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={tickets}>
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

async function loadTickets({ request, params }) {
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

  const data = await response.json();
  return data;
}

export async function loader({ request, params }) {
  return {
    tickets: loadTickets({ request, params }),
  };
}
