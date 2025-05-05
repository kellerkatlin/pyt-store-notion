import { Award, CheckCircle, Leaf, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="my-16">
      <h2 className="mb-6 text-2xl font-bold">¿Por qué elegir P&T Store?</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-100 transition-all hover:border-green-500 hover:shadow-md dark:border-green-900">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <ShieldCheck className="mb-4 h-12 w-12 text-green-500" />
            <h3 className="mb-2 text-lg font-semibold">Garantía de 6 meses</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Todos nuestros productos incluyen garantía completa para tu
              tranquilidad.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-100 transition-all hover:border-green-500 hover:shadow-md dark:border-green-900">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
            <h3 className="mb-2 text-lg font-semibold">100% Certificados</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cada dispositivo pasa por 40+ pruebas de calidad y rendimiento.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-100 transition-all hover:border-green-500 hover:shadow-md dark:border-green-900">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Leaf className="mb-4 h-12 w-12 text-green-500" />
            <h3 className="mb-2 text-lg font-semibold">Eco-Friendly</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cada dispositivo reacondicionado ahorra hasta 30kg de CO₂.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-100 transition-all hover:border-green-500 hover:shadow-md dark:border-green-900">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Award className="mb-4 h-12 w-12 text-green-500" />
            <h3 className="mb-2 text-lg font-semibold">Calidad Premium</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Dispositivos que lucen y funcionan como nuevos a una fracción del
              precio.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 rounded-xl bg-green-50 p-6 dark:bg-green-950/30">
        <h3 className="mb-3 text-xl font-semibold">Nuestra Misión</h3>
        <p className="text-gray-700 dark:text-gray-300">
          En P&T Store, nos dedicamos a ofrecer tecnología de alta calidad a
          precios accesibles mientras contribuimos a reducir los desechos
          electrónicos. Cada dispositivo que reacondicionamos significa un
          dispositivo menos en los vertederos y recursos naturales ahorrados.
          Creemos que la tecnología de calidad debería ser accesible para todos,
          sin comprometer nuestro planeta.
        </p>
      </div>
    </div>
  );
}
