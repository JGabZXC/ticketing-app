import { useContext } from "react";

import AppContext from "../store/AppContext";
import Login from "./Login";
import Home from "./Home";

export default function Main() {
  const { type } = useContext(AppContext);
  let content = null;
  if (type === "home") content = <Home />;

  if (type === "login") {
    content = <Login />;
  }

  return <main className="font-poppins">{content}</main>;
}
