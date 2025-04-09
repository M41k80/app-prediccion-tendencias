import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div>
    <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Sistema de análisis predictivo de tendencias de mercado
              </h2>
              <p className="text-lg text-gray-700">
                Descubre hacia dónde se dirigen los mercados. Usá nuestra herramienta para obtener predicciones en
                tiempo real basadas en <span className="text-blue-600">inteligencia artificial</span>.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/#"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium"
                >
                  Registrarse
                </Link>
                <Link
                  href="/#"
                  className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-8 py-3 rounded-md font-medium"
                >
                  Explorar planes
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-40 mb-6 relative">
                <Image
                  src="/placeholder.svg?height=160&width=400"
                  alt="Gráfico de tendencias"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold text-blue-600">+23 %</div>
                <div className="text-sm text-gray-500">Tendencia prevista</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Análisis personalizados</h3>
              <p className="text-gray-700">Obtiene predicciones ajustadas a tus variables específicas.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Datos en tiempo real</h3>
              <p className="text-gray-700">Visualizá tendencias basadas en la información más reciente.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Comparación de variables</h3>
              <p className="text-gray-700">Explorá relaciones entre múltiples factores del mercado.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6 flex flex-wrap justify-between items-center">

          <div className="flex gap-6">
            <Link href="/contacto" className="text-gray-600 hover:text-gray-900">
              Contacto
            </Link>
          </div>

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

