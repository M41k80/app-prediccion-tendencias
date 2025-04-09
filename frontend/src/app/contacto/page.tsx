import Link from "next/link"

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <Link href="/" className="text-xl font-medium">
                    Bienvenido a (nombre de la app)
                </Link>
                <div className="flex gap-4">
                    <Link href="/login" className="text-gray-700 hover:text-blue-600">
                        Iniciar sesión
                    </Link>
                    <Link href="/register" className="text-gray-700 hover:text-blue-600">
                        Registrarse
                    </Link>
                </div>
            </header>

            <main className="flex-1 bg-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8">Contacto</h1>

                        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                            <p className="text-gray-700 mb-6">
                                Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
                            </p>

                            <form className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
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
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium"
                                >
                                    Enviar mensaje
                                </button>
                            </form>
                        </div>

                        <div className="mt-12 grid md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Email</h3>
                                <p className="text-gray-700">contacto@empresa.com</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Teléfono</h3>
                                <p className="text-gray-700">+1 630 850 4588</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Dirección</h3>
                                <p className="text-gray-700">Enrique Segoviano 1234, La Vecindad</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-gray-200 mt-16">
                <div className="container mx-auto px-4 py-6 flex flex-wrap justify-between items-center">
                    <Link href="/contacto" className="text-blue-600 hover:text-blue-800 font-medium">
                        Contacto
                    </Link>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                            Política de privacidad
                        </Link>
                        <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                            Términos
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}