import { Link } from "wouter";
import { useAuthStore } from "../store/auth-store";
import { useState } from "react";

export default function Header() {
  const { user, isAuthenticated } = useAuthStore();
  console.log(user);

  const [open, setOpen] = useState(false);

  return (
    <header className=" bg-white">
      <div className="p-3 mx-auto flex justify-between items-center lg:w-[90%] md:p-6">
        <div className="md:hidden">
          <button
            className="flex flex-col gap-[5px] z-50 mx-1.5"
            onClick={() => setOpen(true)}
          >
            <span className="w-6 h-[3px] rounded-4xl bg-gray-800"></span>
            <span className="w-6 h-[3px] rounded-4xl bg-gray-800"></span>
            <span className="w-6 h-[3px] rounded-4xl bg-gray-800"></span>
          </button>
        </div>
        <Link href="/" className="flex items-center">
          <img
            className="w-8 h-8 cursor-pointer"
            src="./logo.png"
            alt="logo de SkyJumpPark"
          />
          <h3 className="cursor-pointer">SkyJumpPark</h3>
        </Link>
        <div className="hidden md:flex">
          <nav className="flex gap-5 lg:gap-12">
            <a className="cursor-pointer">Inicio</a>
            <a className="cursor-pointer">Actividades</a>
            <a className="cursor-pointer">Reservas</a>
            <a className="cursor-pointer">Contacto</a>
          </nav>
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
                className="text-red-600 border-red-600 bg-red-200 border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer hidden lg:block"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/sign-in">
                <img
                  className="w-8 h-8 cursor-pointer md:hidden"
                  src="./user.png"
                  alt="icono genérico de usuario"
                />
              </Link>
              <Link
                href="/sign-in"
                className="text-[#FFA500] border-[#FFA500] border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer hidden md:block"
              >
                Inicia Sesión
              </Link>
              <Link
                href="/sign-up"
                className="text-white bg-[#FFA500] rounded-3xl px-3 py-1.5 cursor-pointer hidden md:block"
              >
                Registrate
              </Link>
            </div>
          )}
        </div>
        <div
          className={`flex flex-col justify-between p-6 items-start fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className=" absolute top-4 left-6 text-2xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <nav className="flex flex-col gap-6 text-lg mt-16">
            <a href="#">Inicio</a>
            <a href="#">Actividades</a>
            <a href="#">Reservas</a>
            <a href="#">Contacto</a>
          </nav>
          <button
            href="/sign-up"
            className="text-red-600 border-red-600 bg-red-200 border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
        {open && (
          <div
            className="fixed inset-0 bg-gray-400 opacity-40 z-30"
            onClick={() => setOpen(false)}
          ></div>
        )}
      </div>
    </header>
  );
}
