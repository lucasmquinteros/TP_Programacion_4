export default function Activities() {
  return (
    <div id="activities" className="w-[80%] mx-auto">
      <h2 className="text-center font-bold text-2xl mb-3">
        Nuestras Actividades
      </h2>
      <div className="grid gap-6 mb-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white flex flex-col rounded-[3rem] items-center p-8 text-center border border-gray-200 ">
          <img src="/logo.png" alt="" className="w-9" />
          <h4 className="font-bold text-[22px]">Trampolines</h4>
          <p>Salta tan alto como puedas en nuestra zona de trampolines.</p>
        </div>
        <div className="bg-white flex flex-col rounded-[3rem] items-center p-8 text-center border border-gray-200">
          <img src="/logo.png" alt="" className="w-9" />
          <h4 className="font-bold text-[22px]">Pared de escalar</h4>
          <p>Desafía tus límites en nuestra pared de escalar.</p>
        </div>
        <div className="bg-white flex flex-col rounded-[3rem] items-center p-8 text-center border border-gray-200">
          <img src="/logo.png" alt="" className="w-9" />
          <h4 className="font-bold text-[22px]">Juegos inflables</h4>
          <p>Diviértete en nuestros juegos inflables gigantes.</p>
        </div>
        <div className="bg-white flex flex-col rounded-[3rem] items-center p-8 text-center border border-gray-200">
          <img src="/logo.png" alt="" className="w-9" />
          <h4 className="font-bold text-[22px]">Piscina de espuma</h4>
          <p>
            Aterriza de forma segura en nuestra piscina llena de cubos de
            espuma.
          </p>
        </div>
      </div>
    </div>
  );
}
