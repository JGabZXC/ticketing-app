import { useContext } from "react";
import AppContext from "../../store/AppContext";
import TicketContext from "../../store/TicketContext";

export default function CardTicket({ ticket }) {
  const { setType } = useContext(AppContext);
  const { setSelectedTicketHandler } = useContext(TicketContext);
  let classes = "cursor-pointer border rounded-lg p-4 shadow-md bg-white";

  if (ticket.priority === "high") {
    classes += " border-red-500";
  } else if (ticket.priority === "medium") {
    classes += " border-yellow-500";
  } else {
    classes += " border-gray-300";
  }

  function handleClick() {
    setSelectedTicketHandler(ticket._id);
    setType("showTicket");
  }

  return (
    <div className={classes} onClick={handleClick}>
      <h2 className="text-xl font-bold text-gray-700 break-all">
        {ticket.title.slice(0, 20)}
        {ticket.title.length > 20 ? "..." : undefined}
      </h2>
      <p className="text-gray-500 mt-2">{ticket.description.slice(0, 50)}</p>
      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            ticket.status === "open" || ticket.status === "in-progress"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {ticket.status}
        </span>
        <span className="text-gray-500 text-sm">
          Created:{" "}
          {new Date(ticket.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
