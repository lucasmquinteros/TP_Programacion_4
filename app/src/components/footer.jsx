import { FooterDivider } from "flowbite-react";
export default function Footer() {
  return (
    <footer className="p-6 mx-auto lg:w-[90%]">
      <div className="flex justify-between items-center flex-col-reverse gap-3.5 md:flex-row">
        <div>
          <p className="m-2">
            &copy;2025 SkyJumpPark. Todos los derechos reservados.
          </p>
          <p className="m-2">
            Teléfono:(+54)321-0987 | Email: info@skyjumppark.com
          </p>
        </div>
        <div className="flex gap-1.5">
          <a
            href="https://github.com/lucasmquinteros/TP_Programacion_4"
            target="_blank"
          >
            <img className="w-8" src="/github.png" alt="icono de github" />
          </a>
          <a
            href="https://github.com/lucasmquinteros/TP_Programacion_4"
            target="_blank"
          >
            <img className="w-8" src="/github.png" alt="icono de github" />
          </a>
        </div>
      </div>
      <FooterDivider />
      <p className="text-center text-[0.8rem]">
        Aviso Legal | Política de Privacidad
      </p>
    </footer>
  );
}
