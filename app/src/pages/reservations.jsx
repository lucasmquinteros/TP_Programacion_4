import { Calendar } from "../components/calendar";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Reservations() {
  return (
    <>
      <Header />
      <main>
        <Calendar />
      </main>
      <Footer />
    </>
  );
}
