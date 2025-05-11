import { useActionState, useContext } from "react";

import AuthContext from "../store/AuthContext";
import AppContext from "../store/AppContext";
import Input from "./ui/input";
import Button from "./ui/button";

export default function Login() {
  const { user, message } = useContext(AuthContext);
  const [profileState, profileAction, profilePending] = useActionState(
    profileUpdateAction,
    {}
  );

  async function profileUpdateAction(prevState, formData) {
    const { username, email, firstName, lastName } = Object.fromEntries(
      formData.entries()
    );

    console.log(username);
  }
  return (
    <div className="mt-10">
      {message?.updateMessage && (
        <p className="text-center text-green-300">{message.updateMessage}</p>
      )}
      <form action={profileAction} className="flex flex-col gap-4">
        <Input
          labelText="Username"
          id="username"
          name="username"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={user.username}
        />
        <Input
          labelText="Email"
          id="email"
          name="email"
          type="email"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={user.email}
        />
        <Input
          labelText="First Name"
          id="firstName"
          name="firstName"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={user.firstName}
        />
        <Input
          labelText="Last Name"
          id="lastName"
          name="lastName"
          className="border-2 border-gray-400 p-1 rounded-md"
          defaultValue={user.lastName}
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

//  <section className="max-w-md mx-auto mt-10">
//       <form action={formAction} className="flex flex-col gap-4 mt-4">
//         <Input
//           labelText="Username"
//           id="username"
//           name="username"
//           className="border-2 border-gray-400 p-1 rounded-md"
//         />
//         <Input
//           labelText="Email"
//           id="email"
//           name="email"
//           type="email"
//           className="border-2 border-gray-400 p-1 rounded-md"
//         />
//         <Input
//           labelText="First Name"
//           id="firstName"
//           name="firstName"
//           className="border-2 border-gray-400 p-1 rounded-md"
//         />
//         <Input
//           labelText="Last Name"
//           id="lastName"
//           name="lastName"
//           className="border-2 border-gray-400 p-1 rounded-md"
//         />
//         <Button
//           type="submit"
//           className="px-4 py-2 cursor-pointer bg-indigo-600 text-slate-50 rounded-md hover:bg-indigo-700 transition-colors duration-200"
//         >
//           {isPending ? "Loggin in..." : "Log in"}
//         </Button>
// </form>
//     </section>
{
  /* <form action={formAction} className="flex flex-col gap-4 mt-4">
        <Input
          labelText="Username or Email"
          id="username"
          name="usernamex"
          type="text"
          className="border-2 border-gray-400 p-1 rounded-md"
        />
        <Input
          labelText="Password"
          type="password"
          id="password"
          name="password"
          className="border-2 border-slate-400 p-1 rounded-md"
        />
        <Button
          type="submit"
          className="px-4 py-2 cursor-pointer bg-indigo-600 text-slate-50 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          {isPending ? "Loggin in..." : "Log in"}
        </Button>
      </form> */
}
