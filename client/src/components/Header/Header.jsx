import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { requestLogout } from "../../store/authSlice";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  function handleLogout() {
    setIsMenuOpen(false); // Close the menu on logout
    dispatch(requestLogout());
  }

  return (
    <header className="shadow-md w-full">
      <div className="p-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-slate-800">TicketFlow</h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block lg:hidden text-slate-800 focus:outline-none z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col lg:flex-row gap-4 font-light text-lg absolute lg:static top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 transition-transform duration-300 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0"
          }`}
        >
          <li>
            <button onClick={() => setIsMenuOpen(false)}>
              <NavLink
                to="/"
                className="text-slate-600 font-semibold hover:text-slate-800 hover:underline hover:underline-offset-8"
              >
                Home
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsMenuOpen(false)}>
              <NavLink
                to="/tickets?page=1&limit=20&sort=-createdAt&priorty=all"
                className="text-slate-600 font-semibold hover:text-slate-800 hover:underline hover:underline-offset-8"
              >
                Ticket
              </NavLink>
            </button>
          </li>
          {isAuthenticated && user && (
            <li>
              {user.role === "agent" ? (
                <button>
                  <NavLink
                    to={`/tickets/assignedtickets/${user._id}`}
                    className="text-slate-600 font-semibold hover:text-slate-800 hover:underline hover:underline-offset-8"
                  >
                    Assigned Tickets
                  </NavLink>
                </button>
              ) : (
                <button onClick={() => setIsMenuOpen(false)}>
                  <NavLink
                    to={`/tickets/myticket/${user._id}`}
                    className="text-slate-600 font-semibold hover:text-slate-800 hover:underline hover:underline-offset-8"
                  >
                    My Ticket
                  </NavLink>
                </button>
              )}
            </li>
          )}
          <li>
            {isAuthenticated && user ? (
              <button
                onClick={handleLogout}
                type="button"
                className="cursor-pointer text-slate-600 font-semibold hover:text-slate-800 hover:underline hover:underline-offset-8"
              >
                Log out
              </button>
            ) : (
              <button onClick={() => setIsMenuOpen(false)}>
                <NavLink
                  to="/auth?type=login"
                  className="text-slate-600 font-semibold hover:text-slate-800 hover:underline hover:underline-offset-8"
                >
                  Log in
                </NavLink>
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
