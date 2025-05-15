import { createContext, useState, useContext } from "react";
import AuthContext from "./AuthContext";

const AppContext = createContext({
  type: "home",
  setType: () => {},
});

export function AppContextProvider({ children }) {
  const { setMessage } = useContext(AuthContext);
  const [type, setType] = useState("home");

  function setTypeHandler(newType) {
    setMessage(undefined);
    setType(newType);
  }

  const contextValue = {
    type,
    setType: setTypeHandler,
  };

  return <AppContext value={contextValue}>{children}</AppContext>;
}

export default AppContext;
