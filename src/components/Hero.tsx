import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="my-8 rounded-xl bg-gradient-to-r from-green-50 to-green-100 px-6 py-12 dark:from-green-950 dark:to-green-900 md:my-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          Ahorra hasta un <span className="text-green-500">70%</span> en
          tecnología reacondicionada certificada
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
          Dispositivos de calidad, minuciosamente probados, con garantía. Mejor
          para tu bolsillo y para el planeta.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/products/phones">
            <Button className="bg-green-500 px-8 py-6 text-lg hover:bg-green-600">
              Comprar smartphones
            </Button>
          </Link>
          <Link href="/products/laptops">
            <Button
              variant="outline"
              className="border-green-500 px-8 py-6 text-lg text-green-500 hover:bg-green-50 dark:hover:bg-green-950"
            >
              Ver laptops
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
