"use client";
import React, { useState, useEffect} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginModal = ({
  handleShowModalLogin,
}: {
  handleShowModalLogin: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Activar animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Cerrar con animación de salida
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleShowModalLogin();
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // realizamos la solicitud de login
      const loginResponse = await fetch(
        "http://localhost:8000/api/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      if (loginResponse.status === 200) {
        const data = await loginResponse.json();
        console.log("Login response data:", data);

        if (data && data.access) {

          localStorage.setItem("access_token", data.access);
          toast.success("¡Login exitoso!");
          handleClose();
          router.push("/dashboard");
        } else {
          toast.error("No se recibió el token.");
        }
      } else {
        toast.error("Error al iniciar sesión.");
      }
    } catch (error) {
      toast.error("Hubo un error durante el login.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-2xl shadow p-6 w-full max-w-md transform transition-all duration-300 ${isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
          }`}
      >
        {/* Botón de cerrar */}
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
            Iniciar sesión
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
            O usa tu nombre de usuario para iniciar sesión
          </p>

          {/* Formulario */}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <Image
                src="https://www.svgrepo.com/show/521128/email-1.svg"
                alt="Correo"
                width={18}
                height={18}
                className="absolute left-3 top-2.5"
              />
              <input
                type="text"
                name="username"  // Nombre debe coincidir con la clave en formData
                value={formData.username || ''}  // Usar username en lugar de email
                onChange={handleChange}
                placeholder="Nombre de usuario"
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-sm placeholder-gray-400 shadow-sm focus:ring-1 focus:ring-blue-500 focus:ring-offset-0"
              />
            </div>

            <div className="relative mb-6">
              <Image
                src="https://www.svgrepo.com/show/532323/lock-alt.svg"
                alt="Contraseña"
                width={18}
                height={18}
                className="absolute left-3 top-2.5"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-sm placeholder-gray-400 shadow-sm focus:ring-1 focus:ring-blue-500 focus:ring-offset-0"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#426CE5] hover:bg-[#375CC7] text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
