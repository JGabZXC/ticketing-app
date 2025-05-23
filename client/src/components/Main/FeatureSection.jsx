import Feature from "./Feature";

import WomanConfused from "../../assets/img/woman-confused.png";
import AirConditioning from "../../assets/img/air-conditioning.png";
import ManWithBoard from "../../assets/img/man-with-board.png";

export default function FeatureSection() {
  return (
    <>
      <Feature
        title="What is a ticket?"
        description="A ticket is a request for support or assistance, typically submitted
                through a ticketing system. It allows users to report issues, ask
                questions, or request services from a support team."
        image={WomanConfused}
        imaegAlt="Woman confused"
      />
      <Feature
        title="Stay on Top of Every Ticket"
        description="From submission to resolution, our app keeps everything smooth and
                stress-free."
        image={AirConditioning}
        imaegAlt="Air conditioning"
        reverse
      />
      <Feature
        title="Control the Chaos"
        description="Track. Manage. Resolve. One ticket at a time."
        image={ManWithBoard}
        imaegAlt="Man with board"
      />
    </>
  );
}
