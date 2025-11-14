import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import ReservationCard from "../components/reservation-card";
import { useAuthStore } from "../store/auth-store";
import { useLocation } from "wouter";
import { getReservationById } from "../services/reservation";
import { useQuery } from "@tanstack/react-query";

export default function UserReservations() {
  const { user, isAuthenticated } = useAuthStore();
  const [filterStatus, setFilterStatus] = useState("Todas");
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/sign-in", { replace: true });
      return;
    }
  }, [isAuthenticated, setLocation]);

  const { data: reservations } = useQuery({
    queryKey: ["reservations"],
    queryFn: () => getReservationById(user.id),
  });

  let filteredReservations = [];

  if (reservations && reservations.length > 0) {
    if (filterStatus === "Confirmada") {
      filteredReservations = reservations.filter(
        (reserva) => reserva.estado === "Confirmada"
      );
    } else if (filterStatus === "Completo") {
      filteredReservations = reservations.filter(
        (reserva) => reserva.estado === "Completo"
      );
    } else if (filterStatus === "Todas") {
      filteredReservations = reservations.filter(
        (reserva) =>
          reserva.estado === "Confirmada" || reserva.estado === "Completo"
      );
    }

    filteredReservations.sort(
      (a, b) => new Date(b.fechaReserva) - new Date(a.fechaReserva)
    );
  }

  const confirmadas = allReservations.filter(
    (r) => r.estado === "Confirmada"
  ).length;
  const completos = allReservations.filter(
    (r) => r.estado === "Completo"
  ).length;

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex justify-center items-center h-64">
          <p className="text-xl ffa500">Cargando reservas...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-10 md:gap-16 my-8 px-4 max-w-6xl mx-auto">
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center sm:text-left">
            Mis Reservas
          </h1>
          <h2> </h2>
          <div className="flex gap-3 sm:gap-4 mb-8 justify-center flex-wrap">
            <button
              onClick={() => setFilterStatus("Todas")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap ${
                filterStatus === "Todas"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Todas ({user?.reservas?.length || 0})
            </button>
            <button
              onClick={() => setFilterStatus("Confirmada")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap ${
                filterStatus === "Confirmada"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Confirmadas ({confirmadas})
            </button>
            <button
              onClick={() => setFilterStatus("Completo")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap ${
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
                        ? "confirmada"
                        : "completada"
                    }`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
