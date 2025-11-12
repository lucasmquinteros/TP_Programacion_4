import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signUp } from "../services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/auth-store";
import { Link, useLocation } from "wouter";
import { signUpSchema } from "../schema/authSchema.js";
import FormInput from "../components/formInputs/FormInput";

export default function SignUp() {
  const { login } = useAuthStore();
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  const password = watch("password");

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
    onSuccess: (data) => {
      login(data);
      setLocation("/");
    },
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
            <FormInput
              label="Nombre completo"
              id="userName"
              type="text"
              placeholder="Pepe Gomez"
              register={register("userName")}
              error={errors.userName}
              disabled={isSubmitting || mutation.isLoading}
            />
          </div>
          <div>
            <FormInput
              label="Correo electrónico"
              id="email"
              type="email"
              placeholder="tu@email.com"
              register={register("email")}
              error={errors.email}
              disabled={isSubmitting || mutation.isLoading}
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
              disabled={isSubmitting || mutation.isLoading}
            />
          </div>
          <div>
            <FormInput
              label="Confirmar Contraseña"
              id="confirmPassword"
              type="password"
              placeholder="Repetir contraseña"
              register={register("confirmPassword")}
              error={errors.confirmPassword}
              disabled={isSubmitting || mutation.isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || mutation.isLoading}
            className="text-white bg-[#FFA500] rounded-3xl px-3 py-1.5 cursor-pointer disabled:bg-gray-400"
          >
            {mutation.isLoading ? "Registrando..." : "Registrarse"}
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
