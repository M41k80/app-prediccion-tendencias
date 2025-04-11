"use client";
import React, { useState } from "react";
import PerfilModal from "./PerfilModal";
import ActualizarPerfilModal from "./ActualizarPerfilModal";
import PlanesModal from "./PlanesModal";
import ExitoModal from "./ExitoModal";

const ModalesDePerfil = () => {
  const [showPerfilModal, setShowPerfilModal] = useState(true);
  const [showActualizarModal, setShowActualizarModal] = useState(false);
  const [showPlanesModal, setShowPlanesModal] = useState(false);
  const [showExitoModal, setShowExitoModal] = useState(false);

  return (
    <>
      {/* Modal de Perfil */}
      {showPerfilModal && (
        <PerfilModal
          handleClose={() => setShowPerfilModal(false)}
          onActualizarPerfil={() => {
            setShowPerfilModal(false);
            setShowActualizarModal(true);
          }}
          onCambiarPlan={() => {
            setShowPerfilModal(false);
            setShowPlanesModal(true);
          }}
        />
      )}

      {/* Modal de Actualizar Perfil */}
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

      {/* Modal de Planes */}
      {showPlanesModal && (
        <PlanesModal
          volverAlPerfil={true}
          onVolverAlPerfil={() => {
            setShowPlanesModal(false);
            setShowPerfilModal(true);
          }}
          handleClose={() => setShowPlanesModal(false)}
        />
      )}

      {/* Modal de Éxito */}
      {showExitoModal && (
        <ExitoModal
          handleClose={() => {
            setShowExitoModal(false);
            setShowPerfilModal(true);
          }}
        />
      )}
    </>
  );
};

export default ModalesDePerfil;