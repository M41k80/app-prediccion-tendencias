import React from "react";

const FooterHome = () => {
  return (
    <div className="flex justify-between items-center bg-white text-black border-t mt-10 pt-6">
      <div className="text-[30px]">Contacto</div>
      <div className="flex gap-6 text-[25px]">
        <div>Politica de privacidad</div>
        <div>Términos</div>
      </div>
    </div>
  );
};

export default FooterHome;
