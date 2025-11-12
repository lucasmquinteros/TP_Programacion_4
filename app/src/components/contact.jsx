import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { contactSchema } from "../schema/authSchema.js";
import FormInput from "../components/formInputs/FormInput";
import FormTextarea from "../components/formInputs/TextAreaInput.jsx";
export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });
  //mutation para enviar el mensaje a la API
  const sendMessageMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al enviar mensaje");
      return response.json();
    },

    onSuccess: () => {
      reset();
    },

    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  const onSubmit = (data) => {
    sendMessageMutation.mutate(data);
  };

  return (
    <div className="flex flex-col w-[80%] gap-16 md:flex-row" id="contact">
      <div className="md:w-[50%] ">
        <h2 className="text-center font-bold text-2xl mb-3">Encuéntranos</h2>
        <iframe
          className="w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6673.811665948466!2d-60.41192865249115!3d-33.242770320750765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7727a807d4005%3A0x1858756e7415df90!2sPav%C3%B3n%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1762717154349!5m2!1ses!2sar"
          width="600"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="md:w-[50%] ">
        <h2 className="text-center font-bold text-2xl mb-3">Contáctanos</h2>
        <form
          className="flex max-w flex-col gap-3.5 bg-white rounded-4xl text-black p-5 shadow-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <FormInput
              label="Nombre"
              id="name"
              type="text"
              placeholder="Tu nombre"
              register={register("name")}
              error={errors.name}
              disabled={isSubmitting || sendMessageMutation.isPending}
            />
          </div>
          <div>
            <FormInput
              label="Email"
              id="email"
              type="email"
              placeholder="tu@email.com"
              register={register("email")}
              error={errors.email}
              disabled={isSubmitting || sendMessageMutation.isPending}
            />
          </div>
          <FormTextarea
            label="Mensaje"
            id="message"
            placeholder="Escribí tu mensaje..."
            rows={5}
            register={register("message")}
            error={errors.message}
            disabled={isSubmitting || sendMessageMutation.isPending}
          />

          {sendMessageMutation.isError && (
            //mensaje de error de envio del formulario
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-3xl">
              {sendMessageMutation.error?.message ||
                "Error al enviar el mensaje"}
            </div>
          )}

          {sendMessageMutation.isSuccess && (
            //mensaje de formulario enviado con exito
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-3xl">
              ¡Mensaje enviado correctamente!
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-[#FFA500] rounded-3xl px-3 py-1.5 cursor-pointer"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
