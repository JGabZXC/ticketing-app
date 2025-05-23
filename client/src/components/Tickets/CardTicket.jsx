import { Link } from "react-router-dom";

export default function CardTicket({ ticket }) {
  let classes = "relative p-4 rounded-2xl border-1 shadow-sm lg:shadow-md";

  if (ticket.priority === "high") {
    classes += " border-red-200";
  } else if (ticket.priority === "medium") {
    classes += " border-yellow-200";
  } else {
    classes += " border-slate-200";
  }

  return (
    <Link to={`/tickets/${ticket._id}`} className={classes}>
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-xs">
          Created at:{" "}
          {new Date(ticket.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            ticket.status === "open" || ticket.status === "in-progress"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {ticket.status}
        </span>
      </div>
      <h2 className="font-semibold text-slate-700 text-lg lg:text-2xl break-all">
        {ticket.title.slice(0, 50)}
        {ticket.title.length > 50 ? "..." : ""}
      </h2>
      <p className="text-slate-500 text-sm lg:text-md h-[7.5rem] overflow-hidden">
        {ticket.description.slice(0, 300)}
        {ticket.description.length > 300 ? "..." : ""}
      </p>
    </Link>
  );
}
