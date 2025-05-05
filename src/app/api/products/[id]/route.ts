// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/getDatabase";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const allProducts = await getProducts();
  const product = allProducts.find((p) => p.id === params.id);

  if (!product) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
