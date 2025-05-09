import { useActionState, useContext, useEffect, startTransition } from "react";

import Input from "./ui/input";
import {
  validateRegisteredUsername,
  validateRegisteredEmail,
  validateRegisteredFirstName,
  validateRegisteredLastName,
  validateRegisteredPassword,
  validateRegisteredConfirmPassword,
} from "../utils/validation";
import Button from "./ui/button";
import AppContext from "../store/AppContext";
import AuthContext from "../store/AuthContext";

export default function Register() {
  const { setType } = useContext(AppContext);
  const { register, message } = useContext(AuthContext);
  const [formState, formAction, isPending] = useActionState(registerAction, {
    enteredValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    error: null,
  });

  async function registerAction(prevState, formData) {
    if (!(formData instanceof FormData)) return formData;
    const { username, email, firstName, lastName, password, confirmPassword } =
      Object.fromEntries(formData.entries());

    let error = {};

    const validatedUsername = validateRegisteredUsername(username);
    const validatedEmail = validateRegisteredEmail(email);
    const validatedFirstName = validateRegisteredFirstName(firstName);
    const validatedLastName = validateRegisteredLastName(lastName);
    const validatedPassword = validateRegisteredPassword(password);
    const validatedConfirmPassword = validateRegisteredConfirmPassword(
      password,
      confirmPassword
    );

    if (validatedUsername) error.username = validatedUsername;
    if (validatedEmail) error.email = validatedEmail;
    if (validatedFirstName) error.firstName = validatedFirstName;
    if (validatedLastName) error.lastName = validatedLastName;
    if (validatedPassword) error.password = validatedPassword;
    if (validatedConfirmPassword)
      error.confirmPassword = validatedConfirmPassword;

    if (Object.keys(error).length > 0) {
      return {
        error,
        enteredValues: {
          username,
          email,
          firstName,
          lastName,
          password,
          confirmPassword,
        },
      };
    }

    await register(
      username,
      email,
      firstName,
      lastName,
      password,
      confirmPassword
    );
    return {
      error: null,
      enteredValues: {
        username,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      },
    };
  }

  useEffect(() => {
    if (message?.success) {
      const timeout = setTimeout(() => {
        startTransition(() => {
          formAction({
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
          });
          setType("login");
        });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [message, setType, formAction]);

  function handleLogin() {
    setType("login");
  }

  return (
    <section className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-medium text-slate-900">
        Register an account
      </h1>
      {message?.registerError && (
        <p className="text-red-300">{message.registerError.error}</p>
      )}
      <form action={formAction} className="flex flex-col gap-4 mt-4">
        <Input
          labelText="Username"
          type="username"
          id="username"
          name="username"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={formState.enteredValues?.username || ""}
          error={formState.error?.username}
        />
        <Input
          labelText="Email"
          type="email"
          id="email"
          name="email"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={formState.enteredValues?.email || ""}
          error={formState.error?.email || ""}
        />
        <Input
          labelText="First Name"
          type="text"
          id="firstName"
          name="firstName"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={formState.enteredValues?.firstName || ""}
          error={formState.error?.firstName}
        />
        <Input
          labelText="Last Name"
          type="text"
          id="lastName"
          name="lastName"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={formState.enteredValues?.lastName || ""}
          error={formState.error?.lastName}
        />
        <Input
          labelText="Password"
          type="password"
          id="password"
          name="password"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={formState.enteredValues?.password || ""}
          error={formState.error?.password}
        />
        <Input
          labelText="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={formState.enteredValues?.confirmPassword || ""}
          error={formState.error?.confirmPassword}
        />
        <Button
          type="submit"
          className="px-4 py-2 cursor-pointer bg-indigo-600 text-slate-50 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>
      <div className="mt-4">
        <p>
          Already have an account?{" "}
          <button
            className="cursor-pointer font-medium underline"
            onClick={handleLogin}
          >
            Login here
          </button>
        </p>
      </div>
    </section>
  );
}
