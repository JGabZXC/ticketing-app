import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reauthenticate } from "./store/authSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Login from "./components/Login/Login";
import HomePage from "./pages/HomePage";
import TicketsPage from "./pages/TicketsPage";

import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import Toast from "./components/Toast/Toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/tickets",
        element: <TicketsPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Check authentication status on app load
    dispatch(reauthenticate());
  }, [dispatch]);
  return (
    <>
      <Toast />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
