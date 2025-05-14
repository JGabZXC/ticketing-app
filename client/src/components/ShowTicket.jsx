import { useState, useEffect, useContext } from "react";
import AppContext from "../store/AppContext";
import AuthContext from "../store/AuthContext";
import Button from "./ui/button";
import SubmitComment from "./ui/submitComment";

export default function ShowTicket() {
  const { selectedTicket, setType } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/tickets/${selectedTicket}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch ticket");

        const data = await response.json();
        setTicket(data.data.ticket);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    }
    fetchTicket();
  }, [selectedTicket]);

  function handleBack() {
    setType("ticket");
  }
  return (
    <section className="px-2 mt-10">
      <div className="mb-5">
        <Button
          onClick={handleBack}
          className="px-4 py-2 cursor-pointer bg-indigo-600 text-slate-50 rounded-md hover:bg-indigo-700 transition-colors duration-200 mb-5 flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          Back
        </Button>
        <h1 className="text-2xl font-semibold text-slate-800 break-words">
          {ticket?.title}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Submitted by: {ticket?.createdBy.fullName}
          </span>
          <span className="text-sm text-gray-500">
            Created:{" "}
            {new Date(ticket?.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              ticket?.status === "open" || ticket?.status === "in-progress"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {ticket?.status}
          </span>
        </div>
      </div>

      <p>{ticket?.description}</p>

      <div className="mt-20">
        <h2 className="font-semibold">Comments</h2>
        {ticket?.comments.length === 0 && (
          <p className="text-gray-500">No comments yet.</p>
        )}

        {ticket?.comments.map((comment) => (
          <div key={comment._id} className="border-b border-gray-300 py-2 mb-4">
            <p>
              {comment?.postedBy.fullName}{" "}
              {comment?.postedBy.role !== "user" && (
                <span className="text-sm text-gray-500">
                  ({comment.postedBy.role})
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>
              {comment.comment.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}

        {user && ticket?.status !== "closed" && (
          <SubmitComment ticketId={selectedTicket} />
        )}
      </div>
    </section>
  );
}
