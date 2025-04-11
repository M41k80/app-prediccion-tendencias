import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
    return (
        <div className="flex justify-center items-center min-h-screen py-10 space-y-6">
            <div className="w-full max-w-4xl">
                <div>
                    <Link href="/">
                        <Button variant="ghost" className="gap-2 cursor-pointer">
                            <ArrowLeft size={16} />
                            Volver al inicio
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Política de Privacidad</CardTitle>
                        <CardDescription>Última actualización: 9 de abril de 2025</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold">1. Introducción</h2>
                            <p className="text-muted-foreground">
                                En ZionAI, respetamos su privacidad y nos comprometemos a proteger sus datos personales.
                                Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro
                                sitio web y le informará sobre sus derechos de privacidad y cómo la ley lo protege.
                            </p>
                        </section>

                        <Separator />

                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold">2. Datos que recopilamos</h2>
                            <p className="text-muted-foreground">
                                Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted, que
                                hemos agrupado de la siguiente manera:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Datos de identidad: nombre, apellido, nombre de usuario o identificador similar</li>
                                <li>Datos de contacto: dirección de correo electrónico</li>
                                <li>Datos técnicos: dirección IP, datos de inicio de sesión, tipo y versión del navegador</li>
                                <li>Datos de uso: información sobre cómo utiliza nuestro sitio web y servicios</li>
                            </ul>
                        </section>

                        <Separator />

                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold">3. Cómo utilizamos sus datos</h2>
                            <p className="text-muted-foreground">
                                Solo utilizaremos sus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos sus
                                datos personales en las siguientes circunstancias:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>
                                    Cuando necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado con usted
                                </li>
                                <li>
                                    Cuando sea necesario para nuestros intereses legítimos y sus intereses y derechos fundamentales no
                                    anulen esos intereses
                                </li>
                                <li>Cuando necesitemos cumplir con una obligación legal o regulatoria</li>
                            </ul>
                        </section>

                        <Separator />

                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold">4. Compartir sus datos personales</h2>
                            <p className="text-muted-foreground">
                                Podemos compartir sus datos personales con las partes que se indican a continuación para los fines
                                establecidos en esta política de privacidad:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Proveedores de servicios que proporcionan servicios de TI y administración de sistemas</li>
                                <li>Asesores profesionales, incluidos abogados, banqueros, auditores y aseguradores</li>
                                <li>Autoridades fiscales, reguladoras y otras autoridades</li>
                            </ul>
                        </section>

                        <Separator />

                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold">5. Sus derechos legales</h2>
                            <p className="text-muted-foreground">
                                En determinadas circunstancias, usted tiene derechos en virtud de las leyes de protección de datos en
                                relación con sus datos personales, que incluyen:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Solicitar acceso a sus datos personales</li>
                                <li>Solicitar la corrección de sus datos personales</li>
                                <li>Solicitar la eliminación de sus datos personales</li>
                                <li>Oponerse al procesamiento de sus datos personales</li>
                                <li>Solicitar la restricción del procesamiento de sus datos personales</li>
                                <li>Solicitar la transferencia de sus datos personales</li>
                                <li>Derecho a retirar el consentimiento</li>
                            </ul>
                        </section>

                        <Separator />

                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold">6. Contacto</h2>
                            <p className="text-muted-foreground">
                                Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, contáctenos
                                en:
                            </p>
                            <div className="bg-muted p-4 rounded-md">
                                <p className="font-medium">ZionAI</p>
                                <p className="text-muted-foreground">Email: soporte.zionai@gmail.com</p>
                                <p className="text-muted-foreground">Teléfono: +1 630 850 4588</p>
                                <p className="text-muted-foreground">Dirección: Enrique Segoviano 1234, La Vecindad</p>
                            </div>
                        </section>
                    </CardContent>
                </Card>

                <footer className="text-center text-sm text-muted-foreground pt-6 pb-10">
                    <p>© {new Date().getFullYear()} ZionAI. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    )
}
