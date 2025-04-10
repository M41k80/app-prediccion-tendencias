import Image from "next/image"

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-black">
          Hola, Karim
        </h1>
        <p className="text-lg text-gray-500 mt-1">
          Te damos la bienvenida a tu panel de análisis inteligente.
        </p>
      </div>
      <Image
        src="/perfil.png"
        alt="Perfil del usuario"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
    </div>
  )
}
