"use client"
import { useEffect, useState } from "react";
import InfoCard from "./InfoCard";

interface TrendDataClientsProps {
    title: string;
    variableName: string; // En este caso, será "sales_prediction"
}

type PredictionData = {
    date: string;
    sales_prediction: number;
};

type DateRange = {
    from: Date;
    to: Date;
    date_requested: string;
}

const TrendDataClients = ({ title, variableName }: TrendDataClientsProps) => {
    const [averageSales, setAverageSales] = useState<string>("");

    useEffect(() => {
        const fetchLatestPrediction = async () => {
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
                console.log("Historial Data:", historialData); // Verifica la respuesta de la API

                const latestPrediction = historialData.sort(
                    (a: DateRange, b: DateRange) => new Date(b.date_requested).getTime() - new Date(a.date_requested).getTime()
                )[0]; // Obtener el último análisis

                if (latestPrediction) {
                    console.log("Última predicción:", latestPrediction); // Verifica la última predicción

                    // Extraemos las predicciones de ventas de todos los días de esa predicción
                    const predictions = latestPrediction.result.predictions as PredictionData[];

                    // Calculamos el promedio de las predicciones de ventas
                    const totalSales = predictions.reduce((acc, curr) => acc + curr.sales_prediction, 0);
                    const averageSalesValue = totalSales / predictions.length;

                    const roundedAverageSales = Math.round(averageSalesValue);

                    if (roundedAverageSales) {
                        setAverageSales(roundedAverageSales.toString()); // Convertimos el número entero a string
                    } else {
                        console.error("No hay predicciones de ventas disponibles");
                        setAverageSales("No disponible");
                    }
                }
            } catch (error) {
                console.error("Error al cargar el último análisis", error);
                setAverageSales("Error al cargar");
            }
        };

        fetchLatestPrediction();
    }, [variableName]); // Dependencia de variableName para recalcular cuando cambia

    return (
        <InfoCard
            title={title}
            value={`${averageSales} unidades`} // Mostramos el promedio de ventas
            subtitle={`En ${variableName}`}
        />
    );
};

export default TrendDataClients;
