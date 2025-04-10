import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // dias
        const totalDays = request.headers.get("X-Total-Days");

        // datos
        const body = await request.json();

        // TODO: AQUI VA A IR LA LOGICA DEL BACKEND
        console.log("Datos recibidos:", body);
        console.log("Total de días:", totalDays);

        // TODO: Simulación de respuesta
        return NextResponse.json({
            success: true,
            message: `Predicción generada para ${totalDays} días`,
            data: {
                ...body,
                totalDays,
                prediccion: {
                    valores: Array.from({ length: Number(totalDays) }, () =>
                        Math.floor(Math.random() * 1000)
                    ),
                },
            },
        });
    } catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json(
            { error: "Error al procesar la solicitud" },
            { status: 500 }
        );
    }
}
