import { useState } from "react";

export default function ConfirmModal({ setModal, turn }) {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    if (count === 0) return;
    setCount(count - 1);
  };
  const decreaseCount = () => {
    if (count === turn.cuposDisponibles) return;
    setCount(count + 1);
  };
  const formatedDate = new Date(turn.dateTime).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center z-40">
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
              {turn.horaInicio.hour.toString().padStart(2, "0")}:
              {turn.horaInicio.minute.toString().padStart(2, "0")} -{" "}
              {turn.horaFin.hour.toString().padStart(2, "0")}:
              {turn.horaFin.minute.toString().padStart(2, "0")}
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
                onClick={increaseCount}
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
                onClick={() => decreaseCount(count + 1)}
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
          <span className="text-gray-500">
            Máximo {turn.cuposDisponibles} entradas.
          </span>
        </div>
        <div className="flex justify-around mt-3">
          <button
            onClick={() => setModal(false)}
            className="font-semibold bg-gray-300 rounded-2xl p-3 px-5 cursor-pointer"
          >
            Cancelar
          </button>
          <button className="font-semibold bg-[#0DA6F2] text-white rounded-2xl p-3 px-5 cursor-pointer">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
