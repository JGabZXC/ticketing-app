import { useContext } from "react";

import AppContext from "../store/AppContext";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import Me from "./Me";
import Ticket from "./Ticket/Ticket";
import CreateTicket from "./Ticket/CreateTicket";
import MyTicket from "./MyTickets/MyTicket";
import ShowTicket from "./ShowTicket";

export default function Main() {
  const { type } = useContext(AppContext);
  let content = null;
  if (type === "home") content = <Home />;

  if (type === "login") {
    content = <Login />;
  }

  if (type === "register") {
    content = <Register />;
  }

  if (type === "me") {
    content = <Me />;
  }

  if (type === "ticket") {
    content = <Ticket />;
  }

  if (type === "createTicket") {
    content = <CreateTicket />;
  }

  if (type === "myTicket") {
    content = <MyTicket />;
  }

  if (type === "showTicket") {
    content = <ShowTicket />;
  }

  return <main className="font-poppins">{content}</main>;
}
