import { useRouteError } from "react-router-dom";
import ErrorContent from "../../components/Error/ErrorContent";
import Header from "../../components/Header/Header";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "500 | An error occurred";
  let message = JSON.parse(error.data)?.message || "Something went wrong!";

  if (error.status === 404) {
    title = "404 | Page not found";
    message = "Could not find resource or page.";
  }

  if (error.status === 403) {
    title = "403 | Forbidden";
    message =
      JSON.parse(error.data)?.message ||
      "You are forbidden to access this resource.";
  }

  if (error.status === 400) {
    title = "400 | Bad Request";
    message = "Invalid request.";
  }

  return (
    <>
      <Header />
      <ErrorContent title={title}>
        <p className="text-lg text-slate-600">{message}</p>
      </ErrorContent>
    </>
  );
}
