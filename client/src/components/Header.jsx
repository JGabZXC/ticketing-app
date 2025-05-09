import { useContext } from "react";

import Button from "./ui/button";
import AppContext from "../store/AppContext";
import AuthContext from "../store/AuthContext";

export default function Header() {
  const { setType } = useContext(AppContext);
  const { user, Logout } = useContext(AuthContext);

  function handleHome() {
    setType("home");
  }

  function handleTicket() {
    setType("home");
  }

  function handleLogin() {
    setType("login");
  }

  function handleLogout() {
    setType("home");
    Logout();
  }

  return (
    <header className="flex justify-between p-2 font-medium">
      <h1 className="text-2xl text-gray-900">Ticketing Request</h1>
      <ul className="flex gap-4 font-light text-lg">
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
          <li>
            <Button defaultButton>Me</Button>
          </li>
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
