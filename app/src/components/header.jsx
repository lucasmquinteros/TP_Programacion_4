import { Link } from "wouter";
import { useAuthStore } from "../store/auth-store";

export default function Header() {
  const { user } = useAuthStore();
  console.log(user);

  return (
    <header>
      <h1>Hola {user?.userName}</h1>
      <Link href="/sign-up" className="text-[#FFA500]">
        Registrate
      </Link>
    </header>
  );
}
