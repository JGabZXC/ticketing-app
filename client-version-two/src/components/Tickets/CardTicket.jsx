import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ticketActions } from "../../store/ticketSlice";

export default function CardTicket({ ticket }) {
  const dispatch = useDispatch();
  let classes = "relative p-4 rounded-2xl border-1 shadow-sm lg:shadow-md";

  if (ticket.priority === "high") {
    classes += " border-red-200";
  } else if (ticket.priority === "medium") {
    classes += " border-yellow-200";
  } else {
    classes += " border-slate-200";
  }

  return (
    <Link to={ticket._id} className={classes}>
      <h2 className="font-semibold text-slate-700 text-lg lg:text-2xl break-all">
        {ticket.title}
      </h2>
      <p className="text-slate-500 text-sm lg:text-md h-[9rem]">
        {ticket.description.slice(0, 200)}{" "}
        {ticket.description.length >= 200 ? "..." : ""}
      </p>
      <div className="flex items-center justify-between absolute bottom-2 left-4 right-4">
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
    </Link>
  );
}
