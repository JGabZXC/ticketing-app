import Header from "./components/Header";
import { AppContextProvider } from "./store/AppContext";
import { AuthContextProvider } from "./store/AuthContext";
import Main from "./components/Main";

function App() {
  return (
    <>
      <AuthContextProvider>
        <AppContextProvider>
          <div className="max-w-[90rem] mx-auto">
            <Header />
            <Main />
          </div>
        </AppContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
