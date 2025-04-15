"use client"
import { useEffect, useState } from "react";
import InfoCard from "./InfoCard"; // Asegúrate de tener el componente InfoCard

interface TrendDataClientsProps {
    title: string;
    variableName: string; // En este caso, será "customer_prediction"
}

type PredictionData = {
    date: string;
    customer_prediction: number;
};

type DateRange = {
    from: Date;
    to: Date;
    date_requested: string;
}

const TrendDataClientPro = ({ title, variableName }: TrendDataClientsProps) => {
    const [averageCustomers, setAverageCustomers] = useState<string>("");

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
                console.log("Historial Data:", historialData); // Verifica la respuesta de la API

                const latestPrediction = historialData.sort(
                    (a: DateRange, b: DateRange) => new Date(b.date_requested).getTime() - new Date(a.date_requested).getTime()
                )[0]; // Obtener el último análisis

                if (latestPrediction) {
                    console.log("Última predicción:", latestPrediction); // Verifica la última predicción

                    // Extraemos las predicciones de clientes de todos los días de esa predicción
                    const predictions = latestPrediction.result.predictions as PredictionData[];

                    // Calculamos el promedio de las predicciones de clientes
                    const totalCustomers = predictions.reduce((acc, curr) => acc + curr.customer_prediction, 0);
                    const averageCustomersValue = totalCustomers / predictions.length;

                    // Redondeamos a un número entero
                    const roundedAverageCustomers = Math.round(averageCustomersValue);

                    if (roundedAverageCustomers) {
                        setAverageCustomers(roundedAverageCustomers.toString()); // Convertimos el número entero a string
                    } else {
                        console.error("No hay predicciones de clientes disponibles");
                        setAverageCustomers("No disponible");
                    }
                }
            } catch (error) {
                console.error("Error al cargar el último análisis", error);
                setAverageCustomers("Error al cargar");
            }
        };

        fetchLatestPrediction();
    }, [variableName]); // Dependencia de variableName para recalcular cuando cambia

    return (
        <InfoCard
            title={title}
            value={`${averageCustomers} clientes`} // Mostramos el promedio de clientes como un número entero
            subtitle={`En ${variableName}`}
        />
    );
};

export default TrendDataClientPro;
