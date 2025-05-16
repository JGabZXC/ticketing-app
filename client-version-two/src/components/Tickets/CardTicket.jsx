export default function CardTicket({ ticket }) {
  return (
    <div className="relative p-4 rounded-2xl border-1 border-slate-200 shadow-sm lg:shadow-md">
      <h2 className="font-semibold text-slate-700 text-lg lg:text-2xl break-all">
        {ticket.title}
      </h2>
      <p className="text-slate-500 text-sm lg:text-md h-[9rem]">
        {ticket.description.slice(0, 200)}{" "}
        {ticket.description.length >= 200 ? "..." : ""}
      </p>
      <div className="flex items-center justify-between absolute bottom-2 left-4 right-4">
        <span className="text-slate-400 text-sm">
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
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            ticket.status === "open" || ticket.status === "in-progress"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {ticket.status}
        </span>
      </div>
    </div>
  );
}
