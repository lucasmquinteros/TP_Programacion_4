import { useState } from "react";
import { set } from "zod";

export default function ReservationCard({ reservation, isPast }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const handleExpandCard = () => {
    setIsExpanded(!isExpanded);
  };

  const fechaUTC = new Date(reservation.fechaReserva);
  const horaUTC = fechaUTC.getUTCHours().toString().padStart(2, "0");
  const minutoUTC = fechaUTC.getUTCMinutes().toString().padStart(2, "0");

  return (
    <div
      className="border border-gray-300 rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow"
      onClick={handleExpandCard}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-bold text-gray-800">
            {formatDate(reservation.fechaReserva)}
          </h4>
          npm
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            reservation.estado === "Confirmada"
              ? "bg-green-200 text-green-800"
              : reservation.estado === "Cancelada"
              ? "bg-red-200 text-red-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {reservation.estado}
        </span>
        {isExpanded && (
          <>
            <span className="font-semibold text-gray-800">
              Hora: {horaUTC}:{minutoUTC}
            </span>
            <span className="font-semibold text-gray-800">
              Precio: {reservation.precio}
            </span>
            <span className="font-semibold text-gray-800">
              Cantidad de pases: {reservation.cantidad}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
