"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ActualizarPerfilModal = ({
  onSuccess,
  onBackToPerfil,
}: {
  onSuccess: () => void;
  onBackToPerfil: () => void;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseAnimated = () => {
    setVisible(false);
    setTimeout(() => {
      onBackToPerfil(); // Accion para volver al modal de perfil
    }, 300);
  };

  const handleConfirm = () => {
    setVisible(false);
    setTimeout(() => {
      onSuccess(); // Accion para mostrar el modal de éxito
    }, 300);
  };

  return (
    <div
      onClick={handleCloseAnimated}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-3xl shadow-xl w-full max-w-3xl p-10 transition-all duration-300 transform
          ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
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
            className="w-8 h-8"
          />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-[#426CE5] text-center mb-10">
          Actualizar perfil
        </h2>

        {/* Formulario */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-700 block mb-1">Nombre de Usuario</label>
            <input
              type="text"
              className="w-full border-b border-black outline-none px-2 py-1 text-base"
              defaultValue="Karim"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border-b border-black outline-none px-2 py-1 text-base"
              defaultValue="*************"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Correo electrónico</label>
            <input
              type="email"
              className="w-full border-b border-black outline-none px-2 py-1 text-base"
              defaultValue="Karim"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Repetir contraseña</label>
            <input
              type="password"
              className="w-full border-b border-black outline-none px-2 py-1 text-base"
              defaultValue="*************"
            />
          </div>
        </form>

        {/* Botón Confirmar */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-[#426CE5] hover:bg-[#375CC7] cursor-pointer text-white text-sm font-medium px-10 py-2.5 rounded-md transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPerfilModal;
