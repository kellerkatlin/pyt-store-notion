"use client";
import ProductList from "@/components/product-list";
import FilterDrawer from "@/components/filter-drawer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";

export default function SearchPage() {
  const [filtered, setFiltered] = useState<Product[]>([]);

  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const selectedBrands = searchParams
    .getAll("brand")
    .map((brand) => brand.toLowerCase());
  const selectedCapacities = searchParams
    .getAll("capacity")
    .map((cap) => cap.replace("GB", "").toLowerCase()); // Quita "GB"
  console.log(selectedCapacities);
  const min = parseInt(searchParams.get("min") ?? "0", 10);
  const max = parseInt(searchParams.get("max") ?? "5000", 10);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();

      let result = data;

      // Filtro por marcas
      if (selectedBrands.length > 0) {
        result = result.filter((p: Product) =>
          selectedBrands.includes(p.marca)
        );
      }

      // Filtro por capacidad
      if (selectedCapacities.length > 0) {
        result = result.filter((p: Product) =>
          selectedCapacities.includes(p.capacidad)
        );
      }

      // Filtro por precio
      result = result.filter(
        (p: Product) => p.precio_oferta >= min && p.precio_oferta <= max
      );

      // Ordenar por query si hay
      if (query) {
        result = result.sort((a: Product, b: Product) => {
          const aMatch = a.product.toLowerCase().includes(query);
          const bMatch = b.product.toLowerCase().includes(query);
          if (aMatch && !bMatch) return -1;
          if (!aMatch && bMatch) return 1;
          return 0;
        });
      }

      setFiltered(result);
    }

    fetchProducts();
  }, [selectedBrands, selectedCapacities, min, max, query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">
        Resultados para: <span className="text-green-600">{query}</span>
      </h1>
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <FilterDrawer className="sticky top-24" defaultCategory={"nada"} />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-6 flex items-center justify-between">
            <div className="md:hidden">
              <FilterDrawer defaultCategory={"nada"} />
            </div>
          </div>
          <ProductList products={filtered} />
        </div>
      </div>
    </div>
  );
}
