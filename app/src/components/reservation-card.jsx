import { useState } from "react";

export default function ReservationCard({ reservation, isPast }) {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const formatTime = (timeString) => {
    if (typeof timeString === "string" && timeString.includes(":")) {
      return timeString.substring(0, 5);
    }
    return timeString;
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {formatDate(reservation.fechaReserva)}
          </h3>
          <p className="text-sm text-gray-600">
            Hora: {formatTime(reservation.turno?.hora)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            reservation.estado === "CONFIRMADA"
              ? "bg-green-200 text-green-800"
              : reservation.estado === "CANCELADA"
              ? "bg-red-200 text-red-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {reservation.estado}
        </span>
      </div>
    </div>
  );
}
