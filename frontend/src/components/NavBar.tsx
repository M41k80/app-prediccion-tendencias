import React from "react";

interface NavBarProps {
  handleShowModalLogin: () => void;
  handleShowModalRegister: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  handleShowModalLogin,
  handleShowModalRegister,
}) => {
  return (
    <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-medium">Bienvenido a (nombre de la app)</h1>
      </div>
      <div className="flex gap-4">
        <button
          className="text-gray-700 hover:text-gray-900"
          onClick={handleShowModalLogin}
        >
          Iniciar sesión
        </button>
        <button
          className="text-gray-700 hover:text-gray-900"
          onClick={handleShowModalRegister}
        >
          Registrarse
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
