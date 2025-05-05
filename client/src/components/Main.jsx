import { useContext } from "react";

import AppContext from "../store/AppContext";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";

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

  return <main className="font-poppins">{content}</main>;
}
