import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const isAuthenticated =
    useSelector((state) => state.auth?.isAuthenticated) ||
    localStorage.getItem("isAuthenticated");
  const user =
    useSelector((state) => state.auth?.user) || localStorage.getItem("user");

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth?type=login" replace />;
  }

  return children;
}
