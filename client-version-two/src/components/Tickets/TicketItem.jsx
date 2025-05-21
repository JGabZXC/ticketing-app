import TicketItemContent from "./TicketItemContent";
import TicketItemMessage from "./TicketItemMessage";

export default function TicketItem({ ticket }) {
  return (
    <>
      <TicketItemContent ticket={ticket} />
      <TicketItemMessage ticket={ticket} />
    </>
  );
}
