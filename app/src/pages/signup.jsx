import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signUp } from "../services/auth";
import { useAuthStore } from "../store/auth-store";
import { Link } from "wouter";

export default function SignUp() {
  const { login } = useAuthStore();
  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
    onSuccess: login,
  });

  const onSubmit = mutation.mutate;

  return (
    <div className="flex items-center h-screen">
      <div className="bg-white rounded-4xl text-black p-5 shadow-2xl m-auto w-11/12 lg:w-1/3">
        <form
          className="flex max-w flex-col gap-3.5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center text-2xl font-bold">Crea tu cuenta</h2>
          <p className="text-center text-gray-700">
            Únete a la diversión y gestiona tus reservas fácilmente.
          </p>
          <div>
            <div className="mb-2 block">
              <label className=" text-black" htmlFor="name">
                Nombre completo
              </label>
            </div>
            <input
              className="bg-[#f1f6f8] rounded-3xl px-3 py-2 w-full"
              id="name"
              type="text"
              placeholder="Pepe Gomez"
              required
              {...register("userName")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label className=" text-black" htmlFor="email">
                Correo electrónico
              </label>
            </div>
            <input
              className="bg-[#f1f6f8] rounded-3xl px-3 py-2 w-full"
              id="email"
              type="email"
              placeholder="tu@email.com"
              required
              {...register("email")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="password" className=" text-black">
                Contraseña
              </label>
            </div>
            <input
              className="bg-[#f1f6f8] rounded-3xl px-3 py-2 w-full"
              id="password"
              type="password"
              required
              placeholder="Contraseña"
              {...register("password")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="confirmPassword" className=" text-black">
                Confirmar Contraseña
              </label>
            </div>
            <input
              className="bg-[#f1f6f8] rounded-3xl px-3 py-2 w-full"
              id="confirmPassword"
              type="password"
              required
              placeholder="Repetir contraseña"
              {...register("confirmPassword")}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-[#FFA500] rounded-3xl px-3 py-1.5 cursor-pointer"
          >
            Registrarse
          </button>
          <p className="text-center text-gray-700">
            ¿Ya tenés una cuenta?{" "}
            <Link href="sign-in" className="text-[#FFA500]">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
