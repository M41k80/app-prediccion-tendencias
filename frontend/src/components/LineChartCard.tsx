"use client"
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

interface PredictionPoint {
  date: string;
  sales_prediction: number;
}

interface RawPrediction {
  date: string;
  sales_prediction: string;
}

interface Prediction {
  id: number;
  store_id: number;
  product_name: string;
  start_date: string;
  n_days: number;
  result: {
    predictions: RawPrediction[];
  };
  date_requested: string;
}

interface Props {
  className?: string;
}

export default function LineChartCard({ className = "" }: Props) {
  const [data, setData] = useState<PredictionPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No token found in localStorage.");
        }

        const historialRes = await fetch(
          "https://django-backend-g9yv.onrender.com/api/historial/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!historialRes.ok) {
          throw new Error("Error al obtener el historial de predicciones.");
        }

        const historialData: Prediction[] = await historialRes.json();
        console.log(historialData);  // Verifica la estructura de los datos

        // Ordenar las predicciones por la fecha más reciente
        const latestPrediction = historialData.sort(
          (a, b) => new Date(b.date_requested).getTime() - new Date(a.date_requested).getTime()
        )[0];

        if (!latestPrediction || !latestPrediction.result.predictions.length) {
          throw new Error("No se encontraron predicciones en el historial.");
        }

        // Obtener las predicciones más recientes
        const formatted: PredictionPoint[] = latestPrediction.result.predictions.map(
          (item: RawPrediction) => ({
            date: item.date,
            sales_prediction: parseFloat(item.sales_prediction), // Asegúrate de convertir a número
          })
        );

        setData(formatted);
      } catch (error) {
        toast.error("Error al cargar la predicción para el gráfico.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, []);

  return (
    <div className={`bg-white p-10  shadow-sm border border-gray-200 rounded-xl ${className}`}>
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-semibold text-black">Análisis predictivo más reciente</h3>
        <span className="text-xs text-gray-400">Últimos 7 días</span>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Cargando gráfico...</div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="sales_prediction" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
