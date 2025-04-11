"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import HeroAnimation from "@/components/HeroAnimation";

import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import PlanesModal from "@/components/PlanesModal";

export default function Home() {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalPlanes, setShowModalPlanes] = useState(false);

  const handleShowModalLogin = () => setShowModalLogin(!showModalLogin);
  const handleShowModalRegister = () =>
    setShowModalRegister(!showModalRegister);
  const handleShowModalPlanes = () => setShowModalPlanes(true);

  return (
    <div>
      {/* Modales */}
      {showModalLogin && (
        <LoginModal handleShowModalLogin={handleShowModalLogin} />
      )}
      {showModalRegister && (
        <RegisterModal handleShowModalRegister={handleShowModalRegister} />
      )}
      {showModalPlanes && (
        <PlanesModal handleClose={() => setShowModalPlanes(false)} />
      )}

      {/* Header */}
      <header className="bg-white py-8">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Logo + texto */}
          <div className="flex items-center gap-2 justify-center w-full md:w-auto">
            <h1 className="text-2xl font-semibold whitespace-nowrap leading-none">
              Bienvenido a
            </h1>
            <Image
              src="/logo-horizontal.png"
              alt="Logo"
              width={160}
              height={70}
              style={{ height: "70px", width: "160px" }}
              className="object-contain"
            />
          </div>

          {/* Botones */}
          <div className="flex items-center gap-4 justify-center w-full md:w-auto">
            <button
              onClick={handleShowModalLogin}
              className="text-black hover:text-[#426CE5] text-lg font-medium cursor-pointer"
            >
              Iniciar sesión
            </button>
            <button
              onClick={handleShowModalRegister}
              className="text-black hover:text-[#426CE5] text-lg font-medium cursor-pointer"
            >
              Registrarse
            </button>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Sistema de análisis predictivo de tendencias de mercado
              </h2>
              <p className="text-lg text-gray-700">
                Descubre hacia dónde se dirigen los mercados. Usá nuestra
                herramienta para obtener predicciones en tiempo real basadas en{" "}
                <span className="text-[#426CE5] font-semibold">
                  inteligencia artificial
                </span>
                .
              </p>
              <div className="flex flex-wrap gap-4 pt-4 pb-6 justify-center md:justify-start">
                <button
                  onClick={handleShowModalRegister}
                  className="bg-[#426CE5] hover:bg-[#375CC7] text-white px-8 py-3 rounded-lg font-medium cursor-pointer transform transition-transform duration-300 hover:scale-105"
                >
                  Registrarse
                </button>
                <button
                  onClick={handleShowModalPlanes}
                  className="bg-white hover:bg-gray-300 text-black border border-gray-300 px-8 py-3 rounded-lg font-medium cursor-pointer transform transition-transform duration-300 hover:scale-105"
                >
                  Explorar planes
                </button>
              </div>
            </div>

            {/* Animación*/}
            <div className="w-full h-auto flex justify-center items-center -mt-20">
              <HeroAnimation />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg border border-gray-300 transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-[#426CE5] mb-4">
                Análisis personalizados
              </h3>
              <p className="text-black">
                Obtiene predicciones ajustadas a tus variables específicas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300 transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-[#426CE5] mb-4">
                Datos en tiempo real
              </h3>
              <p className="text-black">
                Visualizá tendencias basadas en la información más reciente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300 transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-[#426CE5] mb-4">
                Comparación de variables
              </h3>
              <p className="text-black">
                Explorá relaciones entre múltiples factores del mercado.
              </p>
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
