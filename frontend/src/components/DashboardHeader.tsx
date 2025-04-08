import Image from "next/image";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <header>
        <h1 className="text-3xl font-semibold text-black">Hola, Karim</h1>
        <p className="text-gray-500 font-normal text-lg">Te damos la bienvenida a tu panel de análisis inteligente.</p>
      </header>
      <Image
        src="/perfil.png"
        alt="User Profile"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  );
}
