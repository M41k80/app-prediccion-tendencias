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
        <section className="max-w-5xl mx-auto space-y-8 text-sm sm:text-base">
          <div className="space-y-1">
            <h2 className="text-[#426CE5] font-semibold">¿Qué es ZionAI?</h2>
            <p>
              ZionAI es una aplicación diseñada para potenciar tu productividad, creatividad y organización
              mediante inteligencia artificial. Nuestro objetivo es simplificar tareas cotidianas y ofrecerte
              asistencia personalizada.
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-[#426CE5] font-semibold">¿Cómo creo una cuenta?</h2>
            <p>
              Podés crear una cuenta ingresando tu dirección de correo electrónico y creando una contraseña
              segura. También podés registrarte utilizando tu cuenta de Google o Apple para un acceso más
              rápido.
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-[#426CE5] font-semibold">¿Olvidaste tu contraseña?</h2>
            <p>
              No te preocupes. En la pantalla de inicio de sesión, hacé clic en “¿Olvidaste tu contraseña?”
              y seguí los pasos para restablecerla. Te enviaremos un enlace a tu correo electrónico para
              crear una nueva.
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-[#426CE5] font-semibold">¿Cómo funciona el sistema de créditos?</h2>
            <p>
              Cada función de ZionAI consume una cierta cantidad de créditos. Recibís créditos mensualmente
              según tu plan. También podés adquirir más créditos cuando los necesites desde tu perfil.
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-[#426CE5] font-semibold">¿Dónde puedo ver mi historial de actividad?</h2>
            <p>
              Tu historial de actividad se encuentra en la sección “Mi cuenta” &gt; “Historial”. Ahí vas a
              poder revisar tus últimas acciones y las respuestas generadas por la IA.
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-[#426CE5] font-semibold">¿Puedo cambiar mi plan?</h2>
            <p>
              Sí, podés cambiar tu plan en cualquier momento desde “Mi cuenta” &gt; “Suscripción”. Los cambios
              se verán reflejados en el próximo período de facturación.
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-[#426CE5] font-semibold">¿Cómo contacto al soporte técnico?</h2>
            <p>
              Si tenés alguna duda o problema, escribinos a:{" "}
              <a
                href="mailto:soporte.zionai@gmail.com"
                className="text-[#426CE5] underline font-medium"
              >
                soporte.zionai@gmail.com
              </a>.
              <br />
              Nuestro equipo te responderá lo antes posible.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
