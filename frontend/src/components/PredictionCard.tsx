"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"

interface PredictionCardProps {
  className?: string
}

export default function PredictionCard({ className = "" }: PredictionCardProps) {
  const [store, setStore] = useState("")
  const [product, setProduct] = useState("")
  const [startDate, setStartDate] = useState("")
  const [days] = useState(7)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<string[]>([])
  const [dates] = useState([
    { label: "Próximos 3 días", value: "2025-04-10" },
    { label: "Próximos 5 días", value: "2025-04-12" },
    { label: "Próximos 7 días", value: "2025-04-14" }
  ])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://extension-rental-freeze-blow.trycloudflare.com/products")
        setProducts(res.data)
      } catch (error) {
        console.error("Error al cargar productos", error)
        toast.error("No se pudieron cargar los productos")
      }
    }

    fetchProducts()
  }, [])

  const handleSubmit = async () => {
    if (!store || !product || !startDate) {
      toast.warning("Por favor, completa todos los campos.")
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem("access_token")

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
      )

      toast.success("✅ Predicción generada con éxito.")
      console.log(response.data)
    } catch (error) {
      toast.error("❌ Error al generar la predicción.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`bg-white shadow-sm p-6 h-full border border-gray-200 rounded-xl ${className}`}>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-black">Generar una nueva predicción</h3>
          <p className="text-sm text-gray-500 font-medium mt-1">Completa los datos y generá la predicción.</p>
        </div>

        {loading && (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Selectores */}
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
          {dates.map((date, index) => (
            <option key={index} value={date.value}>{date.label}</option>
          ))}
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

      {/* Botón */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mx-auto block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-16 py-2.5 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Generando..." : "Generar"}
      </button>
    </div>
  )
}
