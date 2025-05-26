import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Tickets from "../../components/Tickets/Tickets";
import Loading from "../../components/Loading/Loading";
let controller = null;

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
    urlReq = `http://localhost:3000/api/v1/users/${params.userId}/tickets?page=${page}&limit=${limit}&sort=${sort}&priority=${priority}`;
  }

  if (controller) controller.abort();

  controller = new AbortController();
  const signal = controller.signal;

  const response = await fetch(urlReq, {
    credentials: "include",
    signal,
  });

  const data = await response.json();

  if (response.status === 401) {
    throw new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  if (!response.ok)
    throw {
      message: data.message || "Error fetching tickets",
      status: response.status,
    };

  return data;
}

export async function loader({ request, params }) {
  return {
    tickets: loadTickets({ request, params }),
  };
}
