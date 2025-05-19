export default function TicketItemMessage({ ticket }) {
  const comments = ticket.comments;
  return (
    <section className="p-4 max-w-7xl mx-auto">
      {comments.length > 0 ? (
        <>
          <h1>Ticket Message Goes Here</h1>
          <ul>
            <li>
              <p>Ticket username | User</p>
              <p>May 22, 2025 8:23 AM</p>
              <p>Ticket Message</p>
            </li>
          </ul>
        </>
      ) : (
        <p>No comments available</p>
      )}
    </section>
  );
}
