import { Form, useNavigation, useSubmit } from "react-router-dom";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

export default function TicketItemMessage({ ticket }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const comments = ticket.comments;
  const navigation = useNavigation();
  const submit = useSubmit();
  const size = 10; // Number of comments to display per page
  const [currentPage, setCurrentPage] = useState(0); // Track the current page

  // Paginate comments
  const paginatedComments = comments.slice(
    currentPage * size,
    currentPage * size + size
  );

  const totalPages = Math.ceil(comments.length / size); // Calculate total pages
  const isSubmitting = navigation.state === "submitting";

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  function deleteComment(commentId) {
    const formData = new FormData();
    formData.append("commentId", commentId);
    formData.append("type", "delete-comment");
    submit(formData, {
      method: "DELETE",
    });
  }

  return (
    <section className="p-4 max-w-7xl mx-auto">
      {comments.length > 0 ? (
        <>
          <h2 className="text-slate-700 font-medium mb-5">
            Comments ({comments.length})
          </h2>
          <ul>
            {paginatedComments.map((comment) => (
              <li className="mb-2" key={comment._id}>
                <div className="flex gap-2">
                  <span className="text-slate-600 font-medium">
                    {comment.postedBy.fullName}
                    {comment.postedBy.role === "agent" ? " (Agent)" : ""}{" "}
                  </span>
                  <div className="">
                    <span className="text-slate-600 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {user?._id === comment.postedBy._id && (
                      <button
                        onClick={() => deleteComment(comment._id)}
                        className="ml-1"
                      >
                        <input
                          type="hidden"
                          name="commentId"
                          value={comment._id}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4 text-red-300"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-slate-600">
                  {comment.comment.split("\n").map((line, index) => (
                    <Fragment key={index}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </p>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="flex gap-4 justify-center items-center mt-4">
            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <span className="text-slate-600">
              Pages {currentPage + 1} of {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <h2 className="text-slate-800 font-medium">No comments available</h2>
      )}

      {user && isAuthenticated && ticket.status !== "closed" && (
        <Form method="POST" className="flex flex-col gap-2 mt-4">
          <label
            htmlFor="comment"
            className="text-slate-700 font-medium text-sm"
          >
            Add a comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={5}
            className="border border-slate-300 rounded-md p-2 text-slate-500"
            value={navigation.state === "submitting" ? "" : undefined}
          />
          <input type="hidden" name="type" value="add-comment" />
          <button
            type="submit"
            className="bg-indigo-600 text-slate-50 text-sm px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Submit"}
          </button>
        </Form>
      )}
    </section>
  );
}
