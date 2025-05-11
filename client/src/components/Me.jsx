import { useContext, useActionState } from "react";
import AuthContext from "../store/AuthContext";

import Button from "./ui/button";
import Input from "./ui/input";
import { updateProfileAction } from "../utils/actions";
import MeProfile from "./MeProfile";

export default function Me() {
  const { message, updateProfile, user } = useContext(AuthContext);
  const { profileState, profileAction, profilePending } = useActionState(
    updateProfileAction,
    null
  );

  function handleUpdateProfile(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    document.querySelector("#updateProfile").reset();
    updateProfile(formData);
  }
  return (
    <section className="p-2 mt-20 max-w-1/2 mx-auto">
      <MeProfile />
      {/* <div>
        <h1 className="text-2xl font-bold text-center">Update your Password</h1>
        <div className="mt-10">
          <form action="" className="flex flex-col gap-4">
            <Input
              labelText="Current Password"
              id="currentPassword"
              name="currentPassword"
              type="password"
              className="border-2 border-gray-400 p-1 rounded-md"
            />
            <Input
              labelText="New Password"
              id="password"
              name="password"
              type="password"
              className="border-2 border-gray-400 p-1 rounded-md"
            />
            <Input
              labelText="Confirm New Password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              className="border-2 border-gray-400 p-1 rounded-md"
            />
            <Button
              type="submit"
              className=" px-4 py-2 cursor-pointer bg-indigo-600 text-slate-50 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Update Password
            </Button>
          </form>
        </div>
      </div> */}
    </section>
  );
}
