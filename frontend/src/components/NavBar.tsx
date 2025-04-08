import React from "react";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center bg-white text-black">
      <div>
        <p className='font-bold text-[36px]'>Bienvenido a "nombre de la app"</p> 
        </div>
      <div className='flex gap-6 text-[26px]'>
        <div>Iniciar sesión</div>
        <div>Registrarse</div>
      </div>
    </div>
  );
};

export default NavBar;
