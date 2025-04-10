"use client";

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
import axios from "axios";
import { toast } from "sonner";

interface PredictionPoint {
  date: string;
  prediction: number;
}

interface RawPrediction {
  date: string;
  prediction: string;
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
        const res = await axios.post(
          "https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/predict/",
          {
            store_id: 1,
            product_name: "Coca-Cola 600ml",
            n_days: 7,
            start_date: "2025-04-06",
            store_type: "a",
            assortment: "b",
            state_holiday: "0",
            school_holiday: 0,
            promo: 1,
            weather: 3,
            sentiment_score: 0.8,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData: RawPrediction[] = res.data.prediction;

        const formatted: PredictionPoint[] = responseData.map((item) => ({
          date: item.date,
          prediction: parseFloat(item.prediction),
        }));

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
    <div className={`bg-white p-10 shadow-sm border border-gray-200 rounded-xl ${className}`}>
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
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
