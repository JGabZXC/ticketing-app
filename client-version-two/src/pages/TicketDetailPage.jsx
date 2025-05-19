import { useLoaderData } from "react-router-dom";
import TicketItem from "../components/Tickets/TicketItem";

export default function TicketDetailPage() {
  const data = useLoaderData();
  const { ticket } = data.data;
  return <TicketItem ticket={ticket} />;
}
