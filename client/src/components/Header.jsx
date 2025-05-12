import { useContext, useState } from "react";

import Button from "./ui/button";
import AppContext from "../store/AppContext";
import AuthContext from "../store/AuthContext";

export default function Header() {
  const { setType } = useContext(AppContext);
  const { user, Logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  function handleHome() {
    setType("home");
    setIsMenuOpen(false);
  }

  function handleTicket() {
    setType("ticket");
    setIsMenuOpen(false);
  }

  function handleLogin() {
    setType("login");
    setIsMenuOpen(false);
  }

  function handleMe() {
    setType("me");
    setIsMenuOpen(false);
  }

  function handleLogout() {
    setType("home");
    setIsMenuOpen(false);
    Logout();
  }

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-900">Ticketing Request</h1>

      {/* Hamburger Menu for Mobile */}
      <button
        className="block lg:hidden text-gray-900 focus:outline-none z-10"
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
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
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
          <Button defaultButton onClick={handleHome}>
            Home
          </Button>
        </li>
        <li>
          <Button defaultButton onClick={handleTicket}>
            Ticket
          </Button>
        </li>
        {user ? (
          <>
            <li>
              <Button defaultButton>My Tickets</Button>
            </li>
            <li>
              <Button defaultButton onClick={handleMe}>
                Me
              </Button>
            </li>
          </>
        ) : null}
        <li>
          {user ? (
            <Button defaultButton onClick={handleLogout}>
              Log out
            </Button>
          ) : (
            <Button defaultButton onClick={handleLogin}>
              Log in
            </Button>
          )}
        </li>
      </ul>
    </header>
  );
}
