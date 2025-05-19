import { useRouteError } from "react-router-dom";
import ErrorContent from "../components/Error/ErrorContent";
import Header from "../components/Header/Header";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  let title = "An error occurred";
  let message = "Something went wrong!";
  if (error.status === 500) message = JSON.parse(error.data).message;
  if (error.status === 404) {
    title = "Page not found";
    message = JSON.parse(error.data).message;
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
