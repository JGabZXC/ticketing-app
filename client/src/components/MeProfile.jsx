import { useActionState, useContext } from "react";

import AuthContext from "../store/AuthContext";
import AppContext from "../store/AppContext";
import Input from "./ui/input";
import Button from "./ui/button";

export default function Login() {
  const { user, message, updateProfile } = useContext(AuthContext);
  const [profileState, profileAction, profilePending] = useActionState(
    profileUpdateAction,
    {
      enteredValues: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    }
  );

  async function profileUpdateAction(prevState, formData) {
    const { username, email, firstName, lastName } = Object.fromEntries(
      formData.entries()
    );

    await updateProfile(formData);

    return {
      ...prevState,
      enteredValues: {
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
    };
  }

  return (
    <div className="mt-10">
      {message?.updateMessage.message && message?.updateMessage.success && (
        <p className="text-center text-green-300">
          {message.updateMessage.message}
        </p>
      )}
      {message?.updateMessage.message && !message?.updateMessage.success && (
        <p className="text-center text-red-300">
          {message.updateMessage.message}
        </p>
      )}
      <form action={profileAction} className="flex flex-col gap-4">
        <Input
          labelText="Username"
          id="username"
          name="username"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={profileState.enteredValues.username}
        />
        <Input
          labelText="Email"
          id="email"
          name="email"
          type="email"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={profileState.enteredValues.email}
        />
        <Input
          labelText="First Name"
          id="firstName"
          name="firstName"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={profileState.enteredValues.firstName}
        />
        <Input
          labelText="Last Name"
          id="lastName"
          name="lastName"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={profileState.enteredValues.lastName}
        />
        <Button
          type="submit"
          className=" px-4 py-2 cursor-pointer bg-indigo-600 text-slate-50 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          disabled={profilePending}
        >
          Update
        </Button>
      </form>
    </div>
  );
}
