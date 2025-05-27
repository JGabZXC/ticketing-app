import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions, reauthenticate } from "./store/authSlice";
import { RouterProvider } from "react-router-dom";

import Toast from "./components/Toast/Toast";
import { router } from "./router";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Check authentication status on app load
    async function checkAuth() {
      const result = await dispatch(reauthenticate());
      if (reauthenticate.rejected.match(result)) {
        dispatch(authActions.clearAuthState());
      }
    }
    checkAuth();
  }, [dispatch]);
  return (
    <>
      <Toast />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
