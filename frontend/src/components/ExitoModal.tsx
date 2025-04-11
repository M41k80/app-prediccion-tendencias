"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ExitoModal = ({ handleClose }: { handleClose: () => void }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseAnimated = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose(); // Acción que vuelve a mostrar el PerfilModal
    }, 300);
  };

  return (
    <div
      onClick={handleCloseAnimated}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-3xl shadow-xl w-full max-w-md p-8 transition-all duration-300 transform text-center
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

        {/* Mensaje de éxito */}
        <div className="flex flex-col items-center justify-center mt-6">
          <h2 className="text-xl font-bold text-[#426CE5] mt-4">¡Perfil actualizado con éxito!</h2>
          <p className="text-sm text-black mt-2">Tus cambios han sido guardados correctamente.</p>
        </div>

        {/* Botón Aceptar */}
        <div className="mt-6">
          <button
            onClick={handleCloseAnimated}
            className="bg-[#426CE5] hover:bg-[#375CC7] text-white text-sm font-medium px-8 py-2.5 rounded-lg transition cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitoModal;
