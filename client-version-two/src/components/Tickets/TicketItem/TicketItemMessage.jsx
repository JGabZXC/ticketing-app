export default function TicketItemMessage({ ticket }) {
  const comments = ticket.comments;
  const size = 10; // Number of comments to display per page
  const newComments = [];
  for (let i = 0; i < comments.length; i += size) {
    const pageComments = comments.slice(i, i + size);
    newComments.push(pageComments);
  }

  return (
    <section className="p-4 max-w-7xl mx-auto">
      {comments.length > 0 ? (
        <>
          <h2 className="text-slate-700 font-medium mb-5">
            Comments ({comments.length})
          </h2>
          <ul>
            {comments.map((comment) => (
              <li className="mb-2">
                <div className="flex gap-2">
                  <span className="text-slate-600 font-medium">
                    {comment.postedBy.fullName}
                  </span>
                  <span className="text-slate-600">
                    {new Date(ticket.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-slate-600">
                  {comment.comment.split("\n").map((line) => (
                    <>
                      {line}
                      <br />
                    </>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No comments available</p>
      )}
    </section>
  );
}
