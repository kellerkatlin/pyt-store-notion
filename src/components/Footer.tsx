import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-12 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">P&T Store</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tecnología reacondicionada de calidad que es mejor para tu
              bolsillo y el planeta.
            </p>
            <div className="mt-4 flex items-center gap-2 text-green-500">
              <Leaf className="h-5 w-5" />
              <span className="font-medium">Each device saves ± 30kg CO₂</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Tienda</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/phones"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Celulares
                </Link>
              </li>
              <li>
                <Link
                  href="/products/laptops"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tablets"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Tablets
                </Link>
              </li>
              <li>
                <Link
                  href="/products/accesorios"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Sobre Nosotros</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Nuestra Historia
                </Link>
              </li>
              <li>
                <Link
                  href="/sostenibilidad"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Sostenibilidad
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Garantía
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Contactanos
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Envíos
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-green-500 dark:text-gray-400"
                >
                  Devoluciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
          <p>© {new Date().getFullYear()} P&T Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
