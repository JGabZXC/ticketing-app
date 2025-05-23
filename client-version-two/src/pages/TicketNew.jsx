import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TicketForm from "../components/Tickets/TicketForm";

export default function TicketNew() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isAuthenticated) {
      navigate("/auth?type=login");
    }
  }, [user, isAuthenticated, navigate]);

  return <TicketForm />;
}
