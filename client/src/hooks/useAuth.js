import { useDispatch } from "react-redux";
import { clearStorage } from "../store/authSlice";
export const useClearAuth = () => {
  const dispatch = useDispatch();
  dispatch(clearStorage());
  return;
};
