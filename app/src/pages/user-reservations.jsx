import { useEffect, useMemo, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { LoadingSpinner } from "../components/loading-spinner.jsx";
import { useAuthStore } from "../store/auth-store";

export default function UserReservations() {
  const { user } = useAuthStore();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulación de fetch: reemplazar por llamada real a service cuando exista
  useEffect(() => {
    setLoading(true);
    setError(null);

    const mock = [
      {
        id: "res_1",
        service: "Clase de tenis",
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // +3d
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 25 * 3).toISOString(),
        status: "confirmed",
        place: "Cancha 1",
      },
      {
        id: "res_2",
        service: "Cumpleaños",
        startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // -10d
        endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10 + 1000 * 60 * 60).toISOString(),
        status: "completed",
        place: "Salón A",
      },
      {
        id: "res_3",
        service: "Entrenamiento",
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(), // +4h
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
        status: "confirmed",
        place: "Gimnasio",
      },
      {
        id: "res_4",
        service: "Clase de baile",
        startDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // -48h
        endDate: new Date(Date.now() - 1000 * 60 * 60 * 46).toISOString(),
        status: "cancelled",
        place: "Sala B",
      },
    ];

    const t = setTimeout(() => {
      setReservations(mock);
      setLoading(false);
    }, 600);

    return () => clearTimeout(t);
  }, [user]);

  const now = useMemo(() => new Date(), [reservations]);

  const upcoming = useMemo(() => {
    return reservations
      .filter((r) => new Date(r.startDate) > now && r.status !== "cancelled")
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }, [reservations, now]);

  const past = useMemo(() => {
    return reservations
      .filter((r) => new Date(r.endDate) < now || r.status === "cancelled")
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
  }, [reservations, now]);

  function handleCancel(id) {
    const r = reservations.find((x) => x.id === id);
    if (!r) return;
    if (!confirm(`¿Confirma cancelar la reserva de ${r.service} en ${r.place}?`)) return;
    setReservations((prev) => prev.map((x) => (x.id === id ? { ...x, status: "cancelled" } : x)));
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Ocurrió un error al cargar tus reservas.</p>
            <button
              className="bg-[#FFA500] text-white px-4 py-2 rounded-2xl"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-10 md:gap-16 my-8 lg:w-[90%] mx-auto">
        <section className="w-full">
          <h2 className="text-2xl font-semibold">Próximas reservas ({upcoming.length})</h2>
          {upcoming.length === 0 ? (
            <div className="mt-6 p-6 bg-gray-50 rounded-2xl text-center">
              <p>No tenés reservas próximas.</p>
              <a href="/reservations" className="mt-3 inline-block text-[#FFA500]">Reservar ahora</a>
            </div>
          ) : (
            <ul className="mt-6 flex flex-col gap-4">
              {upcoming.map((r) => (
                <li key={r.id} className="border p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{r.service}</p>
                    <p className="text-sm text-gray-600">{new Date(r.startDate).toLocaleString()} - {r.place}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg bg-gray-200" onClick={() => alert('Ver detalles: ' + r.id)}>Ver</button>
                    <button className="px-3 py-1 rounded-lg bg-red-200 text-red-700" onClick={() => handleCancel(r.id)}>Cancelar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="w-full">
          <h2 className="text-2xl font-semibold">Historial ({past.length})</h2>
          {past.length === 0 ? (
            <div className="mt-6 p-6 bg-gray-50 rounded-2xl text-center">
              <p>Aún no tenés reservas pasadas.</p>
            </div>
          ) : (
            <ul className="mt-6 flex flex-col gap-4">
              {past.map((r) => (
                <li key={r.id} className="border p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{r.service}</p>
                    <p className="text-sm text-gray-600">{new Date(r.startDate).toLocaleString()} - {r.place}</p>
                    <p className="text-xs mt-1 text-gray-500">{r.status === 'cancelled' ? 'Cancelada' : 'Completada'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg bg-gray-200" onClick={() => alert('Ver detalles: ' + r.id)}>Ver</button>
                    <button className="px-3 py-1 rounded-lg bg-[#FFA500] text-white" onClick={() => alert('Reservar de nuevo: ' + r.id)}>Reservar de nuevo</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
