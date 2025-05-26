import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reauthenticate } from "./store/authSlice";
import { RouterProvider } from "react-router-dom";

import Toast from "./components/Toast/Toast";
import { router } from "./router";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Check authentication status on app load
    dispatch(reauthenticate());
  }, [dispatch]);
  return (
    <>
      <Toast />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
