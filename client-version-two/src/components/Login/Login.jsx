import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestLogin } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData.entries());
    dispatch(requestLogin(username, password));
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <section className="p-4 flex justify-center items-center h-screen">
      <div>
        <h1 className="mb-3 text-center text-2xl font-semibold md:text-3xl md:font-bold">
          Log in
        </h1>
        <p className="mb-6 text-gray-600 text-center">
          Welcome! Log in to your account
        </p>
        <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username or Email"
              className="px-3 py-1 mb-4 rounded-md border-1 h-9 text-sm border-gray-300 w-full"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="px-3 py-1 mb-4 rounded-md border-1 h-9 text-sm border-gray-300 w-full"
            />
          </div>
          <button
            disabled={loading || isAuthenticated}
            className="px-4 py-2 w-full rounded-full bg-indigo-600 text-slate-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </section>
  );
}
