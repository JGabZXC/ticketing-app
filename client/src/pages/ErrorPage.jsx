import { useRouteError } from "react-router-dom";
import ErrorContent from "../components/Error/ErrorContent";
import Header from "../components/Header/Header";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "An error occurred";
  let message = "Something went wrong!";

  if (error.status === 500) message = JSON.parse(error.data).message;
  if (error.status === 404) {
    title = "Page not found";
    message = "Could not find resource or page.";
  }
  if (error.status === 401) {
    title = "Unauthorized";
    message = "You are not authorized to access this resource.";
  }
  if (error.status === 400) {
    title = "Bad Request";
    message = "Invalid request.";
  }

  return (
    <>
      <Header />
      <ErrorContent title={title} status={500}>
        <p>{message}</p>
      </ErrorContent>
    </>
  );
}
