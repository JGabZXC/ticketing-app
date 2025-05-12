import { useActionState, useContext, useEffect, startTransition } from "react";

import AuthContext from "../store/AuthContext";
import Input from "./ui/input";
import Button from "./ui/button";

export default function MePassword() {
  const { message, setMessage, updatePassword } = useContext(AuthContext);
  const [passwordState, passwordAction, passwordPending] = useActionState(
    passwordUpdateAction,
    {
      enteredValues: {
        currentPassword: "",
        password: "",
        confirmPassword: "",
      },
    }
  );

  useEffect(() => {
    if (message?.updatePasswordMessage) {
      startTransition(() => {
        passwordAction({
          enteredValues: {
            currentPassword: "",
            password: "",
            confirmPassword: "",
          },
        });
      });
      const timer = setTimeout(() => {
        setMessage({});
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message?.updatePasswordMessage, setMessage, passwordAction]);

  async function passwordUpdateAction(prevState, formData) {
    if (!(formData instanceof FormData)) return formData;
    const { currentPassword, password, confirmPassword } = Object.fromEntries(
      formData.entries()
    );

    await updatePassword(formData);

    return {
      enteredValues: {
        currentPassword: currentPassword,
        password: password,
        confirmPassword: confirmPassword,
      },
    };
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Update your Password</h1>
      <div className="mt-10">
        {message?.updatePasswordMessage?.message &&
          message?.updatePasswordMessage.success && (
            <p className="text-center text-green-300">
              {message.updatePasswordMessage.message}
            </p>
          )}
        {message?.updatePasswordMessage?.message &&
          !message?.updatePasswordMessage.success && (
            <p className="text-center text-red-300">
              {message.updatePasswordMessage.message}
            </p>
          )}
        <form action={passwordAction} className="flex flex-col gap-4">
          <Input
            labelText="Current Password"
            id="currentPassword"
            name="currentPassword"
            type="password"
            className="border-2 border-gray-400 p-1 rounded-md"
            defaultValue={passwordState.enteredValues.currentPassword}
          />
          <Input
            labelText="New Password"
            id="password"
            name="password"
            type="password"
            className="border-2 border-gray-400 p-1 rounded-md"
            defaultValue={passwordState.enteredValues.password}
          />
          <Input
            labelText="Confirm New Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="border-2 border-gray-400 p-1 rounded-md"
            defaultValue={passwordState.enteredValues.confirmPassword}
          />
          <Button
            type="submit"
            className=" px-4 py-2 cursor-pointer bg-indigo-600 text-slate-50 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            disabled={passwordPending}
          >
            {passwordPending ? "Updating.Password.." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
