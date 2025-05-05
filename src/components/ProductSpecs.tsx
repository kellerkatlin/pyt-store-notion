import {
  BatteryCharging,
  Cpu,
  HardDrive,
  Palette,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-green-200/40 bg-green-50/40 p-4 dark:border-green-900/50 dark:bg-green-950/30">
      <Icon className="mt-1 size-5 shrink-0 text-green-600 dark:text-green-400" />
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </p>
        <Badge
          variant="outline"
          className="mt-1 border-none bg-white/60 text-base font-semibold dark:bg-transparent"
        >
          {value}
        </Badge>
      </div>
    </div>
  );
}

export default function ProductSpecs({ p }: { p: Product }) {
  /* p == product */

  return (
    <>
      {/* GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SpecItem
          icon={HardDrive}
          label="Capacidad"
          value={`${p.capacidad} GB`}
        />
        <SpecItem icon={Palette} label="Color" value={p.color} />
        <SpecItem
          icon={BatteryCharging}
          label="Batería"
          value={`${p.bateria}%`}
        />
        <SpecItem icon={ShieldCheck} label="Garantía" value="6 meses" />
        <SpecItem icon={Cpu} label="Chip" value="A15 Bionic" />
        <SpecItem icon={Smartphone} label="Pantalla" value="6.1″ OLED" />
      </div>

      {/* TABLA de especificaciones opcional */}
      <div className="mt-8 border-t bg-white/60 p-4 dark:border-gray-700 dark:bg-gray-950/50">
        <h3 className="mb-3 text-lg font-semibold">
          Especificaciones técnicas
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 pr-3 text-left font-medium">
                Especificación
              </th>
              <th className="py-2 text-left font-medium">Detalle</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            <tr className="border-b border-gray-200/70 dark:border-gray-800">
              <td className="py-2 pr-3 font-medium">Resolución cámara</td>
              <td className="py-2">12 MP triple</td>
            </tr>
            <tr className="border-b border-gray-200/70 dark:border-gray-800">
              <td className="py-2 pr-3e font-medium">Conectividad</td>
              <td className="py-2">5G · Wi-Fi 6 · BT 5.0</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 font-medium">Incluye cargador</td>
              <td className="py-2">Sí (20 W USB-C)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
