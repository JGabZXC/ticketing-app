import { useContext } from "react";

import AppContext from "../store/AppContext";
import Login from "./Login";

export default function Main() {
  const { type } = useContext(AppContext);
  let content = null;
  if (type === "home")
    content = (
      <section>
        <h1>You are in home</h1>
      </section>
    );

  if (type === "login") {
    content = <Login />;
  }

  return <main>{content}</main>;
}
