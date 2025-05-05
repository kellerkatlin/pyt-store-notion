"use client";
import FilterDrawer from "@/components/filter-drawer";
import ProductList from "@/components/product-list";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();

        const result =
          slug === "Todos"
            ? data
            : data.filter(
                (p: Product) =>
                  p.categoria?.toLowerCase() === slug.toLowerCase()
              );

        setFiltered(result);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <FilterDrawer className="sticky top-24" defaultCategory={slug} />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-6 flex items-center justify-between">
            <div className="md:hidden">
              <FilterDrawer defaultCategory={slug} />
            </div>
          </div>
          <ProductList loading={loading} products={filtered} category={slug} />
        </div>
      </div>
    </div>
  );
}
