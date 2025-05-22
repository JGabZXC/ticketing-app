import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

export default function TicketForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="p-4 flex items-center justify-between max-w-7xl mx-auto">
      <Form method="POST" className="w-full">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="priority"
            className="text-slate-700 font-medium text-sm"
          >
            Priority
          </label>
          <select
            className="border border-slate-300 rounded-md p-2 text-slate-500"
            id="priority"
            name="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="title" className="text-slate-700 font-medium text-sm">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-slate-300 rounded-md p-2 text-slate-500"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label
            htmlFor="description"
            className="text-slate-700 font-medium text-sm"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            className="border border-slate-300 rounded-md p-2 text-slate-500"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className=" bg-indigo-600 text-slate-50 text-sm px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Submit"}
          </button>
          <Link to={-1}>
            <button
              type="button"
              className="border-2 border-indigo-600 text-sm text-slate-700 px-4 py-2 rounded-xl hover:bg-indigo-700 hover:text-slate-50 transition-all duration-200"
              disabled={isSubmitting}
            >
              Back
            </button>
          </Link>
        </div>
      </Form>
    </section>
  );
}

export async function action({ request }) {
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

  if (!response.ok)
    throw new Response(JSON.stringify({ message: "Error creating ticket" }), {
      status: 500,
    });

  toast.success("Ticket created successfully");
  return redirect("/tickets");
}

export async function actionDeleteandPost({ request, params }) {
  const formData = await request.formData();
  const body = {
    comment: formData.get("comment"),
  };
  let url = `http://localhost:3000/api/v1/tickets/${params.ticketId}`;

  if (request.method === "POST") {
    url = `http://localhost:3000/api/v1/tickets/${params.ticketId}/comment`;
  }

  if (formData.get("commentId")) {
    url = `http://localhost:3000/api/v1/tickets/${
      params.ticketId
    }/delete/${formData.get("commentId")}`;
  }

  console.log(body);

  const response = await fetch(url, {
    method: request.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.status === 403) {
    toast.error("You are not authorized to delete this ticket");
    return;
  }

  if (response.status === 400) {
    const errorData = await response.json();
    toast.error(errorData.message || "Error with ticket action");
    return;
  }

  if (!response.ok)
    throw new Response(JSON.stringify({ message: "Error with ticket" }), {
      status: 500,
    });

  if (request.method === "DELETE") {
    if (formData.get("commentId")) {
      toast.success("Comment deleted successfully");
      return redirect(`/tickets/${params.ticketId}`);
    }
    toast.success("Ticket deleted successfully");
    return redirect(`/tickets`);
  }
  if (request.method === "POST") {
    toast.success("Comment added successfully");
    return redirect(`/tickets/${params.ticketId}`);
  }
}
