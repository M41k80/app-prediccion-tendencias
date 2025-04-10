"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { addDays, isBefore } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";


interface PredictionCardProps {
  className?: string;
}

type Producto = {
  ProductID: string;
  ProductName: string;
  Category: string;
}

type DateRange = {
  from: Date;
  to: Date;
};

export default function PredictionCard({
  className = "",
}: PredictionCardProps) {
  const [producto, setProducto] = useState<string>("");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [status, setStatus] = useState<"form" | "loading" | "success">("form");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  // eslint-disable-next-line 
  const [totalDays, setTotalDays] = useState<number>(7);
  const [tienda, setTienda] = useState<string>("");



  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: today,
    to: addDays(today, 7),
  });



  const calendarRef = React.useRef<HTMLDivElement>(null);
// eslint-disable-next-line 
  const simulate = true; // Cambiar a false para usar el endpoint real


  const tiendas = [
    "Walmart",
    "Sam's Club",
    "Costco",
    "Target",
    "Kroger",
    "Home Depot",
    "Lowe's",
    "CVS",
    "Walgreens",
    "Best Buy",
    "Macy's",
    "Sears",
    "JCPenney",
    "Nordstrom",
    "Whole Foods",
    "Trader Joe's",
    "Safeway",
    "Albertsons",
    "Lidl",
    "Aldi",
    "Publix",
    "Meijer",
    "Dollar General",
    "T.J. Maxx",
    "Marshalls",
    "Bed Bath & Beyond",
    "Petco",
    "Petsmart",
    "Michaels",
    "Hobby Lobby",
    "Bath & Body Works",
  ]

  const formatDateRange = () => {
    if (!dateRange?.from || !dateRange?.to) return "Seleccionar fechas";
    return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
      dateRange.to,
      "dd/MM/yyyy"
    )}`;
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("https://leisure-camcorder-acts-run.trycloudflare.com/products");
        const data = await response.json()
        setProductos(data.products)
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };
    fetchProductos();
  }, []);

  const handleSubmit = async () => {
    if (!tiendas || !producto || !dateRange?.from || !dateRange?.to) {
      toast.warning("Por favor, completa todos los campos.");
      return;
    }

    setStatus("loading");

    const storeIndex = tiendas.indexOf(tienda);
    if (storeIndex === -1) {
      toast.error("Tienda no válida.");
      setStatus("form");
      return;
    }

      const requestData = {
        store_id: storeIndex + 1, // Usamos el índice de la tienda para asignar un ID (1 basado)
        promo: Math.floor(Math.random() * 2), // Generamos aleatoriamente 0 o 1
        school_holiday: Math.floor(Math.random() * 2), // Generamos aleatoriamente 0 o 1
        n_days:
          Math.floor(
            (dateRange.to.getTime() - dateRange.from.getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1, // Número de días entre el rango
        start_date: format(dateRange.from, "yyyy-MM-dd"), // Fecha de inicio formateada
        store_type: "a", // Valor fijo
        assortment: "b", // Valor fijo
        state_holiday: "0", // Valor fijo
        product_name: producto, // Nombre del producto
        weather: Math.floor(Math.random() * 3) + 1, // Generamos un valor aleatorio entre 1 y 3
        sentiment_score: (Math.random() * 1).toFixed(2), // Generamos un valor aleatorio entre 0 y 1
      };

    try {
      // const token = localStorage.getItem("access_token");
      const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No token found in localStorage.");
        }
      const response = await fetch('https://a33b-2600-1008-a031-7483-a867-554-1fa-2eb9.ngrok-free.app/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      console.log("Predicción exitosa:", result);
      toast.success("✅ Predicción generada con éxito.");
      setStatus("success");
      window.location.reload()
      // Aquí podés hacer más cosas con response.data si lo necesitás
    } catch (error) {
      toast.error("❌ Error al generar la predicción.");
      console.error(error);
      setStatus("form");
    }
  };


  const handleReset = () => {
    setStatus("form");
    setTienda("");
    setProducto("");
    
  };

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const days =
        Math.floor(
          (dateRange.to.getTime() - dateRange.from.getTime()) /
          (1000 * 60 * 60 * 24)
        ) + 1;
      setTotalDays(days);
    }
  }, [dateRange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            Tu predicción para <strong>{producto}</strong> en la tienda{" "}
            <strong>{tienda}</strong>, correspondiente al período a partir del{" "}
            <strong>{format(dateRange.from, "yyyy-MM-dd")}</strong>, fue creada correctamente.
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
        className={`bg-white shadow-sm p-6 h-full border border-gray-200 rounded-xl ${status !== "form" ? "opacity-0 pointer-events-none" : ""
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

          <div className="space-y-2">

            <select
              value={tienda}
              onChange={(e) => setTienda(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar tienda</option>
              {tiendas.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2" ref={calendarRef}>
              
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>{formatDateRange()}</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>

              {isCalendarOpen && (
                <div className="absolute right-0 z-10 mt-1 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
                  <DayPicker
                    mode="range"
                    defaultMonth={today}
                    selected={dateRange}
                    onSelect={(range) => {
                      if (range) {
                        setDateRange(range as DateRange);
                      }
                    }}
                    numberOfMonths={2}
                    locale={es}
                    disabled={(date) => isBefore(date, today)}
                    modifiersClassNames={{
                      selected: "bg-[#426CE5] text-white rounded-md",
                      today: "bg-gray-100 font-bold rounded-md",
                    }}
                    styles={{
                      caption: { color: "#1e40af" },
                      day: { margin: "0.2em", borderRadius: "0.25rem" },
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <select
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Producto</option>
            {productos.length > 0 ? (
              productos.map((prod, idx) => (
                <option key={idx} value={prod.ProductName}>
                  {prod.ProductName}
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
