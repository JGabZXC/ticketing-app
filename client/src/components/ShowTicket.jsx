import { useState, useEffect, useContext } from "react";
import AppContext from "../store/AppContext";
import AuthContext from "../store/AuthContext";
import TicketContext from "../store/TicketContext";
import Button from "./ui/button";
import SubmitComment from "./ui/submitComment";
import Input from "./ui/input";

export default function ShowTicket() {
  const { setType } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const {
    selectedTicketId,
    loading: tickectContextLoading,
    error: ticketContextError,
    setErrorHandler: ticketErrorHandler,
    updateTicketHandler,
    message,
    setMessageHandler,
  } = useContext(TicketContext);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchTicket() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/v1/tickets/${selectedTicketId}`,
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
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [selectedTicketId]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessageHandler(null);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (ticketContextError) {
      const timer = setTimeout(() => {
        ticketErrorHandler(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessageHandler, ticketErrorHandler, ticketContextError]);

  function handleBack() {
    setType("ticket");
  }

  function handleEdit() {
    setIsEditing((prevState) => !prevState);
  }

  function handleSave(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fd = Object.fromEntries(formData.entries());
    updateTicketHandler(selectedTicketId, fd);
    setTicket((prevTicket) => ({
      ...prevTicket,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
    }));
    handleEdit();
  }

  return (
    <section className="px-2 mt-10">
      {message && (
        <p className="text-sm text-green-300 text-center">{message}</p>
      )}
      {ticketContextError && (
        <p className="text-sm text-red-300">{ticketContextError}</p>
      )}
      {(loading || tickectContextLoading) && (
        <div className="flex gap-2 justify-center items-center w-full">
          <svg
            aria-hidden="true"
            class="inline w-4 h-4 text-gray-200 animate-spin fill-green-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <p className="text-green-300 text-center">Loading</p>
        </div>
      )}
      <form onSubmit={handleSave}>
        <div className="flex gap-4">
          <Button
            type="button"
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
          {user?._id === ticket?.createdBy._id && (
            <Button
              onClick={handleEdit}
              type="button"
              className="px-4 py-2 cursor-pointer border-2 border-indigo-600 text-gray-600 rounded-md hover:bg-indigo-700 hover:text-slate-50 transition-colors duration-200 mb-5 flex gap-2"
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          )}

          {isEditing && (
            <Button className="px-4 py-2 cursor-pointer border-2 border-indigo-600 text-gray-600 rounded-md hover:bg-indigo-700 hover:text-slate-50 transition-colors duration-200 mb-5 flex gap-2">
              Save Changes
            </Button>
          )}
        </div>

        {!loading && !isEditing && ticket && (
          <>
            <div className="mb-5">
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
                    ticket?.status === "open" ||
                    ticket?.status === "in-progress"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {ticket?.status}
                </span>
              </div>
            </div>

            <p>{ticket?.description}</p>
          </>
        )}

        {!loading && isEditing && ticket && (
          <>
            <Input
              id="title"
              name="title"
              className="py-2 mb-2 text-2xl font-semibold text-slate-800 break-words rounded-md border-b-2 border-b-yellow-500 focus:outline-none"
              defaultValue={ticket?.title}
            />

            <div className="mb-5">
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
                    ticket?.status === "open" ||
                    ticket?.status === "in-progress"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {ticket?.status}
                </span>
              </div>
            </div>

            <Input
              id="description"
              name="description"
              className="break-words rounded-md border-b-2 border-b-yellow-500 focus:outline-none"
              defaultValue={ticket?.description}
            />
          </>
        )}
      </form>

      {!loading && ticket && (
        <div className="mt-20">
          <h2 className="font-semibold">Comments</h2>
          {ticket?.comments.length === 0 && (
            <p className="text-gray-500">No comments yet.</p>
          )}

          {ticket?.comments.map((comment) => (
            <div
              key={comment._id}
              className="border-b border-gray-300 py-2 mb-4"
            >
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
            <SubmitComment ticketId={selectedTicketId} setTicket={setTicket} />
          )}
        </div>
      )}
    </section>
  );
}
