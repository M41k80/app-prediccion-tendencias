"use client";
import {
  Home,
  HelpCircle,
  FilePlus,
  History,
  CircleUserRound,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const sidebarItems = [
  { icon: Home, label: "Inicio", path: "/dashboard" },
  { icon: FilePlus, label: "Nueva Predicción", path: "dashboard/prediccion" },
  { icon: History, label: "Historial de Predicciones", path: "dashboard/historial" },
  { icon: CircleUserRound, label: "Perfil", path: "dashboard/perfil" },
  { icon: HelpCircle, label: "Ayuda", path: "dashboard/ayuda" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <div className="md:hidden p-4 bg-gray-100">
        <Menu
          className="text-black cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-1/6 bg-gray-100 text-black flex-col items-center py-6 space-y-8">
        {/* Logo */}
        <div
          className="cursor-pointer mb-4"
          onClick={() => handleNavigate("/")}
        >
          <Image
            src="/logo.png"
            alt="Logo de la plataforma"
            width={60}
            height={30}
            className="object-contain mx-auto"
            priority
          />
        </div>

        {sidebarItems.map(({ icon: Icon, label, path }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer w-full py-2 px-4"
            onClick={() => handleNavigate(path)}
          >
            <Icon className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-base font-semibold text-black">{label}</span>
          </div>
        ))}

        <h2 className="mt-auto text-black font-semibold cursor-pointer">
          Cerrar Sesión
        </h2>
      </aside>

      {/* Sidebar Móvil */}
      {isOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 w-2/3 h-full z-50 p-6 flex flex-col space-y-6 md:hidden bg-gray-100"
        >
          {/* Logo móvil */}
          <div
            className="cursor-pointer mb-4 flex justify-center"
            onClick={() => handleNavigate("/dashboard")}
          >
            <Image
              src="/logo.png"
              alt="Logo de la plataforma"
              width={60}
              height={30}
              className="object-contain"
              priority
            />
          </div>

          <button
            className="self-end text-black mb-4 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          {sidebarItems.map(({ icon: Icon, label, path }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 hover:bg-gray-200 cursor-pointer py-2 px-3 rounded"
              onClick={() => handleNavigate(path)}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-base font-semibold text-black">
                {label}
              </span>
            </div>
          ))}

          <h2 className="mt-auto text-black font-semibold text-center cursor-pointer">
            Cerrar Sesión
          </h2>
        </motion.aside>
      )}
    </>
  );
}
