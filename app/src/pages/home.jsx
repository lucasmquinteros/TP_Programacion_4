import Activities from "../components/activities";
import ReserveButton from "../components/reserve-button";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";
import Schedules from "../components/schedules";
import Contact from "../components/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-10 my-7">
        <Hero />
        <Activities />
        <Schedules />
        <ReserveButton />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
