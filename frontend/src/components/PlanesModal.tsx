"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

const PlanesModal = ({ handleClose }: { handleClose: () => void }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleCloseAnimated = () => {
    setVisible(false)
    setTimeout(() => {
      handleClose()
    }, 300)
  }

  return (
    <div
      onClick={handleCloseAnimated}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-lg w-full max-w-5xl p-4 sm:p-6 md:p-8 transition-all duration-300 transform
          ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
          max-h-screen overflow-y-auto md:max-h-none md:overflow-visible
        `}
      >
        {/* Header (ya no sticky) */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#426CE5]">Planes</h2>
          <button
            onClick={handleCloseAnimated}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            <Image
              src="https://www.svgrepo.com/show/521106/close.svg"
              alt="Cerrar"
              width={24}
              height={24}
              className="w-8 h-8"
            />
          </button>
        </div>

        {/* Planes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Plan Gratuito */}
          <div className="border border-gray-300 rounded-lg p-4 md:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-1">Plan Gratuito</h3>
            <p className="text-xl font-bold text-black mb-2">$0/mes</p>
            <p className="text-sm text-gray-600 mb-4">
              Ideal para comenzar a explorar el poder de nuestra IA.
            </p>
            <p className="text-sm font-medium text-black mb-2">Tu plan actual</p>
            <p className="text-sm text-black mb-2">Incluye:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>3 predicciones por mes</li>
              <li>Acceso a estadísticas básicas</li>
              <li>Selección limitada de productos y tiendas</li>
              <li>Predicciones con demora estándar</li>
              <li>Soporte por correo electrónico</li>
            </ul>
          </div>

          {/* Plan Plus */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 md:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-1">Plan Plus</h3>
            <p className="text-xl font-bold text-black mb-2">$20/mes</p>
            <p className="text-sm text-gray-600 mb-4">
              Desbloqueá el máximo potencial de nuestra inteligencia artificial.
            </p>
            <button className="bg-[#426CE5] hover:bg-[#375CC7] cursor-pointer text-white text-sm font-medium px-6 py-2 rounded-md mb-4 transition w-full sm:w-auto">
              Mejorar a Plus
            </button>
            <p className="text-sm text-black mb-2">Incluye:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>Predicciones ilimitadas</li>
              <li>Acceso a estadísticas avanzadas y reportes descargables</li>
              <li>Mayor variedad de tiendas y productos disponibles</li>
              <li>Predicciones en tiempo real</li>
              <li>Prioridad en soporte</li>
              <li>Historial completo de predicciones anteriores</li>
              <li>Acceso anticipado a nuevas funcionalidades</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanesModal
