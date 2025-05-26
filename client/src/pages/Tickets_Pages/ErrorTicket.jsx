import { useAsyncError } from "react-router-dom";
import ErrorContent from "../../components/Error/ErrorContent";

export default function ErrorTicket() {
  const error = useAsyncError();
  let title = "500 | Internal Server Error";
  let message = "Something went wrong!";

  if (error.status === 400) {
    title = "400 | Bad Request";
    message = "Invalid ticket ID";
  }

  if (error.status === 404) {
    title = "404 | Not Found";
    message = error.message || "The requested resource could not be found.";
  }

  return (
    <>
      <ErrorContent title={title} status={500}>
        <p className="text-lg text-slate-600">{message}</p>
      </ErrorContent>
    </>
  );
}
