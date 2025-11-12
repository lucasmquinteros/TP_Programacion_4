export default function Activities() {
  return (
    <div id="activities" className="w-[80%] mx-auto">
      <h2 className="text-center font-bold text-2xl mt-12 mb-6">
        Nuestras Actividades
      </h2>
      <div className="grid gap-6 mb-3 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className="bg-white flex flex-col rounded-[3rem] items-center p-8 text-center border border-gray-200 
                     transition duration-300 ease-in-out hover:shadow-[0_0_15px_#ffa500]"
        >
          <img src="../logos/trampolin.png" className="w-9" />
          <h4 className="font-bold text-[22px]">Trampolines</h4>
          <p>Saltá tan alto como puedas en nuestra zona de trampolines.</p>
        </div>
        <div
          className="bg-white flex flex-col rounded-[3rem] items-center p-8 text-center border border-gray-200 
                     transition duration-300 ease-in-out hover:shadow-[0_0_15px_#ffa500]"
        >
          <img src="./logos/escalada.png" alt="" className="w-9" />
          <h4 className="font-bold text-[22px]">Pared de escalar</h4>
          <p>Desafía tus límites en nuestra pared de escalar.</p>
        </div>
        <div
          className="bg-white flex flex-col rounded-[3rem] items-center p-8 text-center border border-gray-200 
                     transition duration-300 ease-in-out hover:shadow-[0_0_15px_#ffa500]"
        >
          <img src="/logos/castillo-inflable.png" alt="" className="w-9" />
          <h4 className="font-bold text-[22px]">Juegos inflables</h4>
          <p>Diviértete en nuestros juegos inflables gigantes.</p>
        </div>
        <div
          className="bg-white flex flex-col rounded-[3rem] items-center p-8 text-center border border-gray-200 
                     transition duration-300 ease-in-out hover:shadow-[0_0_15px_#ffa500]"
        >
          <img src="/logos/espuma.png" alt="" className="w-9" />
          <h4 className="font-bold text-[22px]">Piscina de espuma</h4>
          <p>
            Aterrizá de forma segura en nuestra piscina llena de cubos de
            espuma.
          </p>
        </div>
      </div>
    </div>
  );
}
