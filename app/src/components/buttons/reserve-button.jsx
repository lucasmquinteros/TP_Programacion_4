import { Link } from "wouter";

export default function ReserveButton() {
  return (
    <Link
      href="/reservations"
      className="text-white text-[1.2rem] bg-[#0DA6F2] rounded-3xl px-5 py-2.5 cursor-pointer mx-auto shadow-2xs"
    >
      ¡Reservá Ahora!
    </Link>
  );
}
