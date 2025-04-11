import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TerminosPage() {
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
            <CardTitle className="text-3xl font-bold">Términos y Condiciones</CardTitle>
            <CardDescription>Última actualización: 9 de abril de 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">1. Aceptación de los términos</h2>
              <p className="text-muted-foreground">
                Al acceder y utilizar nuestra aplicación ZionAI "Sistema de Análisis Predictivo de Tendencias de Mercado", usted acepta cumplir con estos términos y condiciones de uso. Si no está de acuerdo con alguno de estos términos, le recomendamos que no utilice la Aplicación.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">2. Uso permitido</h2>
              <p className="text-muted-foreground">
              La Aplicación está destinada exclusivamente para uso personal y no comercial. Usted se compromete a utilizarla de manera legal y conforme a estos términos, absteniéndose de:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Reproducir, duplicar, copiar, vender o revender cualquier parte de la Aplicación sin autorización previa.</li>
                <li>Utilizar la Aplicación para fines ilegales o no autorizados.</li>
                <li>Acceder o intentar acceder a información no destinada a usted o violar la seguridad del sistema.</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">3. Registro y cuenta de usuario</h2>
              <p className="text-muted-foreground">
                Para acceder a ciertas funciones, puede requerirse la creación de una cuenta. Usted es responsable de mantener la confidencialidad de sus datos de acceso y de todas las actividades que ocurran bajo su cuenta. Nos reservamos el derecho de suspender o eliminar cuentas que infrinjan estos términos.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">4. Contenido y propiedad intelectual</h2>
              <p className="text-muted-foreground">
                Todos los contenidos de la Aplicación, incluyendo textos, gráficos, logotipos, iconos, imágenes y software, son propiedad de ZionAI o de sus licenciantes, y están protegidos por las leyes de propiedad intelectual. Usted no puede reproducir, distribuir ni modificar estos contenidos sin autorización expresa.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">5. Modificaciones del Servicio</h2>
              <p className="text-muted-foreground">
                Nos reservamos el derecho de modificar o interrumpir, temporal o permanentemente, la Aplicación o cualquier parte de ella con o sin previo aviso. No seremos responsables ante usted ni ante terceros por cualquier modificación, suspensión o interrupción del servicio.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">6. Limitación de responsabilidad</h2>
              <p className="text-muted-foreground">
                La Aplicación se proporciona “tal cual” y “según disponibilidad”. No garantizamos una experiencia libre de errores ni interrupciones o de errores. En ningún caso seremos responsables por daños directos, indirectos o consecuentes derivados del uso o imposibilidad del uso de la Aplicación.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">7. Enlaces a terceros</h2>
              <p className="text-muted-foreground">
                La Aplicación puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por ZionAI. No tenemos control sobre el contenido, políticas de privacidad o prácticas de dichos sitios y no asumimos responsabilidad por ellos.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">8. Cambios a los términos</h2>
              <p className="text-muted-foreground">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor una vez publicadas en esta pantalla. Se recomienda revisar esta sección regularmente para estar informado sobre cualquier cambio.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">9. Legislación aplicable</h2>
              <p className="text-muted-foreground">
                Estos términos se regirán e interpretarán de acuerdo con las leyes del país en el que operamos, sin perjuicio de cualquier disposición en contrario.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">10. Contacto</h2>
              <p className="text-muted-foreground">
                Si tiene preguntas sobre estos términos y condiciones, puede contactarnos en:
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
