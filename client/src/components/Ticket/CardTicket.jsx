export default function CardTicket({ ticket }) {
  let classes = "border rounded-lg p-4 shadow-md bg-white";

  if (ticket.priority === "high") {
    classes += " border-red-500";
  } else if (ticket.priority === "medium") {
    classes += " border-yellow-500";
  } else {
    classes += " border-gray-300";
  }

  return (
    <div className={classes}>
      <h2 className="text-xl font-bold text-indigo-600">{ticket.title}</h2>
      <p className="text-gray-600 mt-2">{ticket.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            ticket.status === "open"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {ticket.status}
        </span>
        <span className="text-gray-500 text-sm">
          Created: {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
