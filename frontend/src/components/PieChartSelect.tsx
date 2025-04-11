"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3B82F6", "#93C5FD"];

interface Prediction {
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

interface ComparisonData {
  name: string;
  value: number;
}

interface PieChartProps {
  className?: string;
}

export default function PieChartComparison({ className = "" }: PieChartProps) {
  // eslint-disable-next-line 
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [varA, setVarA] = useState<string>("");
  const [varB, setVarB] = useState<string>("");
  const [products, setProducts] = useState<string[]>([]);


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


        const productNames = Array.from(
          new Set(historialData.map((prediction: Prediction) => prediction.product_name))
        );
        setProducts(productNames as string[]);

        // Calculate average sales per product
        const data = historialData.map((prediction: Prediction) => {
          const totalSales = prediction.result.predictions.reduce(
            (sum: number, predictionData: { sales_prediction: number }) => sum + predictionData.sales_prediction,
            0
          );
          const avgSales = totalSales / prediction.result.predictions.length;
          return {
            name: prediction.product_name,
            value: avgSales,
          };
        });

        setPredictions(historialData);
        setComparisonData(data);
      } catch (error) {
        console.error("Error al cargar el historial de predicciones", error);
      }
    };

    fetchPredictionData();
  }, []);


  const filteredData = comparisonData.filter((item) =>
    [varA, varB].includes(item.name)
  );

  return (
    <div className={`bg-white shadow-sm p-6 pt-3 w-full -mt-4 border border-gray-200 rounded-xl ${className}`}>
      <h3 className="text-lg font-semibold text-black text-center mb-6">
        Comparación Rapida
      </h3>

      {/* Product selection */}
      <div className="flex flex-col gap-6 mb-6">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Selecciona Producto A</label>
          <select
            value={varA}
            onChange={(e) => setVarA(e.target.value)}
            className="w-full sm:w-48 text-sm border border-gray-300 rounded-md px-3 py-2 text-gray-700"
          >
            <option value="">-- Selecciona un producto --</option>
            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        {/* Producto B */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Selecciona Producto B</label>
          <select
            value={varB}
            onChange={(e) => setVarB(e.target.value)}
            className="w-full sm:w-48 text-sm border border-gray-300 rounded-md px-3 py-2 text-gray-700"
          >

            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pie chart showing selected products */}
      <div className="flex justify-center items-center mb-6">
        <ResponsiveContainer width="100%" height={170}>
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="value"
              nameKey="name"
              outerRadius={60}
              innerRadius={25}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {filteredData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center">
        {filteredData.length === 0 ? (
          <p className="text-gray-500">Selecciona productos para comparar.</p>
        ) : (
          <div className="text-sm text-gray-700">
            <p>Se muestran los promedios de ventas de los productos seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
