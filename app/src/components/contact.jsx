export default function Contact() {
  return (
    <div className="flex flex-col w-[80%] gap-16 md:flex-row">
      <div className="md:w-[50%]">
        <h2 className="text-center font-bold text-2xl mb-3">Encuéntranos</h2>
        <iframe
          className="w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6673.811665948466!2d-60.41192865249115!3d-33.242770320750765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7727a807d4005%3A0x1858756e7415df90!2sPav%C3%B3n%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1762717154349!5m2!1ses!2sar"
          width="600"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="md:w-[50%]">
        <h2 className="text-center font-bold text-2xl mb-3">Contáctanos</h2>
        <form className="flex max-w flex-col gap-3.5">
          <div>
            <div className="mb-2 block">
              <label htmlFor="name" className=" text-black">
                Nombre
              </label>
            </div>
            <input
              className="bg-white rounded-3xl px-3 py-2 w-full border border-gray-300"
              id="name"
              type="text"
              required
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label className=" text-black" htmlFor="email">
                Email
              </label>
            </div>
            <input
              className="bg-white rounded-3xl px-3 py-2 w-full border border-gray-300"
              id="emailOrUsername"
              type="text"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className=" text-black">
              Mensaje
            </label>
          </div>
          <textarea
            name="message"
            id="message"
            placeholder="Escribe tu mensaje..."
            className="bg-white rounded-3xl px-3 py-2 w-full border border-gray-300"
          ></textarea>

          <button
            type="submit"
            className="text-white bg-[#FFA500] rounded-3xl px-3 py-1.5 cursor-pointer"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
