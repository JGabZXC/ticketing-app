import { useContext, useEffect } from "react";
import TicketContext from "../../store/TicketContext";

import Input from "../ui/input";
import Button from "../ui/button";

export default function CreateTicket({ onCancel }) {
  const { loading, error, handleCreateTicket, message, setMessageHandler } =
    useContext(TicketContext);
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    handleCreateTicket(formData); // Pass form data to the parent component
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessageHandler(null);
        onCancel();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessageHandler, onCancel]);

  return (
    <div className="mt-4">
      {message && <p className="text-green-300 text-center">{message}</p>}
      {error && <p className="text-sm text-red-300">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          labelText="Title"
          type="text"
          id="title"
          name="title"
          placeholder="Enter ticket title"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-slate-900 text-sm">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="priority" className="text-slate-900 text-sm">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            className="cursor-pointer py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="cursor-pointer py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
