import { notion } from "./notion";
import { Product } from "@/types/product"; // Asegúrate de tener este tipo creado

export async function getProducts(): Promise<Product[]> {
  const databaseId = process.env.NOTION_DATABASE_ID!;

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map((page: any): Product => {
    const properties = page.properties;

    return {
      id: page.id,
      product: properties.product?.title?.[0]?.plain_text ?? "Sin nombre",
      porcentaje: properties.porcentaje?.number ?? 0,
      precio_oferta: properties.precio_oferta?.number ?? 0,
      precio: properties.precio?.number ?? 0,
      fotos:
        properties.fotos?.files?.map(
          (file: any) => file.file?.url ?? file.external?.url ?? ""
        ) ?? [],
      categoria: properties.categoria?.select?.name ?? "Sin categoría",
      marca: properties.marca?.select?.name ?? "Sin marca",
      bateria: properties.bateria?.number ?? 0,
      color: properties.color?.select?.name ?? "Sin color",
      capacidad: properties.capacidad?.select?.name?.replace("GB", "") ?? "0",
    };
  });
}
