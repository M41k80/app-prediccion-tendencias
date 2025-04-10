'use client'
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import InfoCard from "@/components/InfoCard";
import PredictionCard from "@/components/PredictionCard";
import LineChartCard from "@/components/LineChartCard";
import PieChartSelect from "@/components/PieChartSelect";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {

  const router = useRouter();

  useEffect(() => {
    // Comprobamos el token inmediatamente y luego cada 5 minutos
    const intervalId = setInterval(async () => {
      const isValid = await checkTokenValidity();
      if (!isValid) {
        router.push("/"); // Redirige al home para que inicie sesión
      }
    }, 5 * 60 * 1000); // 5 minutos en milisegundos

    return () => clearInterval(intervalId); // Limpiamos el intervalo cuando el componente se desmonte
  }, [router]);

  const checkTokenValidity = async () => {
    const response = await fetch("/api/check-token", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    return data.isValid; // Asumimos que la API responde con un campo 'isValid'
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-white px-4 md:px-8 py-8 w-full">
        <DashboardHeader />

        {/* Tarjetas superiores */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <InfoCard title="Último análisis" subtitle="Realizado el 22 de abril de 2024" buttonText="Ver detalle" />
          <InfoCard title="Tendencia destacada" value="+23%" subtitle="En variable destacada" />
          <InfoCard title="Promedio de ventas" value="+320" subtitle="En variable destacada" />
        </section>

        {/* Predicción + Análisis */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            <PredictionCard />
            <LineChartCard />
          </div>
          <div className="flex flex-col gap-4 h-full space-y-4">
            <InfoCard title="Promedio de clientes" value="+86" subtitle="En variable destacada" />
            <PieChartSelect className="-mt-4" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
