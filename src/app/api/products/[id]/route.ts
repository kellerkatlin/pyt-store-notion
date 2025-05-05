import { NextResponse } from "next/server";
import { getProducts } from "@/lib/getDatabase";

export async function GET(
  request: Request,
  // 👇 params es ahora una Promise
  { params }: { params: Promise<{ id: string }> }
) {
  // 👇 hay que hacer await
  const { id } = await params;

  const allProducts = await getProducts();
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
