import { useContext } from "react";
import AuthContext from "../store/AuthContext";

import Button from "./ui/button";

export default function Home() {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <section className="p-2 mt-20 md:max-w-1/2 mx-auto text-center sm:w-full">
        <div>
          <h1 className="md:text-7xl text-5xl font-bold text-gray-800">
            Ticketing App
          </h1>
          <h2 className="text-lg font-medium text-gray-600 mt-10">
            Welcome back, {user.fullName}!
          </h2>
        </div>
        <div className="text-sm text-center mt-10">
          <Button className="cursor-pointer px-4 py-2 rounded-md text-stone-100 bg-indigo-600 hover:bg-indigo-700 transition duration-200 font-medium">
            Create Ticket
          </Button>
        </div>
      </section>
    );
  }
  return (
    <section className="p-2 mt-20 max-w-1/2 mx-auto text-center">
      <div>
        <h1 className="text-7xl font-bold text-gray-800">Ticketing App</h1>
        <h2 className="text-lg font-medium text-gray-600 mt-10">
          Submit a ticket, wait for the reply, then check for the solved answer!
        </h2>
      </div>
      <div className="text-sm flex gap-6 mt-10 justify-center">
        <Button className="cursor-pointer px-4 py-2 rounded-md text-stone-100 bg-indigo-600 font-medium hover:bg-indigo-700 transition duration-200">
          Get started
        </Button>
        <Button className="cursor-pointer text-gray-900 font-medium">
          Learn More
        </Button>
      </div>
    </section>
  );
}
