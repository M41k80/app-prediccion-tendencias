"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

interface Prediction {
  id: number;
  date_requested: string;
  product_name: string;
  result: {
    predictions: {
      date: string;
      sales_prediction: number;
      customer_prediction: number;
    }[];
  };
}

export default function HistorialPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  // Fetching the prediction data
  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No token found in localStorage.");
        }

        const historialRes = await fetch("http://127.0.0.1:8000/api/historial/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!historialRes.ok) {
          throw new Error("Error al obtener el historial de predicciones.");
        }

        const historialData = await historialRes.json();
        setPredictions(historialData);
      } catch (error) {
        console.error("Error al cargar el historial de predicciones", error);
      }
    };

    fetchPredictionData();
  }, []);

  // Calcula el promedio de ventas para cada predicción
  const calculateAverageSales = (prediction: Prediction) => {
    const totalSales = prediction.result.predictions.reduce(
      (sum: number, predictionData: { sales_prediction: number }) => sum + predictionData.sales_prediction,
      0
    );
    return totalSales / prediction.result.predictions.length;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Encabezado */}
        <header className="flex justify-between items-center mb-10 max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-black">Historial de Predicciones</h1>
          <Image
            src="/favicon.ico"
            alt="Avatar del usuario"
            width={40}
            height={40}
            className="rounded-full"
          />
        </header>

        {/* Contenido principal */}
        <section className="bg-gray-100 rounded-2xl shadow p-10 max-w-5xl mx-auto min-h-[400px]">
          {/* Listado de predicciones */}
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Fecha de predicción: {prediction.date_requested}</p>
                    <p className="font-semibold text-gray-700">Producto: {prediction.product_name}</p>
                    <p className="text-sm text-gray-500">Días predichos: {prediction.result.predictions.length}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">
                      Promedio ventas: {calculateAverageSales(prediction).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
