"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const PerfilModal = ({
  handleClose,
  onActualizarPerfil,
  onCambiarPlan,
}: {
  handleClose: () => void;
  onActualizarPerfil: () => void;
  onCambiarPlan: () => void;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseAnimated = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  return (
    <div
      onClick={handleCloseAnimated}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-3xl shadow-xl w-full max-w-md p-8 transition-all duration-300 transform
          ${
            visible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }
        `}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleCloseAnimated}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <Image
            src="https://www.svgrepo.com/show/521106/close.svg"
            alt="Cerrar"
            width={24}
            height={24}
            className="w-10 h-10"
          />
        </button>

        {/* Título */}
        <h2 className="text-xl font-semibold text-black mb-8">
          Información del perfil
        </h2>

        {/* Formulario */}
        <form className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            {/* Inputs Nombre y Apellido */}
            <div className="flex-1 space-y-4">
              {/* Nombre */}
              <div>
                <label className="text-md text-black block mb-1">Nombre</label>
                <input
                  type="text"
                  defaultValue="Karim"
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-md focus:outline-none focus:ring-1 focus:ring-[#426CE5]"
                />
              </div>

              {/* Apellido */}
              <div>
                <label className="text-md text-black block mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  defaultValue="Karim"
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-md focus:outline-none focus:ring-1 focus:ring-[#426CE5]"
                />
              </div>
            </div>

            {/* Imagen y botón cambiar */}
            <div className="flex flex-col items-center min-w-[120px] mt-2">
              <div className="w-[120px] h-[120px] relative">
                <Image
                  src="/perfil.png"
                  alt="Foto de perfil"
                  fill
                  className="rounded-full object-cover"
                  sizes="120px"
                />
              </div>
              <button
                type="button"
                className="mt-2 text-sm text-black font-medium cursor-pointer hover:text-[#375CC7] transition"
              >
                Cambiar foto
              </button>
            </div>
          </div>

          {/* Correo electrónico */}
          <div>
            <label className="text-md text-black block mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              defaultValue="Karim"
              className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-md focus:outline-none focus:ring-1 focus:ring-[#426CE5]"
            />
          </div>

          {/* Botón actualizar perfil */}
          <button
            type="button"
            onClick={onActualizarPerfil}
            className="w-full border-2 border-[#426CE5] text-[#426CE5] cursor-pointer text-sm font-medium rounded-md py-3 hover:bg-[#426CE5]/10 transition"
          >
            Actualizar perfil
          </button>

          {/* Botón cambiar de plan */}
          <button
            type="button"
            onClick={onCambiarPlan}
            className="w-full bg-[#426CE5] hover:bg-[#375CC7] cursor-pointer text-white text-sm font-medium rounded-md py-3 transition"
          >
            Cambiar de plan
          </button>

          {/* Línea */}
          <hr className="border-gray-300 my-2" />

          {/* Eliminar cuenta */}
          <button
            type="button"
            className="w-full text-sm text-black font-medium transition cursor-pointer"
          >
            Eliminar cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default PerfilModal;
