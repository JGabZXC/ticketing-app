import { Fragment } from "react";
import Span from "../../ui/Span";
import TicketItemContentButtons from "./TicketItemContentButtons";
export default function TicketItemContent({ ticket }) {
  let classesStatus = "rounded-full px-2 py-1 text-xs";
  let classesPriority = "rounded-full px-2 py-1 text-xs";
  if (ticket.status === "open" || ticket.status === "in-progress")
    classesStatus += " bg-green-100 text-green-600";
  if (ticket.status === "closed") classesStatus += " bg-red-100 text-red-600";
  if (ticket.priority === "low")
    classesPriority += " bg-slate-200 text-slate-600/50";
  if (ticket.priority === "medium")
    classesPriority += " bg-yellow-200 text-yellow-600/50";
  if (ticket.priority === "high")
    classesPriority += " bg-red-200 text-red-600/50";

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
        <div className="flex gap-2">
          <Span className={classesStatus}>{ticket.status}</Span>
          <Span className={classesPriority}>{ticket.priority}</Span>
        </div>
      </div>
      <p className="text-slate-600">
        {ticket.description.split("\n").map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}
      </p>
    </section>
  );
}
