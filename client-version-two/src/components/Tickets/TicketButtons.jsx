import { useSelector } from "react-redux";

export default function TicketButtons({ setOrderBy, setLimit, setPriority }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  function handleOrderByChange(e) {
    setOrderBy(e.target.value);
  }

  function handleLimitChange(e) {
    setLimit(e.target.value);
  }

  function handlePriorityChange(e) {
    setPriority(e.target.value);
  }
  return (
    <div className="flex justify-between items-center mb-4 flex-col lg:flex-row">
      {isAuthenticated && (
        <button className="cursor-pointer px-4 py-2 rounded-xl border-2 text-sm lg:text-md bg-indigo-600 text-slate-50 hover:bg-indigo-700">
          Create Ticket
        </button>
      )}
      <div className="flex gap-4 items-center text-sm lg:text-md">
        <div className="flex flex-col items-center lg:flex-row lg:items-end gap-2">
          <label htmlFor="" className="font-semibold text-slate-700">
            Order by
          </label>
          <select className="text-slate-400" onChange={handleOrderByChange}>
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
          </select>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-end gap-2">
          <label htmlFor="" className="font-semibold text-slate-700">
            Limit by
          </label>
          <select className="text-slate-400" onChange={handleLimitChange}>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-end gap-2">
          <label htmlFor="" className="font-semibold text-slate-700">
            Priority
          </label>
          <select className="text-slate-400" onChange={handlePriorityChange}>
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
}
