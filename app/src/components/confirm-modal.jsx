import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { createReservation } from "../services/reservation";
import { set } from "zod";

export default function ConfirmModal({ setModal, turn }) {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const mutation = useMutation({
    mutationKey: ["createReservation"],
    mutationFn: createReservation,
    onSuccess: () => {
      setSuccessMessage(true);
      setTimeout(() => setModal(false), 3000);
    },
    onError: (error) => {
      console.error("Error al crear la reserva ❌", error);
      setErrorMessage("Error al crear la reserva ❌");
    },
  });

  const decreaseCount = () => {
    if (count === 0) return;
    setCount(count - 1);
    setSuccessMessage(false);
    setErrorMessage("");
  };
  const increaseCount = () => {
    if (count === turn.cuposDisponibles) return;
    setCount(count + 1);
    setSuccessMessage(false);
    setErrorMessage("");
  };

  const handleConfirm = () => {
    if (count <= 0) return setErrorMessage("Selecciona al menos 1 entrada");

    setErrorMessage("");
    setSuccessMessage(false);

    const reserva = {
      userId: user.id,
      turnoId: turn.id,
      cantidad: count,
    };

    mutation.mutate(reserva);
  };

  const formatedDate = new Date(turn.dateTime).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center z-40">
      {successMessage && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100"
          role="alert"
        >
          <span className="font-medium">Reserva Confirmada ✅</span>
        </div>
      )}
      <div className="bg-white relative w-[90%] mx-auto flex flex-col gap-4 p-5 rounded-3xl shadow-2xl md:w-[50%] md:p-9 md:text-[20px]">
        <button
          onClick={() => setModal(false)}
          className=" absolute top-5 right-6 text-2xl cursor-pointer"
        >
          ✕
        </button>
        <h3 className="text-2xl font-semibold">Confirma tu Reserva</h3>
        <div className="flex flex-col gap-3 border-b pb-3 border-gray-400">
          <div className="bg-gray-200 rounded-2xl p-2 px-3">
            <p>{formatedDate}</p>
          </div>
          <div className="bg-gray-200 rounded-2xl p-2 px-3">
            <p>
              {turn.horaInicio.slice(0, 5)} - {turn.horaFin.slice(0, 5)}
            </p>
          </div>
          <div className="bg-gray-200 rounded-2xl p-2 px-3">
            <p>{turn.cuposDisponibles} disponibles</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Elige cuántos saltadores serán:</p>
          <div className="flex gap-1.5 bg-gray-200 rounded-2xl p-2 px-2.5 items-center justify-between">
            <p>Cantidad de entradas</p>
            <div className="flex justify-between gap-1.5 md:gap-3">
              <button
                onClick={decreaseCount}
                className="rounded-[50%] bg-gray-400 w-6 h-6 m-auto flex justify-center items-center cursor-pointer "
              >
                <img
                  src="/menos.png"
                  alt="Sacar cantidad de entradas"
                  className="w-3"
                />
              </button>
              <span className="font-semibold">{count}</span>
              <button
                onClick={increaseCount}
                className="rounded-[50%] bg-gray-400 w-6 h-6 m-auto flex justify-center items-center cursor-pointer"
              >
                <img
                  src="/mas.png"
                  alt="Agregar cantidad de entradas"
                  className="w-3"
                />
              </button>
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm text-center font-medium mt-1">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="border-t pt-3 border-gray-400 flex flex-col gap-1">
          <span className="text-gray-500">
            Máximo {turn.cuposDisponibles} entradas.
          </span>
          <p>Total a pagar: ${turn.precio * count}</p>
        </div>
        <div className="flex justify-around mt-3">
          <button
            onClick={() => setModal(false)}
            className="font-semibold bg-gray-300 rounded-2xl p-3 px-5 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="font-semibold bg-[#0DA6F2] text-white rounded-2xl p-3 px-5 cursor-pointer"
          >
            {mutation.isPending ? "Confirmando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
