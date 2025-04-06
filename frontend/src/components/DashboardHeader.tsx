import Image from "next/image";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-black">Hola, Karim</h1>
        <p className="text-gray-500">Te damos la bienvenida a tu panel de análisis inteligente.</p>
      </div>
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
