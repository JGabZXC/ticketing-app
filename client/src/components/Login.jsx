import { useActionState, useContext } from "react";
import Button from "./ui/button";
import { validatePassword, validateUsername } from "../utils/validation";
import AuthContext from "../store/AuthContext";
import AppContext from "../store/AppContext";

export default function Login() {
  const { login, isLoggedIn } = useContext(AuthContext);
  const { setType } = useContext(AppContext);
  const [formState, formAction, isPending] = useActionState(loginAction, {
    error: null,
    enteredValues: {
      username: "",
      password: "",
    },
  });

  async function loginAction(prevState, formData) {
    const { username, password } = Object.fromEntries(formData.entries());

    let error = {};

    const validateEnteredUsername = validateUsername(username);
    const validateEnteredPassword = validatePassword(password);

    if (validateEnteredUsername) error.username = validateEnteredUsername;
    if (validateEnteredPassword) error.password = validateEnteredPassword;

    if (Object.keys(error).length > 0)
      return { error, enteredValues: { username, password } };

    try {
      await login(username, password);
      setType("home");
      return { error: {} };
    } catch (error) {
      return {
        error: {
          api: error.message,
        },
        enteredValues: { username, password },
      };
    }
  }

  return (
    <section className="max-w-md mx-auto mt-10">
      {isLoggedIn && <p>You are logged in</p>}
      {formState.error?.api && (
        <p className="text-red-300">{formState.error.api}</p>
      )}
      <h1 className="text-2xl font-medium">Log in to Ticketing</h1>
      <form action={formAction} className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username or Email</label>
          <input
            type="text"
            id="username"
            name="username"
            className="border-2 border-slate-400 p-1 rounded-md"
            defaultValue={formState.enteredValues?.username || ""}
          />
          {formState?.error?.username && (
            <p className="text-red-300 text-sm">{formState.error.username}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-2 border-slate-400 p-1 rounded-md"
            defaultValue={formState.enteredValues?.password || ""}
          />
          {formState?.error?.password && (
            <p className="text-red-300 text-sm">{formState.error.password}</p>
          )}
        </div>
        <div className="text-end">
          <Button
            type="submit"
            disabled={isPending || isLoggedIn}
            className="px-4 py-2 cursor-pointer bg-slate-400 text-slate-50 rounded-md hover:bg-slate-600 transition-colors duration-300"
          >
            {isPending ? "Loggin in..." : "Log in"}
          </Button>
        </div>
      </form>
    </section>
  );
}
