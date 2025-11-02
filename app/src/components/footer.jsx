import { FooterDivider } from "flowbite-react";
export default function Footer() {
  return (
    <footer className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p>&copy;2025 SkyJumpPark. Todos los derechos reservados.</p>
          <p>Teléfono:(+54)321-0987 | Email: info@skyjumppark.com</p>
        </div>
        <div className="flex gap-1.5">
          <a
            href="https://github.com/lucasmquinteros/TP_Programacion_4"
            target="_blank"
          >
            <img className="w-8" src="/github.png" alt="" />
          </a>
          <a
            href="https://github.com/lucasmquinteros/TP_Programacion_4"
            target="_blank"
          >
            <img className="w-8" src="/github.png" alt="" />
          </a>
        </div>
      </div>
      <FooterDivider className="m-0" />
      <p className="text-center text-[0.8rem]">
        Aviso Legal | Política de Privacidad
      </p>
    </footer>
  );
}
