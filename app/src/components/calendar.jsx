import { useState } from "react";
import { Datepicker } from "flowbite-react";

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
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
          console.log(date.toLocaleString("es-AR").replace(",", ""));
        }}
      />

      {selectedDate ? (
        <p className="text-gray-900 font-medium">
          📅 Fecha seleccionada:{" "}
          <span className="font-semibold">
            {selectedDate.toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
      ) : (
        <p className="text-gray-500">Seleccioná una fecha del calendario</p>
      )}
    </div>
  );
}
