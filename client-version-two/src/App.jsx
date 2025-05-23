import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reauthenticate } from "./store/authSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Login from "./components/Login/Login";
import HomePage from "./pages/HomePage";
import TicketsPage from "./pages/TicketsPage";

import Toast from "./components/Toast/Toast";
import TicketDetailPage from "./pages/TicketDetailPage";
import TicketRoot from "./pages/TicketRoot";
import ErrorPage from "./pages/ErrorPage";

import {
  action as ticketNewAction,
  actionDeleteandPost,
} from "./components/Tickets/TicketForm";
import { loader as ticketsLoader } from "./pages/TicketsPage";
import { loader as ticketLoader } from "./pages/TicketDetailPage";
import TicketNew from "./pages/TicketNew";
import MyTicket from "./pages/MyTicket";

import { action as registerAction } from "./components/Login/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "tickets",
        element: <TicketRoot />,
        children: [
          {
            index: true,
            element: <TicketsPage />,
            loader: ticketsLoader,
          },
          {
            path: ":ticketId",
            element: <TicketDetailPage />,
            loader: ticketLoader,
            action: actionDeleteandPost,
          },
          {
            path: "new",
            element: <TicketNew />,
            action: ticketNewAction,
          },
          {
            path: "myticket/:userId",
            element: <MyTicket />,
            loader: ticketsLoader,
          },
        ],
      },
      {
        path: "auth",
        element: <Login />,
        action: registerAction,
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
