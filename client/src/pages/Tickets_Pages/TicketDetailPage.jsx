import { Await, redirect, useLoaderData } from "react-router-dom";
import TicketItem from "../../components/Tickets/TicketItem/TicketItem";
import { Suspense } from "react";
import Loading from "../../components/Loading/Loading";
import ErrorTicket from "./ErrorTicket";
import { ApiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { Description } from "@headlessui/react";

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
    `https://ticketing-app-j94u.onrender.com/api/v1/tickets/${ticketId}`
  );

  if (!response.ok) {
    const data = await response.json();
    throw {
      message: data.message || "Error fetching ticket",
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

export async function multiPurposeAction({ request, params }) {
  const ticketId = params.ticketId;
  const formData = await request.formData();
  const http = new ApiClient();

  if (request.method === "DELETE") {
    let message = "";
    let redirectUrl = "";
    if (formData.get("type") === "delete-comment") {
      await http.delete(
        `/api/v1/tickets/${ticketId}/delete/${formData.get("commentId")}`
      );
      message = "Comment deleted successfully";
      redirectUrl = `/tickets/${ticketId}`;
    } else {
      await http.delete(`/api/v1/tickets/${ticketId}`);
      message = "Ticket deleted successfully";
      redirectUrl = "/tickets";
    }

    toast.success(message);
    return redirect(redirectUrl);
  }

  if (request.method === "PATCH") {
    console.log("You are here");
    let body = {};
    let message = "";
    if (formData.get("type") === "assign-to-me") {
      body = {
        assignedTo: formData.get("assignedTo"),
      };
      message = "This ticket has been assigned to you.";
    } else if (formData.get("type") === "mark-as") {
      body = {
        status: formData.get("status"),
      };
      message = `Ticket marked as ${formData.get("status")}`;
    } else {
      body = {
        description: formData.get("description"),
        title: formData.get("title"),
      };
      message = "Ticket updated successfully";
    }

    await http.patch(`/api/v1/tickets/${ticketId}`, body);

    toast.success(message);
    return redirect(`/tickets/${ticketId}`);
  }

  if (request.method === "POST") {
    const data = await http.post(`/api/v1/tickets/${ticketId}/comment`, {
      comment: formData.get("comment"),
    });

    if (data.status === "error" || data.status === 400) {
      toast.error(data.message);
      return null;
    }

    toast.success("Comment added successfully");
    return redirect(`/tickets/${ticketId}`);
  }
}
