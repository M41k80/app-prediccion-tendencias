"use client"

import Sidebar from "@/components/Sidebar"
import Image from "next/image"

export default function AyudaPage() {


  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Encabezado */}
        <header className="flex justify-between items-center mb-10 max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-black">Ayuda</h1>
          <Image
            src="/perfil.png"
            alt="Avatar del usuario"
            width={40}
            height={40}
            className="rounded-full"
          />
        </header>

        {/* Contenido principal */}
        <section className="bg-gray-100 rounded-2xl shadow p-10 max-w-5xl mx-auto min-h-[400px] flex items-center justify-center">
            <div className="w-full">
            </div>
        </section>
      </main>
    </div>
  )
}
