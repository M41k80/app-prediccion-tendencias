"use client"
import React, { useState } from "react"
import NavBar from "@/components/NavBar"
import FooterHome from "@/components/FooterHome"
import LoginModal from "@/components/LoginModal"
import RegisterModal from "@/components/RegisterModal"
import PlanesModal from "@/components/PlanesModal"
import Image from "next/image"


const Home = () => {
  const [showModalLogin, setShowModalLogin] = useState(false)
  const [showModalRegister, setShowModalRegister] = useState(false)
  const [showModalPlanes, setShowModalPlanes] = useState(false)

  const handleShowModalLogin = () => {
    setShowModalLogin(!showModalLogin)
  }

  const handleShowModalRegister = () => {
    setShowModalRegister(!showModalRegister)
  }

  const handleShowModalPlanes = () => {
    setShowModalPlanes(true)
  }

  return (
    <div className="p-8">
      <NavBar
        handleShowModalLogin={handleShowModalLogin}
        handleShowModalRegister={handleShowModalRegister}
      />

      {/* Modales */}
      {showModalLogin && <LoginModal handleShowModalLogin={handleShowModalLogin} />}
      {showModalRegister && <RegisterModal handleShowModalRegister={handleShowModalRegister} />}
      {showModalPlanes && <PlanesModal handleClose={() => setShowModalPlanes(false)} />}

      {/* Contenido principal */}
      <div className="flex mt-12 gap-4 flex-col md:flex-row">
        <div className="space-y-6 flex-1">
          <div className="text-4xl sm:text-5xl font-bold leading-tight">
            Sistema de análisis predictivo de tendencias de mercado
          </div>
          <div className="text-lg text-gray-700">
            Descubrí hacia dónde se dirigen los mercados. Usá nuestra herramienta para obtener
            predicciones en tiempo real basadas en{" "}
            <span className="text-[#426CE5]">inteligencia artificial</span>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              className="bg-[#426CE5] hover:bg-[#375CC7] text-white py-2 px-4 rounded font-medium"
              onClick={handleShowModalRegister}
            >
              Registrarse
            </button>
            <button
              onClick={handleShowModalPlanes}
              className="hover:bg-stone-200 text-black py-2 px-4 rounded font-medium border"
            >
              Explorar planes
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center mt-6 md:mt-0">
          <Image
            src="https://s3-alpha-sig.figma.com/img/8593/6df1/ecb6f53f485edc6892b4d3baafba41e3?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uKp~GMhuFvyEF8QwZVzJGhJyMBw0F0F1IDGxY7i3K-gq6vlHKj1rv5iSi-9fMcLg2owyCk3wAtRcceVewP34hERzXGTN0BWKkYE9aFa6XLq5hxbQe0ofjrzHUYvh~9wGzAzQYLUR~E7M3C0FD1WSeQ76b3O9no9Anu0LchnH8SDXaaaqaCwtZxWUkHHt1eENwz4-uw9lUIj~0eGYla-N7cJMUnwbfAyj7YkRCqzMe5Eaz0fKz4jtxTH33jSbA9qEuWnxvDN3nRSSqDzTjl9yXv7jmCNMZ50-c4ub1qh26a2-aq9Jl8sh9N~aLFHq7oagEFzh7oHACNZ6rCFvqradBg__"
            alt="Resultado de predicción"
            width={300}
            height={300}
            className="rounded-xl object-contain"
          />
        </div>
      </div>

      {/* Características */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
        <div className="h-32 border border-gray-300 rounded-md shadow-sm bg-white p-4">
          <h2 className="text-xl font-semibold text-[#426CE5] mb-2">Análisis Personalizados</h2>
          <p className="text-gray-600 text-sm">
            Obtiene predicciones ajustadas a tus variables específicas.
          </p>
        </div>
        <div className="h-32 border border-gray-300 rounded-md shadow-sm bg-white p-4">
          <h2 className="text-xl font-semibold text-[#426CE5] mb-2">Datos en tiempo real</h2>
          <p className="text-gray-600 text-sm">
            Visualizá tendencias basadas en la información más reciente.
          </p>
        </div>
        <div className="h-32 border border-gray-300 rounded-md shadow-sm bg-white p-4">
          <h2 className="text-xl font-semibold text-[#426CE5] mb-2">Comparación de variables</h2>
          <p className="text-gray-600 text-sm">
            Explorá relaciones entre múltiples factores del mercado.
          </p>
        </div>
      </div>

      <FooterHome />
    </div>
  )
}

export default Home
