import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import ReservationCard from "../components/reservation-card";
//prueba a ver si andan las cards
//import { useAuthStore } from "../store/auth-store";

/*PRUEBA DE CARDS CON RESERVACION*/
const ReservasDeUsuario = {
  user: {
    id: "user-123",
    nombre: "Ana Gómez",
    email: "ana.gomez@ejemplo.com",
    reservas: [
      {
        id: "res-001",
        fechaReserva: "2025-11-15T10:00:00Z",
        estado: "Confirmada",
        turno: { hora: "10:00:00" },
        servicio: "Corte de Pelo",
        profesional: "Juan Pérez",
      },
      {
        id: "res-002",
        fechaReserva: "2025-11-12T15:30:00Z",
        estado: "Confirmada",
        turno: { hora: "15:30:00" },
        servicio: "Manicura y Pedicura",
        profesional: "María López",
      },
      {
        id: "res-003",
        fechaReserva: "2025-11-01T18:00:00Z",
        estado: "Completo",
        turno: { hora: "18:00:00" },
        servicio: "Masaje Relajante",
        profesional: "Carlos Ruiz",
      },
      {
        id: "res-004",
        fechaReserva: "2025-10-25T09:00:00Z",
        estado: "Completo",
        turno: { hora: "09:00:00" },
        servicio: "Coloración y Balayage",
        profesional: "Juan Pérez",
      },
      {
        id: "res-005",
        fechaReserva: "2025-10-10T11:00:00Z",
        estado: "Cancelada",
        turno: { hora: "11:00:00" },
        servicio: "Corte de Pelo",
        profesional: "María López",
      },
    ],
  },
};
/*FIN DE PRUEBA*/
export default function UserReservations() {
  const { user } = useAuthStore();
  const [filterStatus, setFilterStatus] = useState("Todas");

  let filteredReservations = [];

  if (user?.reservas && user.reservas.length > 0) {
    if (filterStatus === "Confirmada") {
      filteredReservations = user.reservas.filter(
        (reserva) => reserva.estado === "Confirmada"
      );
    } else if (filterStatus === "Completo") {
      filteredReservations = user.reservas.filter(
        (reserva) => reserva.estado === "Completo"
      );
    } else if (filterStatus === "Todas") {
      filteredReservations = user.reservas.filter(
        (reserva) =>
          reserva.estado === "Confirmada" || reserva.estado === "Completo"
      );
    }

    filteredReservations.sort(
      (a, b) => new Date(b.fechaReserva) - new Date(a.fechaReserva)
    );
  }

  const confirmadas =
    user?.reservas?.filter((r) => r.estado === "Confirmada").length || 0;
  const completos =
    user?.reservas?.filter((r) => r.estado === "Completo").length || 0;

  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-10 md:gap-16 my-8 px-4 max-w-4xl mx-auto">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-8">Mis Reservas</h1>
          <h2> </h2>
          <div className="flex gap-4 mb-8 justify-center flex-wrap">
            <button
              onClick={() => setFilterStatus("Todas")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterStatus === "Todas"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Todas ({confirmadas + completos})
            </button>
            <button
              onClick={() => setFilterStatus("Confirmada")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterStatus === "Confirmada"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Confirmadas ({confirmadas})
            </button>
            <button
              onClick={() => setFilterStatus("Completo")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterStatus === "Completo"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Completadas ({completos})
            </button>
          </div>
          {filteredReservations.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">
                {filterStatus === "Todas"
                  ? "Todavía no tienes ninguna reserva"
                  : `Todavía no tienes ninguna reserva ${
                      filterStatus === "Confirmada"
                        ? "confirmadas"
                        : "completadas"
                    }`}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 w-full">
              {filteredReservations.map((reserva) => (
                <ReservationCard key={reserva.id} reservation={reserva} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
