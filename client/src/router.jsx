import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Login from "./components/Login/Login";
import HomePage from "./pages/Home_Page/HomePage";
import TicketsPage from "./pages/Tickets_Pages/TicketsPage";

import TicketDetailPage from "./pages/Tickets_Pages/TicketDetailPage";
import TicketRoot from "./pages/Tickets_Pages/TicketRoot";
import ErrorPage from "./pages/Error_Page/ErrorPage";

import { loader as ticketsLoader } from "./pages/Tickets_Pages/TicketsPage";
import { loader as ticketLoader } from "./pages/Tickets_Pages/TicketDetailPage";
import TicketNew, { newTicketAction } from "./pages/Tickets_Pages/TicketNew";
import MyTicket from "./pages/Tickets_Pages/My_Ticket_Pages/MyTicket";

import { action as registerAction } from "./components/Login/Register";
import { loader as userLoader } from "./pages/Tickets_Pages/TicketNew";
import { multiPurposeAction } from "./pages/Tickets_Pages/TicketDetailPage";

export const router = createBrowserRouter([
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
            action: multiPurposeAction,
          },
          {
            path: "new",
            element: <TicketNew />,
            action: newTicketAction,
            loader: userLoader,
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
