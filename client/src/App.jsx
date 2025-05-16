import { AppContextProvider } from "./store/AppContext";
import { AuthContextProvider } from "./store/AuthContext";
import { TicketContextProvider } from "./store/TicketContext";
import Main from "./components/Main";
import Header from "./components/Header";

function App() {
  return (
    <>
      <AuthContextProvider>
        <AppContextProvider>
          <TicketContextProvider>
            <div className="max-w-[90rem] mx-auto">
              <Header />
              <Main />
            </div>
          </TicketContextProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
