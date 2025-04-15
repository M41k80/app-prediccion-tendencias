import type { Metadata } from "next"
import {Inter } from "next/font/google"
import "../styles/globals.css"


const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de análisis predictivo de tendencias de mercado",
  description:
    "Descubrí hacia dónde se dirigen los mercados con nuestra herramienta de predicciones en tiempo real basadas en inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-500 antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
