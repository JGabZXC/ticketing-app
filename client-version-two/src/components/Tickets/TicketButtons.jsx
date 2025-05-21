import { Link, Form, useSubmit, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TicketButtons() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const orderBy = searchParams.get("sort") || "-createdAt";
  const limit = searchParams.get("limit") || 20;
  const priority = searchParams.get("priority") || "all";

  function handleOrderByChange(e) {
    const orderBy = e.target.value;
    const params = new URLSearchParams(window.location.search);
    params.set("sort", orderBy);
    submit(params, { method: "GET" });
  }

  function handleLimitChange(e) {
    const limit = e.target.value;
    const params = new URLSearchParams(window.location.search);
    params.set("limit", limit);
    submit(params, { method: "GET" });
  }

  function handlePriorityChange(e) {
    const priority = e.target.value;
    const params = new URLSearchParams(window.location.search);
    params.set("priority", priority);
    submit(params, { method: "GET" });
  }

  return (
    <div className="flex justify-between items-center mb-4 flex-col lg:flex-row">
      {isAuthenticated && (
        <>
          <Link to="/tickets/new">
            <button className="cursor-pointer px-4 py-2 rounded-xl border-2 text-sm lg:text-md bg-indigo-600 text-slate-50 hover:bg-indigo-700 transition-all duration-200">
              Create Ticket
            </button>
          </Link>
        </>
      )}
      <Form className="flex gap-4 items-center text-sm lg:text-md">
        <div className="flex flex-col items-center lg:flex-row lg:items-end gap-2">
          <label htmlFor="" className="font-semibold text-slate-700">
            Order by
          </label>
          <select className="text-slate-400" onChange={handleOrderByChange}>
            <option value="-createdAt" selected={orderBy === "-createdAt"}>
              Newest
            </option>
            <option value="createdAt" selected={orderBy === "createdAt"}>
              Oldest
            </option>
          </select>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-end gap-2">
          <label htmlFor="" className="font-semibold text-slate-700">
            Limit by
          </label>
          <select className="text-slate-400" onChange={handleLimitChange}>
            <option value="20" selected={limit === "20"}>
              20
            </option>
            <option value="50" selected={limit === "50"}>
              50
            </option>
            <option value="100" selected={limit === "100"}>
              100
            </option>
          </select>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-end gap-2">
          <label htmlFor="" className="font-semibold text-slate-700">
            Priority
          </label>
          <select className="text-slate-400" onChange={handlePriorityChange}>
            <option value="all" selected={priority === "all"}>
              All
            </option>
            <option value="low" selected={priority === "low"}>
              Low
            </option>
            <option value="medium" selected={priority === "medium"}>
              Medium
            </option>
            <option value="high" selected={priority === "high"}>
              High
            </option>
          </select>
        </div>
      </Form>
    </div>
  );
}
