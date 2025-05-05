import { Leaf, Recycle, Zap } from "lucide-react";

export default function SustainabilityInfo() {
  return (
    <div className="my-16 rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-8 dark:from-green-950 dark:to-green-900">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Tecnología Sostenible
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-green-100 p-4 dark:bg-green-800">
            <Leaf className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Reducción de CO₂</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Cada dispositivo reacondicionado ahorra hasta 30kg de emisiones de
            CO₂ comparado con uno nuevo.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-green-100 p-4 dark:bg-green-800">
            <Recycle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Menos Residuos</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Contribuimos a reducir los 50 millones de toneladas de residuos
            electrónicos generados anualmente.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-green-100 p-4 dark:bg-green-800">
            <Zap className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Ahorro Energético</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Extender la vida útil de un dispositivo ahorra el 85% de la energía
            necesaria para fabricar uno nuevo.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="mb-2 text-xl font-bold">
          <span className="text-green-500">+10,000</span> dispositivos
          reacondicionados
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Juntos estamos haciendo la diferencia para nuestro planeta.
        </p>
      </div>
    </div>
  );
}
