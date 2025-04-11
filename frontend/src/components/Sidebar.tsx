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

import PerfilModal from "./PerfilModal";
import ActualizarPerfilModal from "./ActualizarPerfilModal";
import PlanesModal from "./PlanesModal";
import ExitoModal from "./ExitoModal";

const sidebarItems = [
  { icon: Home, label: "Inicio", path: "/dashboard" },
  { icon: FilePlus, label: "Nueva Predicción", path: "/dashboard/prediccion" },
  {
    icon: History,
    label: "Historial de Predicciones",
    path: "/dashboard/historial",
  },
  { icon: CircleUserRound, label: "Perfil", path: "/dashboard/perfil" },
  { icon: HelpCircle, label: "Ayuda", path: "/dashboard/ayuda" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPerfilModal, setShowPerfilModal] = useState(false);
  const [showActualizarModal, setShowActualizarModal] = useState(false);
  const [showPlanesModal, setShowPlanesModal] = useState(false);
  const [showExitoModal, setShowExitoModal] = useState(false);
  const [volverAlPerfilDesdePlanes, setVolverAlPerfilDesdePlanes] = useState(false);

  const router = useRouter();

  const handleNavigate = (path: string, label: string) => {
    if (label === "Perfil") {
      setIsOpen(false);
      setShowPerfilModal(true);
      return;
    }
    router.push(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  return (
    <>
      {showPerfilModal && (
        <PerfilModal
          handleClose={() => setShowPerfilModal(false)}
          onActualizarPerfil={() => {
            setShowPerfilModal(false);
            setShowActualizarModal(true);
          }}
          onCambiarPlan={() => {
            setShowPerfilModal(false);
            setVolverAlPerfilDesdePlanes(true);
            setShowPlanesModal(true);
          }}
        />
      )}

      {showActualizarModal && (
        <ActualizarPerfilModal
          onSuccess={() => {
            setShowActualizarModal(false);
            setShowExitoModal(true);
          }}
          onBackToPerfil={() => {
            setShowActualizarModal(false);
            setShowPerfilModal(true);
          }}
        />
      )}

      {showPlanesModal && (
        <PlanesModal
          handleClose={() => {
            setShowPlanesModal(false);
            if (volverAlPerfilDesdePlanes) {
              setVolverAlPerfilDesdePlanes(false);
              setShowPerfilModal(true);
            }
          }}
          volverAlPerfil={volverAlPerfilDesdePlanes}
          onVolverAlPerfil={() => {
            setShowPlanesModal(false);
            setVolverAlPerfilDesdePlanes(false);
            setShowPerfilModal(true);
          }}
        />
      )}

      {showExitoModal && (
        <ExitoModal
          handleClose={() => {
            setShowExitoModal(false);
            setShowPerfilModal(true);
          }}
        />
      )}

      <div className="md:hidden p-4 bg-gray-100">
        <Menu
          className="text-black cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <aside className="hidden md:flex w-1/6 bg-gray-100 text-black flex-col items-center py-6 space-y-8">
        <div className="mt-2 mb-10">
          <Image
            src="/logo-horizontal.png"
            alt="Logo"
            width={150}
            height={70}
            className="object-contain"
          />
        </div>

        {sidebarItems.map(({ icon: Icon, label, path }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer w-full py-2 px-4"
            onClick={() => handleNavigate(path, label)}
          >
            <Icon className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-base font-semibold text-black">{label}</span>
          </div>
        ))}

        <h2
          onClick={handleLogout}
          className="mt-auto mb-14 text-black font-semibold cursor-pointer hover:text-[#426CE5] transition"
        >
          Cerrar Sesión
        </h2>
      </aside>

      {isOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 w-2/3 h-full z-50 p-6 flex flex-col space-y-6 md:hidden bg-gray-100"
        >
          <div className="mb-6 flex justify-center">
            <Image
              src="/logo-horizontal.png"
              alt="Logo"
              width={150}
              height={70}
              className="object-contain"
            />
          </div>

          <button
            className="self-end text-black mb-4 cursor-pointer text-xl font-semibold"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          {sidebarItems.map(({ icon: Icon, label, path }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 hover:bg-gray-200 cursor-pointer py-2 px-3 rounded"
              onClick={() => handleNavigate(path, label)}
            >
              <Icon className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-base font-semibold text-black">
                {label}
              </span>
            </div>
          ))}

          <h2
            onClick={handleLogout}
            className="mt-auto text-black font-semibold text-center cursor-pointer hover:text-[#426CE5] transition"
          >
            Cerrar Sesión
          </h2>
        </motion.aside>
      )}
    </>
  );
}