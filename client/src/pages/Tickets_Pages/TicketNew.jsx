import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, redirect } from "react-router-dom";
import TicketForm from "../../components/Tickets/TicketForm";
import { toast } from "react-toastify";

export default function TicketNew() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isAuthenticated) {
      navigate("/auth?type=login");
    }
  }, [user, isAuthenticated, navigate]);

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

  if (!response.ok) {
    throw {
      message: resData.message || "Error creating ticket",
      status: response.status || 500,
    };
  }

  toast.success("Ticket created successfully");
  return redirect("/tickets", { replace: true });
}
