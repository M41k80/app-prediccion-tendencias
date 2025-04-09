import React from "react";
import Link from "next/link";

const FooterHome = () => {
  return (
    <div className="flex justify-between items-center bg-white text-black border-t border-gray-200 mt-10 pt-6">
      <Link href="/contacto" className="text-[30px]">Contacto</Link>
      <div className="flex gap-6 text-[25px]">
        <Link href="/privacy">Politica de privacidad</Link>
        <Link href="/terms">Términos</Link>
      </div>
    </div>
  );
};

export default FooterHome;
