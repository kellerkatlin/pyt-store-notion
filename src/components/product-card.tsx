"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  console.log(product);
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:border-green-500 hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {product.fotos.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={image}
                        alt={`${product.product} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="p-4">
            <div className="mb-1 text-sm font-medium text-gray-500">
              {product.marca}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{product.product}</h3>

            <div className="mb-3 flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                {product.capacidad} GB
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.color}
              </Badge>
              <Badge variant="outline" className="text-xs">
                buena
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.bateria}%
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">
                S/.{product.precio_oferta}
              </span>
              <span className="text-sm text-gray-500 line-through">
                S/.{product.precio}
              </span>
              <Badge className="ml-auto bg-green-500 text-white">
                -{product.porcentaje}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
