import React, { useState } from "react";
import ReserveButton from "./buttons/reserve-button";
import { Progress } from "flowbite-react";
import ConfirmModal from "./confirm-modal";

export default function TurnCard({ turn }) {
  const [modal, setModal] = useState(false);

  const cuposOcupados = turn.cupoMax - turn.cuposDisponibles;

  const handlerReserv = () => {
    if (turn.cuposDisponibles == 0) return;
    setModal(true);
  };

  return (
    <div className="bg-white p-5 px-6 w-[80%] rounded-3xl lg:flex lg:justify-between lg:items-center">
      <div className="lg:w-[70%]">
        <h4 className="font-semibold lg:text-[20px]">
          {turn.horaInicio.hour.toString().padStart(2, "0")}:
          {turn.horaInicio.minute.toString().padStart(2, "0")} -{" "}
          {turn.horaFin.hour.toString().padStart(2, "0")}:
          {turn.horaFin.minute.toString().padStart(2, "0")}
        </h4>
        <span className="text-[14px] text-gray-500">
          {cuposOcupados}/{turn.cupoMax} lugares ocupados
        </span>
        <Progress
          progress={
            ((turn.cupoMax - turn.cuposDisponibles) / turn.cupoMax) * 100
          }
          size="sm"
          className="dark:bg-gray-300"
        />
      </div>
      <button
        onClick={handlerReserv}
        className="text-white text-[1rem] bg-[#0DA6F2] mt-2 rounded-3xl px-3.5 py-1.5 cursor-pointer shadow-2xs lg:m-0 lg:h-12"
      >
        Reservar
      </button>

      {modal && <ConfirmModal setModal={setModal} turn={turn} />}
      {modal && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-40 z-30"
          onClick={() => {
            setMenu(false);
            setProfile(false);
          }}
        ></div>
      )}
    </div>
  );
}
