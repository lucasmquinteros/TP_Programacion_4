import { useState } from "react";
import { Datepicker } from "flowbite-react";
import TurnCard from "./turn-card";

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  // const { data: turns } = useQuery({
  //   queryKey: ["turnsByDay"],
  //   queryFn: () => getTurnByDay(selectedDate.toISOString()),
  //   enabled: !!selectedDate,
  // });

  const turns = [
    {
      id: 1,
      dateTime: "2025-11-12T20:46:35.034Z",
      horaInicio: {
        hour: 9,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
        ticks: 0,
      },
      horaFin: {
        hour: 10,
        minute: 30,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
        ticks: 0,
      },
      cupoMax: 10,
      cuposDisponibles: 0,
      estado: "Disponible",
    },
    {
      id: 2,
      dateTime: "2025-11-12T22:00:00.000Z",
      horaInicio: {
        hour: 11,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
        ticks: 0,
      },
      horaFin: {
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
        ticks: 0,
      },
      cupoMax: 8,
      cuposDisponibles: 2,
      estado: "Ocupado",
    },
    {
      id: 3,
      dateTime: "2025-11-12T23:30:00.000Z",
      horaInicio: {
        hour: 13,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
        ticks: 0,
      },
      horaFin: {
        hour: 14,
        minute: 30,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
        ticks: 0,
      },
      cupoMax: 12,
      cuposDisponibles: 12,
      estado: "Libre",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 lg:w-[90%]">
      <div
        className="
        flex flex-col items-center gap-4
        [&_div]:bg-white [&_div]:rounded-3xl lg:[&_.grid-cols-7]:gap-2 mx-auto lg:w-[30%] lg:[&_div]:w-full
        [&_button]:text-gray-900 [&_button]:bg-white lg:[&_button]:text-[20px]
        [&_button:hover]:bg-[#0DA6F2] [&_button:hover]:text-white
        [&_button:focus]:bg-[#0DA6F2] [&_button:focus]:text-white
      "
      >
        <Datepicker
          inline
          onChange={(date) => {
            setSelectedDate(date);
            console.log(date.toISOString());
          }}
        />
      </div>
      {selectedDate ? (
        <>
          <p className="text-gray-900 font-semibold text-center">
            Fecha seleccionada:{" "}
            <span className="font-semibold">
              {selectedDate.toLocaleDateString("es-AR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
          <div className="w-full flex flex-col items-center gap-5 lg:w-[50%]">
            {turns?.map((t) => (
              <TurnCard key={t.id} turn={t}></TurnCard>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">↑ Seleccioná una fecha del calendario ↑</p>
      )}
    </div>
  );
}
