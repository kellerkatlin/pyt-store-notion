"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Datos de productos más vendidos

export default function BestSellers() {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch("/api/products/");
      const data = await res.json();

      setProduct(data);
      console.log(data);
    }
    fetchProduct();
  }, []);
  return (
    <div className="my-16">
      <div className="mb-6 flex items-center">
        <TrendingUp className="mr-2 h-6 w-6 text-green-500" />
        <h2 className="text-2xl font-bold">Los Más Vendidos</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {product.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="overflow-hidden transition-all hover:border-green-500 hover:shadow-md">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.fotos[0] || "/placeholder.svg"}
                    alt={product.product}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <Badge variant="outline" className="bg-white/20 text-white">
                      {product.precio_oferta}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-1 text-sm font-medium text-gray-500">
                    {product.marca}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {product.product}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">
                      S/.{product.precio_oferta}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      S/.{product.precio_oferta}
                    </span>
                    <Badge className="ml-auto bg-green-500 text-white">
                      -{product.porcentaje}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/category/best-sellers"
          className="text-green-500 hover:underline"
        >
          Ver todos los más vendidos →
        </Link>
      </div>
    </div>
  );
}
