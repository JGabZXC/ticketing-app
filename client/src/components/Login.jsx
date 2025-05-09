import { useActionState, useContext, startTransition, useEffect } from "react";
import Button from "./ui/button";
import { validatePassword, validateUsername } from "../utils/validation";
import AuthContext from "../store/AuthContext";
import AppContext from "../store/AppContext";
import Input from "./ui/input";

export default function Login() {
  const { Login, isAuthenticated, message } = useContext(AuthContext);
  const { setType } = useContext(AppContext);
  const [formState, formAction, isPending] = useActionState(loginAction, {
    error: null,
    enteredValues: {
      username: "",
      password: "",
    },
  });

  async function loginAction(prevState, formData) {
    if (!(formData instanceof FormData)) return formData;

    const { username, password } = Object.fromEntries(formData.entries());

    let error = {};

    const validateEnteredUsername = validateUsername(username);
    const validateEnteredPassword = validatePassword(password);

    if (validateEnteredUsername) error.username = validateEnteredUsername;
    if (validateEnteredPassword) error.password = validateEnteredPassword;

    if (Object.keys(error).length > 0)
      return { error, enteredValues: { username, password } };

    await Login(username, password);
    return { error: null, enteredValues: { username, password } };
  }

  function handleRegister() {
    setType("register");
  }

  useEffect(() => {
    if (message?.authSuccess) {
      const timer = setTimeout(() => {
        startTransition(() => {
          formAction({ username: "", password: "" });
          setType("home");
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message?.authSuccess, setType, formAction]);

  return (
    <section className="max-w-md mx-auto mt-10">
      {message?.authError && (
        <p className="text-red-300 text-center">{message.authError}</p>
      )}
      {message?.authSuccess && (
        <p className="text-green-300 text-center">{message.authSuccess}</p>
      )}
      <h1 className="text-2xl font-medium text-slate-900">
        Log in to Ticketing
      </h1>
      <form action={formAction} className="flex flex-col gap-4 mt-4">
        <Input
          labelText="Username or Email"
          id="username"
          name="username"
          type="text"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={formState.enteredValues?.username || ""}
          error={formState?.error?.username}
        />
        <Input
          labelText="Password"
          type="password"
          id="password"
          name="password"
          className="border-2 border-slate-400 p-1 rounded-md"
          defaultValue={formState.enteredValues?.password || ""}
          error={formState?.error?.password}
        />
        <Button
          type="submit"
          disabled={isPending || isAuthenticated}
          className="px-4 py-2 cursor-pointer bg-indigo-600 text-slate-50 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          {isPending ? "Loggin in..." : "Log in"}
        </Button>
      </form>
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <button
            className="cursor-pointer font-medium underline"
            onClick={handleRegister}
          >
            Register here
          </button>
        </p>
      </div>
    </section>
  );
}
