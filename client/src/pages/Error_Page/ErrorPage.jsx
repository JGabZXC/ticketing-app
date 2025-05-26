import { useRouteError } from "react-router-dom";
import ErrorContent from "../../components/Error/ErrorContent";
import Header from "../../components/Header/Header";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "500 | An error occurred";
  let message = "Something went wrong!";

  console.log(error);

  if (error.status === 404) {
    title = "404 | Page not found";
    message = "Could not find resource or page.";
  }
  if (error.status === 401) {
    title = "401 | Unauthorized";
    message = "You are not authorized to access this resource.";
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
