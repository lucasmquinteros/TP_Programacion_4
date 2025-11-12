import { useState } from "react";

export default function ConfirmModal({ setModal }) {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    if (count === 0) return;
    setCount(count - 1);
  };
  const decreaseCount = () => {
    if (count === 50) return;
    setCount(count + 1);
  };

  return (
    <div className="bg-white relative w-[90%] mx-auto flex flex-col gap-4 p-5 rounded-3xl shadow-2xl">
      <button
        onClick={() => setModal(false)}
        className=" absolute top-5 right-6 text-2xl"
      >
        ✕
      </button>
      <h3 className="text-2xl font-semibold">Confirma tu Reserva</h3>
      <div className="flex flex-col gap-3 border-b pb-3 border-gray-400">
        <div className="bg-gray-200 rounded-2xl p-2 px-3">
          <p>Sábado, 23 de Noviembre</p>
        </div>
        <div className="bg-gray-200 rounded-2xl p-2 px-3">
          <p>10:00 AM</p>
        </div>
        <div className="bg-gray-200 rounded-2xl p-2 px-3">
          <p>5 Disponibles</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p>Elige cuántos saltadores serán:</p>
        <div className="flex gap-1.5 bg-gray-200 rounded-2xl p-2 px-2.5 items-center justify-between">
          <p>Cantidad de entradas</p>
          <div className="flex justify-between gap-1.5">
            <button
              onClick={increaseCount}
              className="rounded-[50%] bg-gray-400 w-5 h-5 m-auto flex justify-center items-center"
            >
              -
            </button>
            <span>{count}</span>
            <button
              onClick={() => decreaseCount(count + 1)}
              className="rounded-[50%] bg-gray-400 w-5 h-5 m-auto flex justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
        <span className="text-gray-500">Máximo 50 entradas.</span>
      </div>
      <div className="flex justify-around mt-3">
        <button
          onClick={() => setModal(false)}
          className="font-semibold bg-gray-300 rounded-2xl p-3 px-5"
        >
          Cancelar
        </button>
        <button className="font-semibold bg-[#0DA6F2] text-white rounded-2xl p-3 px-5">
          Confirmar
        </button>
      </div>
    </div>
  );
}
