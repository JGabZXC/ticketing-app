import { useContext } from "react";
import AppContext from "../../store/AppContext";

import Button from "../ui/button";

export default function CreateTicketButton() {
  const { setType } = useContext(AppContext);
  function createTicketHandler() {
    setType("createTicket");
  }
  return (
    <Button
      type="button"
      className="cursor-pointer my-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
      onClick={createTicketHandler}
    >
      Create Ticket
    </Button>
  );
}
