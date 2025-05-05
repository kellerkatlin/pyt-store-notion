"use client";

import ProductSpecs from "@/components/ProductSpecs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbnail,
} from "@/components/ui/carousel";
// import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Product } from "@/types/product";
import { PhoneIcon as WhatsappIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();

      setProduct(data);
      console.log(data);
      setLoading(false);
    }

    if (slug) fetchProduct();
  }, [slug]);

  const phoneNumber = "+51935064473";
  const productUrl = `https://tusitioweb.com/product/${product?.id}`; // Reemplaza con tu dominio real

  const message = `Hola, deseo el siguiente producto:\n${product?.product}\n${productUrl}`;
  const whatsappLink = `https://wa.me/${phoneNumber.replace(
    "+",
    ""
  )}?text=${encodeURIComponent(message)}`;

  if (loading) return <div>Cargando...</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left column - Product images */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.fotos.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.product} image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 pt-4">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>

            {/* Thumbnails inside the Carousel context */}
            <div className="mt-4 flex justify-center gap-2">
              {product.fotos.map((image, index) => (
                <CarouselThumbnail key={index} index={index}>
                  <div className="relative aspect-square h-16 w-16 overflow-hidden rounded-md border-2 border-transparent transition-all hover:border-green-500">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselThumbnail>
              ))}
            </div>
          </Carousel>
        </div>

        {/* Right column - Product details */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline">{product.marca}</Badge>
            </div>
            <h1 className="text-3xl font-bold">{product.product}</h1>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-green-500 text-white">
              -{product.porcentaje}%
            </Badge>
            <span className="text-3xl font-bold">
              S/.{product.precio_oferta}
            </span>
            <span className="text-lg text-gray-500 line-through">
              S/.{product.precio}
            </span>
          </div>

          <ProductSpecs p={product} />

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button
              className="mt-4 flex items-center gap-2 bg-green-500 hover:bg-green-600"
              size="lg"
            >
              <WhatsappIcon className="h-5 w-5" />
              Comprar por WhatsApp
            </Button>
          </a>

          <div className="mt-6">
            <h3 className="mb-4 text-xl font-semibold">Especificaciones</h3>
            {/* <Table>
              <TableBody>
                {Object.entries(product.fotos).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
          </div>
        </div>
      </div>

      {/* Mobile buy bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-white p-4 shadow-lg dark:bg-gray-950 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 line-through">
              S/.{product.precio_oferta}
            </div>
            <div className="text-xl font-bold">${product.precio}</div>
          </div>
          <Button className="bg-green-500 hover:bg-green-600" size="lg">
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
