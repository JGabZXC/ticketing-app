import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RedirectIfAuthenticated({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  // If the user is authenticated, redirect to "/"
  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Otherwise, render the children (e.g., the Login component)
  return children;
}
