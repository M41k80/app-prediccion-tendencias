"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const RegisterModal = ({
  handleShowModalRegister,
}: {
  handleShowModalRegister: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleShowModalRegister(); // Se desmonta desde el padre
    }, 300); // Duración igual a la animación
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-2xl shadow p-6 w-full max-w-md transform transition-all duration-300 ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 p-1.5 rounded-lg cursor-pointer"
          onClick={handleClose}
        >
          <Image
            src="https://www.svgrepo.com/show/521106/close.svg"
            alt="Cerrar"
            width={20}
            height={20}
            className="w-8 h-8"
          />
          <span className="sr-only">Cerrar</span>
        </button>

        {/* Contenido */}
        <div className="p-4 sm:p-6">
          <h3 className="text-2xl font-semibold text-center text-[#426CE5] mb-6">
            Crear una cuenta
          </h3>

          {/* Botones sociales */}
          <div className="flex justify-center gap-4 mb-6">
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-gray-100 transition">
              <Image
                src="https://www.svgrepo.com/show/512321/google-178.svg"
                alt="Google"
                width={18}
                height={18}
              />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-gray-100 transition">
              <Image
                src="https://www.svgrepo.com/show/512419/linkedin-161.svg"
                alt="LinkedIn"
                width={18}
                height={18}
              />
            </button>
          </div>

          <p className="text-sm text-slate-600 text-center mb-6">
            O usa tu email para registrarte
          </p>

          {/* Formulario */}
          <form className="w-full">
            {/* Nombre */}
            <div className="relative mb-4">
              <Image
                src="https://www.svgrepo.com/show/522440/profile.svg"
                alt="Usuario"
                width={18}
                height={18}
                className="absolute left-3 top-2.5"
              />
              <input
                name="fullname"
                type="text"
                autoComplete="fullname"
                required
                placeholder="Nombre de Usuario"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 shadow-sm text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0"
              />
            </div>

            {/* Correo */}
            <div className="relative mb-4">
              <Image
                src="https://www.svgrepo.com/show/521128/email-1.svg"
                alt="Correo"
                width={18}
                height={18}
                className="absolute left-3 top-2.5"
              />
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Correo electrónico"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 shadow-sm text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0"
              />
            </div>

            {/* Contraseña */}
            <div className="relative mb-2">
              <Image
                src="https://www.svgrepo.com/show/532323/lock-alt.svg"
                alt="Contraseña"
                width={18}
                height={18}
                className="absolute left-3 top-2.5"
              />
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Contraseña"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 shadow-sm text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0"
              />
            </div>

            <p className="text-xs text-slate-600 text-center mb-4">
              La contraseña debe tener al menos 8 caracteres.
            </p>

            {/* Botón */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#426CE5] hover:bg-[#375CC7] py-2.5 text-sm font-medium text-white transition-colors cursor-pointer"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
