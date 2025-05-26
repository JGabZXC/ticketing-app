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

export async function actionDeleteandPost({ request, params }) {
  const formData = await request.formData();
  const type = formData.get("type");
  let body = {};

  let url = `http://localhost:3000/api/v1/tickets/${params.ticketId}`;

  if (type === "delete-ticket")
    url = `http://localhost:3000/api/v1/tickets/${params.ticketId}`;

  if (type === "delete-comment")
    url = `http://localhost:3000/api/v1/tickets/${
      params.ticketId
    }/delete/${formData.get("commentId")}`;

  if (type === "add-comment") {
    body = {
      comment: formData.get("comment"),
    };
    url = `http://localhost:3000/api/v1/tickets/${params.ticketId}/comment`;
  }

  if (type === "assign-to-me") {
    body = {
      assignedTo:
        formData.get("assignedTo") !== "null" ? formData.get("assignedTo") : "",
    };
    url = `http://localhost:3000/api/v1/tickets/${params.ticketId}`;
  }

  if (type === "mark-as") {
    body = {
      status: formData.get("status"),
    };
    url = `http://localhost:3000/api/v1/tickets/${params.ticketId}`;
  }

  if (type === "edit-ticket") {
    body = {
      title: formData.get("title"),
      description: formData.get("description"),
    };
    url = `http://localhost:3000/api/v1/tickets/${params.ticketId}`;
  }

  console.log(type);
  console.log(body);

  const response = await fetch(url, {
    method: request.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (type === "delete-ticket") {
    if (response.status === 403) {
      toast.error("You are not authorized to delete this ticket");
      return;
    }
    if (response.status === 400) {
      const errorData = await response.json();
      toast.error(errorData.message || "Error with deleting ticket");
      return;
    }
    if (!response.ok)
      throw new Response(
        JSON.stringify({ message: "Error with deleting ticket" }),
        {
          status: 500,
        }
      );
    toast.success("Ticket deleted successfully");
    return redirect(`/tickets`);
  }

  if (type === "delete-comment") {
    if (response.status === 403) {
      toast.error("You are not authorized to delete this comment");
      return;
    }
    if (response.status === 400) {
      const errorData = await response.json();
      toast.error(errorData.message || "Error with deleting comment");
      return;
    }
    if (!response.ok)
      throw new Response(
        JSON.stringify({ message: "Error with deleting comment" }),
        {
          status: 500,
        }
      );
    toast.success("Comment deleted successfully");
    return redirect(`/tickets/${params.ticketId}`);
  }

  if (type === "add-comment") {
    if (response.status === 403) {
      toast.error("You are not authorized to add a comment");
      return;
    }
    if (response.status === 400) {
      const errorData = await response.json();
      toast.error(errorData.message || "Error with adding comment");
      return;
    }
    if (!response.ok)
      throw new Response(
        JSON.stringify({ message: "Error with adding comment" }),
        {
          status: 500,
        }
      );
    toast.success("Comment added successfully");
    return redirect(`/tickets/${params.ticketId}`);
  }

  if (type === "assign-to-me") {
    if (response.status === 403) {
      toast.error("You are not authorized to assign this ticket");
      return;
    }
    if (response.status === 400) {
      const errorData = await response.json();
      toast.error(errorData.message || "Error with assigning ticket");
      return;
    }
    if (!response.ok)
      throw new Response(
        JSON.stringify({ message: "Error with assigning ticket" }),
        {
          status: 500,
        }
      );
    if (body.assignedTo === "")
      toast.success("This ticket has been unassigned!");
    else toast.success("This ticket has been assigned to you!");
    return redirect(`/tickets/${params.ticketId}`);
  }

  if (type === "mark-as") {
    if (response.status === 403) {
      toast.error("You are not authorized to mark this ticket");
      return;
    }
    if (response.status === 400) {
      const errorData = await response.json();
      toast.error(errorData.message || "Error with marking ticket");
      return;
    }
    if (!response.ok)
      throw new Response(
        JSON.stringify({ message: "Error with marking ticket" }),
        {
          status: 500,
        }
      );
    toast.success("Ticket marked successfully");
    return redirect(`/tickets/${params.ticketId}`);
  }

  if (type === "edit-ticket") {
    if (response.status === 403) {
      toast.error("You are not authorized to edit this ticket");
      return;
    }
    if (response.status === 400) {
      const errorData = await response.json();
      toast.error(errorData.message || "Error with editing ticket");
      return;
    }
    if (!response.ok)
      throw new Response(
        JSON.stringify({ message: "Error with editing ticket" }),
        {
          status: 500,
        }
      );
    toast.success("Ticket edited successfully");
    return redirect(`/tickets/${params.ticketId}`);
  }

  return null;
}
