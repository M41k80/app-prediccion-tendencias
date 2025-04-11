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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No token found in localStorage.");
    }
    const res = await fetch("http://localhost:8000/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUserId(data.id);
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setEmail(data.email);
    setProfileImage(
      data.profile_image ? `http://localhost:8000${data.profile_image}` : null
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleCloseAnimated = () => {
    setVisible(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await fetch("http://localhost:8000/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
      }),
    });

    if (response.ok) {
      if (imageFile) {
        await handleUploadImage();
      } else {
        onActualizarPerfil();
      }
    } else {
      console.error("Error al actualizar el perfil");
    }
  };

  const handleUploadImage = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    if (!userId) {
      console.error("User ID no disponible para subir imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", imageFile!);

    const response = await fetch(
      `http://localhost:8000/api/users/${userId}/upload_profile_image/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      console.error("Error al actualizar la imagen de perfil");
    } else {
      console.log("Imagen de perfil actualizada con éxito");
      await fetchUser(); // Recarga la imagen actualizada
      onActualizarPerfil();
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No token found in localStorage.");
    }
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?");
    if (confirmed) {
      const response = await fetch("http://localhost:8000/api/users/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Error al eliminar la cuenta");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div
      onClick={handleCloseAnimated}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-3xl shadow-xl w-full max-w-md p-8 transition-all duration-300 transform
          ${visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
          }
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
            className="w-10 h-10"
          />
        </button>

        <h2 className="text-xl font-semibold text-black mb-8">
          Información del perfil
        </h2>

        <form className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-md text-black block mb-1">Nombre</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-md focus:outline-none focus:ring-1 focus:ring-[#426CE5]"
                />
              </div>
              <div>
                <label className="text-md text-black block mb-1">Apellido</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-md focus:outline-none focus:ring-1 focus:ring-[#426CE5]"
                />
              </div>
            </div>

            <div className="flex flex-col items-center min-w-[120px] mt-2">
              <div className="w-[120px] h-[120px] relative rounded-full overflow-hidden">
                <Image
                  src={profileImage || "/favicon.ico"}
                  alt="Perfil del usuario"
                  fill
                  className="object-cover"
                />
              </div>
              <label className="mt-2 text-sm text-black font-medium cursor-pointer hover:text-[#375CC7] transition">
                Cambiar foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="text-md text-black block mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-md focus:outline-none focus:ring-1 focus:ring-[#426CE5]"
            />
          </div>

          <button
            type="button"
            onClick={handleUpdateProfile}
            className="w-full border-2 border-[#426CE5] text-[#426CE5] cursor-pointer text-sm font-medium rounded-md py-3 hover:bg-[#426CE5]/10 transition"
          >
            Actualizar perfil
          </button>

          <button
            type="button"
            onClick={onCambiarPlan}
            className="w-full bg-[#426CE5] hover:bg-[#375CC7] cursor-pointer text-white text-sm font-medium rounded-md py-3 transition"
          >
            Cambiar de plan
          </button>

          <hr className="border-gray-300 my-2" />

          <button
            type="button"
            onClick={handleDeleteAccount}
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
