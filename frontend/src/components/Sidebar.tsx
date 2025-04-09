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

const sidebarItems = [
  { icon: Home, label: "Inicio" },
  { icon: FilePlus, label: "Nueva Predicción" },
  { icon: History, label: "Historial" },
  { icon: CircleUserRound, label: "Perfil" },
  { icon: HelpCircle, label: "Ayuda" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <div className="md:hidden p-4 bg-gray-100">
        <Menu
          className="text-black cursor-pointer "
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Sidebar para pantallas grandes */}
      <aside className="hidden md:flex w-1/6 bg-gray-100 text-black flex-col items-center py-6 space-y-8">
        {sidebarItems.map(({ icon: Icon, label }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer w-full py-2 px-4"
          >
            <Icon className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-base font-semibold text-black">{label}</span>
          </div>
        ))}
        <h2 className="mt-32 text-black font-semibold cursor-pointer">Cerrar Sesión</h2>
      </aside>

      {/* Sidebar móvil que se desplega*/}
      {isOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 w-2/3 h-full bg-gris z-50 p-6 flex flex-col space-y-6 md:hidden bg-gray-100"
        >
          <button
            className="self-end text-black mb-4 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          {sidebarItems.map(({ icon: Icon, label }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 hover:bg-gris2 cursor-pointer py-2 px-3 rounded"
              onClick={() => setIsOpen(false)} // para cerrar al hacer clic
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-base font-semibold text-black">
                {label}
              </span>
            </div>
          ))}
                  <h2 className="mt-32 text-black font-semibold text-center cursor-pointer">Cerrar Sesión</h2>
        </motion.aside>
        
      )}
    </>
  );
}
