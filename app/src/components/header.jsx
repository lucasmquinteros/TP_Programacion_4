import { Link } from "wouter";
import { useAuthStore } from "../store/auth-store";

export default function Header() {
  const { user, isAuthenticated } = useAuthStore();
  console.log(user);

  return (
    <header className=" bg-white">
      <div className="p-6 mx-auto flex justify-between items-center lg:w-[90%]">
        <div className="flex items-center">
          <img
            className="w-8 h-8 cursor-pointer"
            src="./user.png"
            alt="icono genérico de usuario"
          />
          <h3>SkyJumpPark</h3>
        </div>
        <div>
          <ul className="flex gap-5 lg:gap-12">
            <li className="cursor-pointer">Inicio</li>
            <li className="cursor-pointer">Actividades</li>
            <li className="cursor-pointer">Reservas</li>
            <li className="cursor-pointer">Contacto</li>
          </ul>
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-5">
              <img
                className="w-8 h-8 cursor-pointer"
                src="./user.png"
                alt="icono genérico de usuario"
              />
              <button
                href="/sign-up"
                className="text-red-600 border-red-600 bg-red-300 border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                href="/sign-in"
                className="text-[#FFA500] border-[#FFA500] border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer"
              >
                Inicia Sesión
              </Link>
              <Link
                href="/sign-up"
                className="text-white bg-[#FFA500] rounded-3xl px-3 py-1.5 cursor-pointer"
              >
                Registrate
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
