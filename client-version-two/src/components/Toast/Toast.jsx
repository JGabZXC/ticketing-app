import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { uiActions } from "../../store/uiSlice";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.ui.authError);
  const authSuccess = useSelector((state) => state.ui.authSuccess);
  const ticketError = useSelector((state) => state.ui.ticketError);

  useEffect(() => {
    if (authError) {
      toast.error(authError.message);
      const timer = setTimeout(() => {
        dispatch(uiActions.clearAuthError());
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (authSuccess) {
      toast.success(authSuccess.message);
      const timer = setTimeout(() => {
        dispatch(uiActions.clearAuthSuccess());
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (ticketError) {
      toast.error(ticketError.message);
      const timer = setTimeout(() => {
        dispatch(uiActions.clearTicketError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [authError, authSuccess, ticketError, dispatch]);
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
