import { createContext, useState, useContext } from "react";
import AuthContext from "./AuthContext";

const AppContext = createContext({
  type: "home",
  selectedTicket: null,
  setSelectedTicket: () => {},
  setType: () => {},
});

export function AppContextProvider({ children }) {
  const { setMessage } = useContext(AuthContext);
  const [type, setType] = useState("home");
  const [selectedTicket, setSelectedTicket] = useState(null);

  function setTypeHandler(newType) {
    setMessage(undefined);
    setType(newType);
    if (newType !== "showTicket") setSelectedTicket(null);
  }

  function setSelectedTicketHandler(ticket) {
    setMessage(undefined);
    setSelectedTicket(ticket);
  }

  const contextValue = {
    type,
    selectedTicket,
    setSelectedTicket: setSelectedTicketHandler,
    setType: setTypeHandler,
  };

  return <AppContext value={contextValue}>{children}</AppContext>;
}

export default AppContext;
