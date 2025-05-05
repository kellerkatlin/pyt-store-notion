"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopDeals() {
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
        <Sparkles className="mr-2 h-6 w-6 text-green-500" />
        <h2 className="text-2xl font-bold">Ofertas Destacadas</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {product.map((deal) => (
          <Link key={deal.id} href={`/product/${deal.id}`}>
            <Card className="overflow-hidden transition-all hover:border-green-500 hover:shadow-md">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute left-4 top-4 z-10">
                    <Badge className="bg-green-500 text-white">Oferta</Badge>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={deal.fotos[0] || "/placeholder.svg"}
                      alt={deal.product}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-1 text-sm font-medium text-gray-500">
                    {deal.marca}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{deal.product}</h3>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">
                      S/.{deal.precio_oferta}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      S/.{deal.precio}
                    </span>
                    <Badge className="ml-auto bg-red-500 text-white">
                      -{deal.porcentaje}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href="/products/phone" className="text-green-500 hover:underline">
          Ver todas las ofertas →
        </Link>
      </div>
    </div>
  );
}
