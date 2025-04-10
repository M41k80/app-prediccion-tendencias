"use client";

import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { addDays, isBefore } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronDown, Check, Calendar as CalendarIcon } from "lucide-react";

type DateRange = {
  from: Date;
  to: Date;
};

type Producto = {
  ProductID: string;
  ProductName: string;
  Category: string;
};

export default function NuevaPrediccionPage() {
  const [loading, setLoading] = useState(false);
  const [tienda, setTienda] = useState<string>("");
  const [producto, setProducto] = useState<string>("");

  const [productos, setProductos] = useState<Producto[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [totalDays, setTotalDays] = useState<number>(7);
  

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: today,
    to: addDays(today, 7),
  });

  const [isTiendaOpen, setIsTiendaOpen] = useState(false);
  const [isProductoOpen, setIsProductoOpen] = useState(false);

  const calendarRef = React.useRef<HTMLDivElement>(null);
  const tiendaRef = React.useRef<HTMLDivElement>(null);
  const productoRef = React.useRef<HTMLDivElement>(null);

  const handleGenerar = async () => {
    setLoading(true);
    const storeIndex = tiendas.indexOf(tienda); // Encuentra el índice de la tienda seleccionada
    if (storeIndex === -1) return; // Si no se encuentra la tienda, evitar hacer la solicitud

    // Armar el cuerpo de la solicitud
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
      const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No token found in localStorage.");
        }
      const response = await fetch('https://a33b-2600-1008-a031-7483-a867-554-1fa-2eb9.ngrok-free.app/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Cambia tu token aquí
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("Predicción exitosa:", result);

      // Aquí puedes manejar la respuesta (mostrar en UI, etc.)
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // Mostrar error al usuario
    } finally {
      setLoading(false);
    }
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
  ];

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

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
      if (
        tiendaRef.current &&
        !tiendaRef.current.contains(event.target as Node)
      ) {
        setIsTiendaOpen(false);
      }
      if (
        productoRef.current &&
        !productoRef.current.contains(event.target as Node)
      ) {
        setIsProductoOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDateRange = () => {
    if (!dateRange.from) return "Seleccionar fecha";

    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
        dateRange.to,
        "dd/MM/yyyy"
      )} (${totalDays} días)`;
    }

    return format(dateRange.from, "dd/MM/yyyy");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Encabezado */}
        <header className="flex justify-between items-center mb-10 max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-black">
            Nueva predicción
          </h1>
          <Image
            src="/perfil.png"
            alt="Avatar del usuario"
            width={40}
            height={40}
            className="rounded-full"
          />
        </header>

        {/* Contenido principal */}
        <section className="bg-gray-100 rounded-2xl shadow p-10 max-w-5xl mx-auto min-h-[400px] flex items-center justify-center">
          {!loading ? (
            <div className="w-full">
              <div>
                <h2 className="text-lg font-semibold text-center text-black mb-2">
                  ¿Querés generar una nueva predicción?
                </h2>
                <p className="text-center text-sm text-gray-600 leading-snug mb-8 max-w-2xl mx-auto">
                  ¡Buenísimo! Acá te guiamos paso a paso para que lo hagas sin
                  complicaciones. Primero, seleccioná la tienda que querés
                  analizar. Después, elegí el rango de fechas que te interesa.
                  Podés predecir ventas de los próximos días, semanas o el
                  período que necesites. Por último, seleccioná el producto
                  sobre el cual querés obtener la predicción.
                </p>

                {/* Formularios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="space-y-2" ref={tiendaRef}>
                    <label className="block font-medium">Tienda</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsTiendaOpen(!isTiendaOpen)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {tienda || "Seleccionar tienda"}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>

                      {isTiendaOpen && (
                        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                          <ul className="max-h-60 overflow-auto py-1">
                            {tiendas.map((t) => (
                              <li
                                key={t}
                                onClick={() => {
                                  setTienda(t);
                                  setIsTiendaOpen(false);
                                }}
                                className="relative flex cursor-pointer select-none items-center px-3 py-2 text-sm hover:bg-blue-100"
                              >
                                {t}
                                {tienda === t && (
                                  <Check className="ml-auto h-4 w-4 text-[#426CE5]" />
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selector de Producto */}
                  <div className="space-y-2" ref={productoRef}>
                    <label className="block font-medium">Producto</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsProductoOpen(!isProductoOpen)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {producto || "Seleccionar producto"}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>

                      {isProductoOpen && (
                        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                          <ul className="max-h-60 overflow-auto py-1">
                            {Array.isArray(productos) &&
                              productos.map((p) => (
                                <li
                                  key={p.ProductID}
                                  onClick={() => {
                                    setProducto(p.ProductName);
                                    setIsProductoOpen(false);
                                  }}
                                  className="relative flex cursor-pointer select-none items-center px-3 py-2 text-sm hover:bg-blue-100"
                                >
                                  {p.ProductName}{" "}
                                  {/* Muestra el nombre del producto */}
                                  {producto === p.ProductName && (
                                    <Check className="ml-auto h-4 w-4 text-[#426CE5]" />
                                  )}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selector de Rango de Fechas */}
                  <div className="space-y-2" ref={calendarRef}>
                    <label className="block font-medium">
                      Rango de fechas para predicción
                    </label>
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
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={handleGenerar}
                  className="bg-[#426CE5] hover:bg-[#375CC7] text-white font-semibold text-sm px-8 py-2.5 rounded-md transition-colors cursor-pointer"
                >
                  Generar predicción
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <p className="text-lg font-semibold text-black">
                Generando predicción
              </p>
              <div className="w-28 h-28 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <button
                onClick={() => setLoading(false)}
                className="bg-[#426CE5] hover:bg-[#375CC7] text-white font-semibold text-sm px-8 py-2.5 rounded-md transition-colors cursor-pointer"
              >
                Volver atrás
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
