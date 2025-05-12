import MePassword from "./MePassword";
import MeProfile from "./MeProfile";

export default function Me() {
  return (
    <section className="p-2 mt-20 max-w-1/2 mx-auto">
      <MeProfile />
      <MePassword />
    </section>
  );
}
