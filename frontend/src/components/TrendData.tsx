"use client"
import { useEffect, useState } from "react";
import InfoCard from "./InfoCard"; // Asegúrate de importar tu componente InfoCard

interface TrendDataProps {
    title: string;
    variableName: string; // Nombre de la variable destacada, como "clientes que van a comprar el producto"
}

type DateRange = {
    from: Date;
    to: Date;
    date_requested: string;
}

type PredictionData = {
    date: string;
    customer_prediction: number;
};

const TrendData = ({ title, variableName }: TrendDataProps) => {
    const [trendPercentage, setTrendPercentage] = useState<string>("");

    useEffect(() => {
        const fetchLatestPrediction = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    throw new Error("No token found in localStorage.");
                }

                const historialRes = await fetch("https://django-backend-g9yv.onrender.com/api/historial/", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!historialRes.ok) {
                    throw new Error("Error al obtener el historial de predicciones.");
                }

                const historialData = await historialRes.json();
                console.log("Historial Data:", historialData);

                const latestPrediction = historialData.sort(
                    (a: DateRange, b: DateRange) => new Date(b.date_requested).getTime() - new Date(a.date_requested).getTime()
                )[0]; // 
                if (latestPrediction) {
                    console.log("Última predicción:", latestPrediction);


                    const predictions = latestPrediction.result.predictions as PredictionData[];


                    const firstPrediction = predictions[0].customer_prediction;
                    const lastPrediction = predictions[predictions.length - 1].customer_prediction;

                    if (firstPrediction && lastPrediction) {
                        const trend = ((lastPrediction - firstPrediction) / firstPrediction) * 100;
                        console.log("Tendencia calculada:", trend); // Verifica el cálculo de la tendencia
                        setTrendPercentage(`${trend > 0 ? "+" : ""}${trend.toFixed(2)}%`);
                    } else {
                        console.error("Predicciones de clientes no disponibles");
                        setTrendPercentage("Datos no disponibles");
                    }
                }
            } catch (error) {
                console.error("Error al cargar el último análisis", error);
                setTrendPercentage("Error al cargar");
            }
        };

        fetchLatestPrediction();
    }, [variableName]);

    return (
        <InfoCard
            title={title}
            value={trendPercentage || "Cargando..."}
            subtitle={`En ${variableName}`}
        />
    );
};

export default TrendData;