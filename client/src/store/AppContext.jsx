import { createContext, useState } from "react";

const AppContext = createContext({
  type: "home",
  setType: () => {},
});

export function AppContextProvider({ children }) {
  const [type, setType] = useState("home");

  function setTypeHandler(newType) {
    setType(newType);
  }

  const contextValue = {
    type,
    setType: setTypeHandler,
  };

  return <AppContext value={contextValue}>{children}</AppContext>;
}

export default AppContext;
