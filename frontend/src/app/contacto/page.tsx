import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white py-6">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Logo y texto */}
          <div className="flex items-center gap-2 justify-center w-full md:w-auto">
            <h1 className="text-2xl font-semibold whitespace-nowrap leading-none">
              Bienvenido a
            </h1>
            <Link href="/" passHref>
              <Image
                src="/logo-horizontal.png"
                alt="Logo"
                width={160}
                height={70}
                style={{ height: "70px", width: "160px" }}
                className="object-contain cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Contacto</h1>

            {/* Formulario */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-black mb-6">
                Completa el formulario a continuación y nos pondremos en
                contacto contigo lo antes posible.
              </p>

              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-base font-medium text-black mb-1"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base font-medium text-black mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="asunto"
                    className="block text-base font-medium text-black mb-1"
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Asunto de tu mensaje"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-base font-medium text-black mb-1"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#426CE5] hover:bg-[#375CC7] text-white px-8 py-3 rounded-md font-medium cursor-pointer"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>

            {/* Tarjetas de contacto */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center transform transition-transform duration-300 hover:scale-105">
              {[
                {
                  titulo: "Email",
                  valor: "soporte.zionai@gmail.com",
                },
                {
                  titulo: "Teléfono",
                  valor: "+1 630 850 4588",
                },
                {
                  titulo: "Dirección",
                  valor: "Enrique Segoviano 1234,\nLa Vecindad",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full max-w-xs mx-auto bg-white border border-gray-200 shadow-sm rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-lg font-semibold text-[#426CE5] mb-2">
                    {item.titulo}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">{item.valor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6 flex flex-wrap justify-between items-center">
          <div className="flex gap-6">
            <Link
              href="/contacto"
              className="text-black hover:text-[#426CE5] font-medium"
            >
              Contacto
            </Link>
          </div>

          <div className="flex gap-6">
            <Link
              href="/politicas"
              className="text-black hover:text-[#426CE5] font-medium"
            >
              Política de privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-black hover:text-[#426CE5] font-medium"
            >
              Términos
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
