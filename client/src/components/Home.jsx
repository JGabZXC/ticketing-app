import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import AppContext from "../store/AppContext";

import FeatureSection from "./FeatureSection";
import WomanConfused from "../assets/woman-confused.png";
import AirConditioning from "../assets/air-conditioning.png";
import ManWithBoard from "../assets/man-with-board.png";

import Button from "./ui/button";

export default function Home() {
  const { user, message } = useContext(AuthContext);
  const { setType } = useContext(AppContext);

  function handleRegister() {
    setType("register");
  }

  function handleViewTicket() {
    setType("ticket");
  }

  let content = (
    <>
      <div className="text-center max-w-[450px] mx-auto my-0">
        <h1 className="text-6xl font-bold text-gray-800">Ticketing App</h1>
        <h2 className="text-md font-medium text-gray-600 mt-5">
          Effortlessly track, manage, and resolve tickets with our powerful,
          user-friendly ticketing app. Whether it's for events or customer
          support, stay organized and in control — all in one place.
        </h2>
        {message?.authError && (
          <p className="text-red-500 text-sm font-medium">
            {message.authError}
          </p>
        )}
      </div>
      <div className="text-sm flex gap-6 mt-5 justify-center">
        <Button
          onClick={handleRegister}
          className="cursor-pointer px-4 py-2 rounded-md text-stone-100 bg-indigo-600 font-medium hover:bg-indigo-700 transition duration-200"
        >
          Get started
        </Button>
        <Button className="cursor-pointer text-gray-900 font-medium">
          Learn More
        </Button>
      </div>
    </>
  );

  if (user) {
    content = (
      <>
        <div className="text-center">
          <h1 className="md:text-7xl text-5xl font-bold text-gray-800">
            Ticketing App
          </h1>
          <h2 className="text-lg font-medium text-gray-600 mt-10">
            Welcome back, {user.fullName}!
          </h2>
        </div>
        <div className="text-sm text-center mt-10">
          <Button
            className="cursor-pointer px-4 py-2 rounded-md text-stone-100 bg-indigo-600 hover:bg-indigo-700 transition duration-200 font-medium"
            onClick={handleViewTicket}
          >
            View Ticket
          </Button>
        </div>
      </>
    );
  }

  return (
    <section className="p-2 mt-20 mx-auto">
      {content}

      <FeatureSection
        title="What is a ticket?"
        description="A ticket is a request for support or assistance, typically submitted
            through a ticketing system. It allows users to report issues, ask
            questions, or request services from a support team."
        image={WomanConfused}
        imaegAlt="Woman confused"
      />
      <FeatureSection
        title="Stay on Top of Every Ticket"
        description="From submission to resolution, our app keeps everything smooth and
            stress-free."
        image={AirConditioning}
        imaegAlt="Air conditioning"
        reverse
      />
      <FeatureSection
        title="Control the Chaos"
        description="Track. Manage. Resolve. One ticket at a time."
        image={ManWithBoard}
        imaegAlt="Man with board"
      />
    </section>
  );
}
