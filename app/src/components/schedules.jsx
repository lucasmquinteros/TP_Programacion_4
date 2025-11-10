export default function Schedules() {
  return (
    <div className=" w-[80%] rounded-[3rem] bg-white p-6 border border-gray-200">
      <h2 className="text-center mb-2 text-2xl font-bold">Horarios</h2>
      <div className="grid grid-cols-2 gap-y-2">
        <div className="bg-gray-200 rounded-l-2xl p-1 px-4">DIA</div>
        <div className="bg-gray-200 rounded-r-2xl p-1">HORARIO</div>
        <div className="border-b border-b-gray-200 p-2 px-4">
          Lunes - Jueves
        </div>
        <div className="border-b border-b-gray-200 p-2">10:00AM - 8:00PM</div>
        <div className="border-b border-b-gray-200 p-2 px-4">
          Viernes - Sábado
        </div>
        <div className="border-b border-b-gray-200 p-2">10:00AM - 10:00PM</div>
        <div className="p-2 px-4">Domingo y Festivos</div>
        <div className="p-2">11:00AM - 7:00PM</div>
      </div>
    </div>
  );
}
