import Header from "./components/Header";
import { AppContextProvider } from "./store/AppContext";
import { AuthContextProvider } from "./store/AuthContext";
import Main from "./components/Main";
import { TicketContextProvider } from "./store/TicketContext";

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
