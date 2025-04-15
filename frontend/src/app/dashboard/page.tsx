'use client'
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import PredictionCard from "@/components/PredictionCard";
import LineChartCard from "@/components/LineChartCard";
import PieChartSelect from "@/components/PieChartSelect";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LastPrediction from "@/components/LastPrediction";
import TrendData from "@/components/TrendData";
import TrendDataClients from "@/components/TrandDataClients";
import TrendDataClientPro from "@/components/TrendDataClientPro";

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
      const token = localStorage.getItem("access_token");
      if (!token) return;
    const response = await fetch("https://django-backend-g9yv.onrender.com/api/check-token", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
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
          <LastPrediction title="Último análisis"  buttonText="Ver detalle" />
          <TrendData title="Tendencia destacada" variableName="Likes"/>
          <TrendDataClients title="Promedio de ventas" variableName="la ultima predicion" />
        </section>

        {/* Predicción + Análisis */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <PredictionCard />
            <LineChartCard />
          </div>
          <div className="flex flex-col gap-4 h-full space-y-6">
            <TrendDataClientPro title="Promedio de clientes"  variableName="la ultima predicción" />
            <PieChartSelect className="-mt-4" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;