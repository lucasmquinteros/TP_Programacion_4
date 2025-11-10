import ReserveButton from "./reserve-button";

export default function Hero() {
  return (
    <div className="w-[80%] min-h-[300px] h-[35vh] p-6 mx-auto rounded-[4rem] bg-[url('/')] bg-[#FFA500] flex flex-col items-center justify-center text-center gap-6 shadow-2xl md:h-[70vh]">
      <h2 className="text-3xl lg:text-5xl font-bold">
        Diversión sin límites para todas las edades
      </h2>
      <ReserveButton />
    </div>
  );
}
