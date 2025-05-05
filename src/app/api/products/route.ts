// app/api/products/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/getDatabase";

export async function GET() {
  try {
    const products = await getProducts(); // 👈 reutilizas lógica
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}
