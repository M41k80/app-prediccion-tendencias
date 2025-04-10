import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LastPredictionProps {
    title: string;
    buttonText: string;
}
type DateRange = {
    from: Date;
    to: Date;
    date_requested: string;
  }


const LastPrediction = ({ title, buttonText }: LastPredictionProps) => {
    const [lastAnalysisDate, setLastAnalysisDate] = useState<string | null>(null);
    const router = useRouter();


    useEffect(() => {
        const fetchLastPredictionDate = async () => {
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

                // Ordenar las predicciones por la fecha más reciente
                const latestPrediction = historialData.sort(
                    (a: DateRange, b: DateRange) => new Date(b.date_requested).getTime() - new Date(a.date_requested).getTime()
                )[0];

                if (latestPrediction && latestPrediction.date_requested) {
                    setLastAnalysisDate(new Date(latestPrediction.date_requested).toLocaleDateString());
                } else {
                    setLastAnalysisDate("No se ha realizado ningún análisis.");
                }
            } catch (error) {
                console.error("Error al cargar el historial de predicciones:", error);
                setLastAnalysisDate("Error al conectar con el servidor.");
            }
        };

        fetchLastPredictionDate();
    }, []);

    const handleRedirect = () => {
        router.push("/dashboard/historial");
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
            <p className="text-gray-700 mb-4">
                {lastAnalysisDate ? `Realizado el ${lastAnalysisDate}` : "Cargando..."}
            </p>
            <button
                onClick={handleRedirect}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                {buttonText}
            </button>
        </div>
    );
};

export default LastPrediction;
