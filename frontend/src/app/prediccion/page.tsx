"use client"

import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import Image from "next/image"

export default function NuevaPrediccionPage() {
  const [loading, setLoading] = useState(false)

  const handleGenerar = () => {
    setLoading(true)
    setTimeout(() => {
      // Aquí puedes redirigir, mostrar resultado o desactivar loading
      setLoading(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Encabezado */}
        <header className="flex justify-between items-center mb-10 max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-black">Nueva predicción</h1>
          <Image
            src="/perfil.png"
            alt="Avatar del usuario"
            width={40}
            height={40}
            className="rounded-full"
          />
        </header>

        {/* Contenido principal */}
        <section className="bg-gray-100 rounded-2xl shadow p-10 max-w-5xl mx-auto min-h-[400px] flex items-center justify-center">
          {!loading ? (
            <div className="w-full">
              <h2 className="text-lg font-semibold text-center text-black mb-2">
                ¿Querés generar una nueva predicción?
              </h2>
              <p className="text-center text-sm text-gray-600 leading-snug mb-8 max-w-2xl mx-auto">
                ¡Buenísimo! Acá te guiamos paso a paso para que lo hagas sin complicaciones.
                Primero, seleccioná la tienda que querés analizar. Después, elegí el rango de fechas que
                te interesa. Podés predecir ventas de los próximos días, semanas o el período que necesites.
                Por último, seleccioná el producto sobre el cual querés obtener la predicción.
              </p>

              {/* Formularios */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div>
                  <label className="block text-sm text-black font-semibold mb-1">Tienda</label>
                  <select className="w-full text-gray-600 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Seleccionar tienda</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-black font-semibold mb-1">Rango de fechas para predicción</label>
                  <select className="w-full text-gray-600 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Seleccionar fecha</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-black font-semibold mb-1">Producto</label>
                  <select className="w-full text-gray-600 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Seleccionar producto</option>
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleGenerar}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-8 py-2.5 rounded-md transition-colors cursor-pointer"
                >
                  Generar predicción
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <p className="text-lg font-semibold text-black">Generando predicción</p>
              <div className="w-28 h-28 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <button
                onClick={() => setLoading(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-8 py-2.5 rounded-md transition-colors cursor-pointer"
              >
                Volver atrás
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
