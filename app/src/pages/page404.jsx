import { Link } from "wouter";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Page404() {
  return (
    <>
      <Header />
      <main className=" bg-white flex flex-col items-center justify-center h-[90vh] gap-4">
        <img
          src="../public/404.jpg"
          alt="Página no encontrada"
          className="max-w-[550px] max-h-[600px]"
        />
        <p className="text-2xl md:text-5xl">Página no encontrada</p>
        <Link
          href="/"
          className="cursor-pointer text-[20px] text-white bg-[#FFA500] rounded-[40px] px-2 py-1.5 md:px-7 md:py-5 md:text-3xl"
        >
          Volver al Inicio
        </Link>
      </main>
      <Footer />
    </>
  );
}
