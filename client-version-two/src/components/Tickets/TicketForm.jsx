import { Form, Link } from "react-router-dom";

export default function TicketForm() {
  return (
    <section className="p-4 flex items-center justify-between max-w-7xl mx-auto">
      <Form className="w-full">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="priority"
            className="text-slate-700 font-medium text-sm"
          >
            Priority
          </label>
          <select
            className="border border-slate-300 rounded-md p-2 text-slate-500"
            id="priority"
            name="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="title" className="text-slate-700 font-medium text-sm">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-slate-300 rounded-md p-2 text-slate-500"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label
            htmlFor="description"
            className="text-slate-700 font-medium text-sm"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            className="border border-slate-300 rounded-md p-2 text-slate-500"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className=" bg-indigo-600 text-slate-100 px-4 py-2 rounded-md"
          >
            Submit
          </button>
          <Link to="..">
            <button
              type="button"
              className="border border-indigo-600 text-slate-600 px-4 py-2 rounded-md"
            >
              Back
            </button>
          </Link>
        </div>
      </Form>
    </section>
  );
}
