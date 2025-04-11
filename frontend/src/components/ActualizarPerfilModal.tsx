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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await fetch("http://localhost:8000/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUsername(data.username);
        setEmail(data.email);
      }
    };

    fetchUser();
  }, []);

  const handleCloseAnimated = () => {
    setVisible(false);
    setTimeout(() => {
      onBackToPerfil();
    }, 300);
  };

  const handleConfirm = async () => {
    if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) return;

    const bodyData: { username: string; email: string; password?: string } = {
      username,
      email,
    };

    if (password) {
      bodyData.password = password;
    }

    const res = await fetch("http://localhost:8000/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      setVisible(false);
      setTimeout(() => {
        onSuccess();
      }, 300);
    } else {
      alert("Error al actualizar el perfil.");
    }
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

        <h2 className="text-2xl font-semibold text-[#426CE5] text-center mb-10">
          Actualizar perfil
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-700 block mb-1">Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b border-black outline-none px-2 py-1 text-base"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-black outline-none px-2 py-1 text-base"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-black outline-none px-2 py-1 text-base"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Repetir contraseña</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full border-b border-black outline-none px-2 py-1 text-base"
            />
          </div>
        </form>

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
