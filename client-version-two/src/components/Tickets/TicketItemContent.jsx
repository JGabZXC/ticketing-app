import Span from "../ui/Span";
export default function TicketItemContent({ ticket }) {
  let classes = "p-2 text-sm 0 rounded-full";
  if (ticket.status !== "closed") classes += " bg-green-600 text-slate-200";
  else classes += " bg-red-300 text-slate-200";
  return (
    <section className="p-4 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold text-slate-800">{ticket.title}</h1>
      <div className="flex gap-2">
        <Span className={classes}>{ticket.status}</Span>
        <Span>{ticket.priority}</Span>
        <Span>Created At: {ticket.createdAt}</Span>
        <Span>Category: {ticket.category}</Span>
        <Span>Created By: {ticket.createdBy.fullName}</Span>
        <Span>Updated At: {ticket.updatedAt}</Span>
        <Span>Assigned Agent: {ticket.assignedTo?.fullName || "no agent"}</Span>
      </div>
      <p className="text-slate-700">{ticket.description}</p>
    </section>
  );
}
