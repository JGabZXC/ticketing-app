import { useState } from "react";
import Button from "./button";

export default function SubmitComment({ ticketId }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/tickets/${ticketId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ comment }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit comment");
      }
      console.log("Comment submitted successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border-2 border-gray-400 p-2 rounded-md"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <Button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-600 text-slate-50 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting Comment..." : "Submit Comment"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
