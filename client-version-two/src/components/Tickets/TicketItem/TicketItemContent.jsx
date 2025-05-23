import { Fragment } from "react";
import Span from "../../ui/Span";
import { useState } from "react";
import TicketItemContentButtons from "./TicketItemContentButtons";
import { Form, useNavigation, useSubmit } from "react-router-dom";

export default function TicketItemContent({ ticket }) {
  const [isEditing, setIsEditing] = useState(false);
  let classesStatus = "rounded-full px-2 py-1 text-xs";
  let classesPriority = "rounded-full px-2 py-1 text-xs";
  const submit = useSubmit();
  const navigation = useNavigation();
  if (ticket.status === "open" || ticket.status === "in-progress")
    classesStatus += " bg-green-100 text-green-600";
  if (ticket.status === "closed") classesStatus += " bg-red-100 text-red-600";
  if (ticket.priority === "low")
    classesPriority += " bg-slate-200 text-slate-600/50";
  if (ticket.priority === "medium")
    classesPriority += " bg-yellow-200 text-yellow-600/50";
  if (ticket.priority === "high")
    classesPriority += " bg-red-200 text-red-600/50";

  let content = "";
  const isSubmitting = navigation.state === "submitting";

  function handleEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.target.form);
    formData.append("type", "edit-ticket");
    submit(formData, {
      method: "PATCH",
    });
    setIsEditing(false);
  }

  if (!isEditing) {
    content = (
      <>
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
          {ticket.assignedTo && (
            <Span>Assigned Agent: {ticket.assignedTo.fullName}</Span>
          )}
          <div className="flex gap-2">
            <Span className={classesStatus}>{ticket.status}</Span>
            <Span className={classesPriority}>{ticket.priority}</Span>
          </div>
          <p className="text-slate-600">
            {ticket.description.split("\n").map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
          </p>
        </div>
      </>
    );
  } else {
    content = (
      <Form method="PATCH" className="w-full">
        <input
          className="text-xl font-semibold text-slate-800 border-b-2 border-slate-300"
          name="title"
          defaultValue={ticket.title}
        />

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
          {ticket.assignedTo && (
            <Span>Assigned Agent: {ticket.assignedTo.fullName}</Span>
          )}
          <div className="flex gap-2">
            <Span className={classesStatus}>{ticket.status}</Span>
            <Span className={classesPriority}>{ticket.priority}</Span>
          </div>
        </div>

        <textarea
          name="description"
          rows={5}
          className="border border-slate-300 rounded-md p-2 text-slate-500 w-full"
          defaultValue={ticket.description}
        />
        <button
          type="submit"
          className="text-slate-50 bg-indigo-600 px-2 py-1 rounded-md hover:bg-indigo-700 transition-all duration-200 mt-4"
          onClick={handleEdit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </Form>
    );
  }

  return (
    <section className="p-4 max-w-7xl mx-auto">
      <TicketItemContentButtons
        userId={ticket.createdBy?._id}
        assignedAgent={ticket?.assignedTo}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
      />
      {content}
    </section>
  );
}
