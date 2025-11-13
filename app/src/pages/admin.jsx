import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuthStore } from "../store/auth-store";
import { Card, Progress } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/auth";
import { getReservationsToday } from "../services/reservation";
import { getTurns } from "../services/turn";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Admin() {
  const { user, isAuthenticated } = useAuthStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/sign-in", { replace: true });
      return;
    }

    if (!user.roles?.includes("Admin")) {
      setLocation("/", { replace: true });
    }
  }, [user, setLocation]);

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const { data: turns } = useQuery({
    queryKey: ["turns"],
    queryFn: getTurns,
  });
  const { data: reservationsToday } = useQuery({
    queryKey: ["reservationsToday"],
    queryFn: getReservationsToday,
  });

  const totalUsers = users?.length;
  const totalTurns = turns?.length;
  const ocupaciones =
    turns?.map((t) =>
      t.cupoMax > 0 ? ((t.cupoMax - t.cuposDisponibles) / t.cupoMax) * 100 : 0
    ) || [];
  const ocupacionPromedio =
    ocupaciones.length > 0
      ? Math.round(ocupaciones.reduce((a, b) => a + b, 0) / ocupaciones.length)
      : 0;
  const turnsToday = reservationsToday.length;

  return (
    <>
      <Header />
      <main className="gap-8 w-[85%] mx-auto text-3xl lg:text-4xl text-center my-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:w-[50%] mx-auto gap-9">
          <div className="bg-white rounded-3xl p-7 border border-gray-300 shadow-2xl flex flex-col items-center gap-4 lg:p-10">
            <h4 className="font-semibold text-gray-700">Total de usuarios</h4>
            <span className="text-[#FFA500]">{totalUsers}</span>
          </div>
          <div className="bg-white rounded-3xl p-7 border border-gray-300 shadow-2xl flex flex-col items-center gap-4 lg:p-10">
            <h4 className="font-semibold text-gray-700">Total de turnos</h4>
            <span className="text-[#FFA500]">{totalTurns}</span>
          </div>
          <div className="bg-white rounded-3xl p-7 border border-gray-300 shadow-2xl flex flex-col items-center gap-4 lg:p-10">
            <h4 className="font-semibold text-gray-700">
              Promedio de ocupación
            </h4>
            <span className="text-[#FFA500]">{ocupacionPromedio}%</span>
          </div>
          <div className="bg-white rounded-3xl p-7 border border-gray-300 shadow-2xl flex flex-col items-center gap-4 lg:p-10">
            <h4 className="font-semibold text-gray-700">
              Reservas el día de hoy
            </h4>
            <span className="text-[#FFA500]">turnsToday</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
