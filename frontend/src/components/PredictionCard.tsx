"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { X } from "lucide-react";
import Link from "next/link";

interface PredictionCardProps {
  className?: string;
}

export default function PredictionCard({
  className = "",
}: PredictionCardProps) {
  const [store, setStore] = useState("");
  const [product, setProduct] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days] = useState(7);
  const [products, setProducts] = useState<string[]>([]);
  const [status, setStatus] = useState<"form" | "loading" | "success">("form");

  const simulate = true; // Cambiar a false para usar el endpoint real

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://extension-rental-freeze-blow.trycloudflare.com/products"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error al cargar productos", error);
        toast.error("No se pudieron cargar los productos");
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    if (!store || !product || !startDate) {
      toast.warning("Por favor, completa todos los campos.");
      return;
    }

    setStatus("loading");

    if (simulate) {
      setTimeout(() => setStatus("success"), 2000);
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        "https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/predict/",
        {
          store_id: parseInt(store),
          product_name: product,
          n_days: days,
          start_date: startDate,
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

      toast.success("✅ Predicción generada con éxito.");
      console.log(response.data);
      setStatus("success");
    } catch (error) {
      toast.error("❌ Error al generar la predicción.");
      console.error(error);
      setStatus("form");
    }
  };

  const handleReset = () => {
    setStatus("form");
    setStore("");
    setProduct("");
    setStartDate("");
  };

  return (
    <div className={`relative ${className}`}>
      {/* Estado de carga */}
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#426CE5] text-white rounded-xl">
          <p className="text-lg font-semibold mb-6">Generando predicción</p>
          <div className="w-28 h-28 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Vista de éxito */}
      {status === "success" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-300 p-8 text-center">
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          >
            <X size={18} />
          </button>
          <h2 className="text-lg font-semibold text-black mb-4">
            ¡Predicción generada con éxito!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Tu predicción para <strong>{product}</strong> en la tienda{" "}
            <strong>{store}</strong>, correspondiente al período a partir del{" "}
            <strong>{startDate}</strong>, fue creada correctamente. El sistema
            analizó los datos y proyectó resultados relevantes.
          </p>
          <Link
            href="/dashboard/prediccion"
            className="bg-[#426CE5] hover:bg-[#375CC7] text-white text-sm font-semibold px-8 py-2.5 rounded-md"
          >
            Ver más
          </Link>
        </div>
      )}

      {/* Formulario */}
      <div
        className={`bg-white shadow-sm p-6 h-full border border-gray-200 rounded-xl ${
          status !== "form" ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-black">
              Generar una nueva predicción
            </h3>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Completá los datos y generá la predicción.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={store}
            onChange={(e) => setStore(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tienda</option>
            <option value="1">Tienda 1</option>
            <option value="2">Tienda 2</option>
          </select>

          <select
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Fecha</option>
            <option value="2025-04-06">6 de abril de 2025</option>
            <option value="2025-04-07">7 de abril de 2025</option>
          </select>

          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Producto</option>
            {products.length > 0 ? (
              products.map((prod, idx) => (
                <option key={idx} value={prod}>
                  {prod}
                </option>
              ))
            ) : (
              <option disabled>Cargando productos...</option>
            )}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={status !== "form"}
          className="mx-auto cursor-pointer block bg-[#426CE5] hover:bg-[#375CC7] text-white text-sm font-semibold px-14 py-2.5 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Generar
        </button>
      </div>
    </div>
  );
}
