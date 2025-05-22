import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestLogin } from "../../store/authSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "./Register";

export default function Login() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const isLoginPage = searchParams.get("type") === "login";

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData.entries());
    if (username.trim() === "" || password.trim() === "") {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(requestLogin(username, password));
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <section className="mt-10">
      <div className="p-4">
        <h1 className="mb-3 text-center text-2xl font-semibold md:text-3xl md:font-bold">
          {isLoginPage ? "Log in" : "Register"}
        </h1>
        <p className="mb-6 text-gray-600 text-center">
          {isLoginPage
            ? "Welcome! Log in to your account"
            : "Create a new account!"}
        </p>

        {isLoginPage ? (
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-100 mx-auto flex flex-col gap-4"
          >
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
        ) : (
          <Register />
        )}

        <p className="text-sm text-center text-gray-600 mt-2">
          {isLoginPage === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            to={`/auth?type=${isLoginPage ? "register" : "login"}`}
            className="text-indigo-600 hover:underline"
          >
            {isLoginPage ? "Register" : "Log in"}
          </Link>
        </p>
      </div>
    </section>
  );
}
