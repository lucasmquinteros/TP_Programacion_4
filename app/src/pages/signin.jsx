import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signIn } from "../services/auth";
import { useAuthStore } from "../store/auth-store";
import { Link, useLocation } from "wouter";

export default function SignIn() {
  const { login } = useAuthStore();
  const { register, handleSubmit } = useForm();
  const [, setLocation] = useLocation();
  const mutation = useMutation({
    mutationKey: ["signin"],
    mutationFn: signIn,
    onSuccess: () => {
      login;
      setLocation("/");
    },
  });

  const onSubmit = (credentials) => {
    mutation.mutate(credentials);
  };

  return (
    <div className="flex items-center h-screen">
      <div className="bg-white rounded-4xl text-black p-5 shadow-2xl m-auto w-11/12 lg:w-1/3">
        <form
          className="flex max-w flex-col gap-3.5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center text-2xl font-bold">
            Bienvenido de vuelta
          </h2>
          <p className="text-center text-gray-700">
            Inicia sesión para continuar
          </p>
          <div>
            <div className="mb-2 block">
              <label className=" text-black" htmlFor="email">
                Email o Username
              </label>
            </div>
            <input
              className="bg-[#f1f6f8] rounded-3xl px-3 py-1.5 w-full"
              id="emailOrUsername"
              type="text"
              placeholder="tu@email.com"
              required
              {...register("emailOrUsername")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="password" className=" text-black">
                Contraseña
              </label>
            </div>
            <input
              className="bg-[#f1f6f8] rounded-3xl px-3 py-1.5 w-full"
              id="password"
              type="password"
              required
              placeholder="Contraseña"
              {...register("password")}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-[#FFA500] rounded-3xl px-3 py-1.5 cursor-pointer"
          >
            Iniciar sesión
          </button>
          <p className="text-center text-gray-700">
            ¿No tenés cuenta?{" "}
            <Link href="/sign-up" className="text-[#FFA500]">
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
