import { Link, useLocation } from "wouter";
import { useAuthStore } from "../store/auth-store";
import { useState } from "react";
import { signOut } from "../services/auth";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [location] = useLocation();

  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <header className=" bg-white sticky top-0 border-b border-b-gray-200 z-10">
      <div className="p-3 mx-auto flex justify-between items-center lg:w-[90%] md:p-6">
        <div className="md:hidden">
          <button
            className="flex flex-col gap-[5px] z-50 mx-1.5"
            onClick={() => setMenu(true)}
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
            {location === "/" ? (
              <>
                <a
                  href="#"
                  className="cursor-pointer relative
                     after:content-[''] after:absolute after:bottom-0 after:left-0
                     after:w-0 hover:after:w-full after:h-0.5 after:bg-[#ffa500]
                     after:transition-all after:duration-300"
                >
                  Inicio
                </a>{" "}
                <a
                  href="#activities"
                  className="cursor-pointer relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0
                 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#ffa500]
                 after:transition-all after:duration-300"
                >
                  Actividades
                </a>
                <Link
                  href="/reservations"
                  className="cursor-pointer relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0
                 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#ffa500]
                 after:transition-all after:duration-300"
                >
                  Reservar
                </Link>
                <a
                  href="#contact"
                  className="cursor-pointer relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0
                 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#ffa500]
                 after:transition-all after:duration-300"
                >
                  Contacto
                </a>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="cursor-pointer relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0
                 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#ffa500]
                 after:transition-all after:duration-300"
                >
                  Inicio
                </Link>
                <Link
                  href="/"
                  className="cursor-pointer relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0
                 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#ffa500]
                 after:transition-all after:duration-300"
                >
                  Actividades
                </Link>
                <Link
                  href="/reservations"
                  className="cursor-pointer relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0
                 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#ffa500]
                 after:transition-all after:duration-300"
                >
                  Reservar
                </Link>
                <Link
                  href="/"
                  className="cursor-pointer relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0
                 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#ffa500]
                 after:transition-all after:duration-300"
                >
                  Contacto
                </Link>
              </>
            )}
          </nav>
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-5">
              <button onClick={() => setProfile(true)}>
                <img
                  className="w-8 h-8 cursor-pointer"
                  src="./user.png"
                  alt="icono genérico de usuario"
                />
              </button>
              <button
                href="/sign-up"
                className="text-red-600 border-red-600 bg-red-200 border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer hidden lg:block
             transition-all duration-300 ease-in-out
             hover:shadow-[0_0_15px_rgba(220,38,38,0.7)] hover:border-transparent"
                onClick={() => {
                  signOut();
                  logout();
                  setProfile(false);
                }}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              {isAuthenticated ? (
                <button onClick={() => setProfile(true)}>
                  <img
                    className="w-8 h-8 cursor-pointer md:hidden"
                    src="./user.png"
                    alt="icono genérico de usuario"
                  />
                </button>
              ) : (
                <Link href="/sign-in">
                  <img
                    className="w-8 h-8 cursor-pointer md:hidden"
                    src="./user.png"
                    alt="icono genérico de usuario"
                  />
                </Link>
              )}
              <Link
                href="/sign-in"
                className="text-[#FFA500] Border-[#FFA500] border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer hidden md:block
             transition-colors duration-300
             hover:bg-[#FFA500] hover:text-white"
              >
                Inicia Sesión
              </Link>

              <Link
                href="/sign-up"
                className="text-white bg-[#FFA500] border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer hidden md:block
             transition-colors duration-300
             hover:bg-white hover:text-[#FFA500] hover:border-[#FFA500] hover:border-[1.8px]"
              >
                Regístrate
              </Link>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col justify-between p-6 items-start fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
            menu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className=" absolute top-4 left-6 text-2xl"
            onClick={() => setMenu(false)}
          >
            ✕
          </button>
          <nav className="flex flex-col gap-6 text-lg mt-16">
            {location === "/" ? (
              <>
                <a href="#" className="cursor-pointer">
                  Inicio
                </a>{" "}
                <a href="#activities" className="cursor-pointer">
                  Actividades
                </a>
                <Link href="/reservations" className="cursor-pointer">
                  Reservar
                </Link>
                <a href="#contact" className="cursor-pointer">
                  Contacto
                </a>
              </>
            ) : (
              <>
                <Link href="/" className="cursor-pointer">
                  Inicio
                </Link>
                <Link href="/" className="cursor-pointer">
                  Actividades
                </Link>
                <Link href="/reservations" className="cursor-pointer">
                  Reservar
                </Link>
                <Link href="/" className="cursor-pointer">
                  Contacto
                </Link>
              </>
            )}
          </nav>
          {isAuthenticated ? (
            <button
              href="/sign-up"
              className="text-red-600 border-red-600 bg-red-200 border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer hidden lg:block
             transition-all duration-300 ease-in-out
             hover:shadow-[0_0_15px_rgba(220,38,38,0.7)] hover:border-transparent"
              onClick={() => {
                signOut();
                logout();
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <></>
          )}
        </div>

        <div
          className={`flex flex-col justify-between p-6 items-start fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 md:w-[30%] ${
            profile ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className=" absolute top-4 right-6 text-2xl cursor-pointer"
            onClick={() => setProfile(false)}
          >
            ✕
          </button>
          <nav className="flex flex-col gap-6 text-lg mt-16">
            <div>
              <h5>Hola, {user?.userName}!</h5>
              <span className="text-gray-500 text-[16px]">{user?.email}</span>
            </div>
            <hr className="w-[300%]" />
            <Link
              href="/user-reservations"
              className="cursor-pointer relative group"
            >
              Tus Reservas
              <span className="block h-0.5 bg-[#FFA500] absolute -bottom-1 left-0 w-full transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>

            {user?.roles?.includes("Admin") && (
              <>
                <Link href="/admin" className="cursor-pointer relative group">
                  Estadísticas
                  <span className="block h-0.5 bg-[#FFA500] absolute -bottom-1 left-0 w-full transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
                </Link>
                <Link href="/users" className="cursor-pointer relative group">
                  Usuarios
                  <span className="block h-0.5 bg-[#FFA500] absolute -bottom-1 left-0 w-full transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
                </Link>
              </>
            )}
          </nav>
          <button
            href="/sign-up"
            className="text-red-600 border-red-600 bg-red-200 border-[1.8px] rounded-3xl px-3 py-1.5 cursor-pointer"
            onClick={() => {
              signOut();
              logout();
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {(menu || profile) && (
          <div
            className="fixed inset-0 bg-gray-400 opacity-40 z-30"
            onClick={() => {
              setMenu(false);
              setProfile(false);
            }}
          ></div>
        )}
      </div>
    </header>
  );
}
