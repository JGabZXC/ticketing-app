import { redirect } from "react-router-dom";
import TicketForm from "../../components/Tickets/TicketForm";
import { toast } from "react-toastify";
import store from "../../store/index";
import { authActions } from "../../store/authSlice";

export default function TicketNew() {
  return <TicketForm />;
}

export async function newTicketAction({ request }) {
  const data = await request.formData();
  const body = {
    title: data.get("title"),
    description: data.get("description"),
    priority: data.get("priority"),
  };

  const response = await fetch("http://localhost:3000/api/v1/tickets", {
    method: request.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resData = await response.json();

  if (response.status === 400) {
    toast.error(resData.message || "Invalid request. Please check your input.");
    return null;
  }

  if (response.status === 401) {
    store.dispatch(authActions.clearAuthState());
    toast.error("Token is expired or there is no token. Please log in again.");
    return redirect("/auth?type=login");
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message:
          resData.message || "Failed to create ticket. Please try again.",
      }),
      {
        status: response.status,
      }
    );
  }

  toast.success("Ticket created successfully");
  return redirect("/tickets", { replace: true });
}
