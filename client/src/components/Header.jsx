import { useContext } from "react";

import Button from "./ui/button";
import AppContext from "../store/AppContext";
export default function Header() {
  const { setType } = useContext(AppContext);

  function handleHome() {
    setType("home");
  }

  function handleTicket() {
    setType("home");
  }

  function handleLogin() {
    setType("login");
  }
  return (
    <header className="flex justify-between p-2">
      <h1 className="text-2xl">Ticketing Request</h1>
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
        <li>
          <Button defaultButton onClick={handleLogin}>
            Log in
          </Button>
        </li>
      </ul>
    </header>
  );
}
