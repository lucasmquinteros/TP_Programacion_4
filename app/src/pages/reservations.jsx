import { useEffect, useState } from "react";
import { Calendar } from "../components/calendar";
import Footer from "../components/footer";
import Header from "../components/header";
import ConfirmModal from "../components/confirm-modal";
import { useAuthStore } from "../store/auth-store";
import { useLocation } from "wouter";

export default function Reservations() {
  const { isAuthenticated } = useAuthStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/sign-in", { replace: true });
      return;
    }
  }, [isAuthenticated, setLocation]);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-10 md:gap-16 my-8">
        <div className="text-center">
          <h2 className="font-bold text-4xl">Encontrá tu próximo salto</h2>
          <p>Seleccioná un día para ver los turnos disponibles</p>
        </div>
        <Calendar />
      </main>
      <Footer />
    </>
  );
}
