import React from "react";

interface NavBarProps {
    handleShowModalLogin: () => void;
    handleShowModalRegister: () => void;
}


const NavBar:React.FC<NavBarProps> = ({ handleShowModalLogin, handleShowModalRegister }) => {
  return (
    <nav className="flex justify-between items-center bg-white text-black">
      <div>
        <p className='font-bold text-[36px]'>Bienvenido a nombre de la app</p> 
        </div>
      <div className='flex gap-6 text-[26px]'>
        <button onClick={handleShowModalLogin}>Iniciar sesión</button>
        <button onClick={handleShowModalRegister}>Registrarse</button>
      </div>
    </nav>
  );
};

export default NavBar;
