import Span from "../ui/Span";
import TicketItemContentButtons from "./TicketItemContentButtons";
export default function TicketItemContent({ ticket }) {
  return (
    <section className="p-4 max-w-7xl mx-auto">
      <TicketItemContentButtons userId={ticket.createdBy._id} />
      <h1 className="text-xl font-semibold text-slate-800">{ticket.title}</h1>
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex flex-col gap-2 md:flex-row">
          <Span>
            Date created:{" "}
            {new Date(ticket.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Span>
          <Span>Created By: {ticket.createdBy.fullName}</Span>
        </div>
        <Span>
          Updated At:{" "}
          {new Date(ticket.updatedAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Span>
      </div>
      <p className="text-slate-600">
        {ticket.description.split("\n").map((line) => (
          <>
            {line}
            <br />
          </>
        ))}
      </p>
    </section>
  );
}
