import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function HeroSection() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="text-center max-w-[450px] mx-auto my-0 mt-20">
      <h1 className="text-6xl font-bold text-gray-800">Ticketing App</h1>
      <h2 className="text-md font-medium mt-5 text-gray-600">
        {isAuthenticated
          ? `Welcome back, ${user.fullName}!`
          : `Effortlessly track, manage, and resolve tickets with our powerful,
        user-friendly ticketing app. Whether it's for events or customer
        support, stay organized and in control — all in one place.`}
      </h2>
      {isAuthenticated ? (
        <button className="px-4 py-2 mt-5 rounded-xl border-2 bg-indigo-600 text-slate-50 hover:bg-indigo-700">
          View Tickets
        </button>
      ) : (
        <button className="px-4 py-2 mt-5 rounded-xl border-2 bg-indigo-600 text-slate-50 hover:bg-indigo-700">
          <NavLink to="/login">Get Started</NavLink>
        </button>
      )}
    </div>
  );
}
