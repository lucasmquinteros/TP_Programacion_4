import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../schema/authSchema.js";
import { signIn } from "../services/auth";
import { useAuthStore } from "../store/auth-store";
import { Link, useLocation } from "wouter";
import FormInput from "../components/formInputs/FormInput";

export default function SignIn() {
  const { login } = useAuthStore();
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
  });

  const mutation = useMutation({
    mutationKey: ["signin"],
    mutationFn: signIn,
    onSuccess: (data) => {
      login(data);
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
            <FormInput
              label="Email o Username"
              id="emailOrUsername"
              type="text"
              placeholder="tu@email.com"
              register={register("emailOrUsername")}
              error={errors.emailOrUsername}
              disabled={isSubmitting || mutation.isPending}
            />
          </div>
          <div>
            <FormInput
              label="Contraseña"
              id="password"
              type="password"
              placeholder="Contraseña"
              register={register("password")}
              error={errors.password}
              disabled={isSubmitting || mutation.isPending}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || mutation.isPending}
            className="text-white bg-[#FFA500] rounded-3xl px-3 py-1.5 cursor-pointer"
          >
            {mutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
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
