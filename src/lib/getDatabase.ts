import { notion } from "./notion";
import { Product } from "@/types/product"; // Asegúrate de tener este tipo creado
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type FileType = {
  type: "file";
  name: string;
  file: {
    url: string;
    expiry_time: string;
  };
};

type ExternalType = {
  type: "external";
  name: string;
  external: {
    url: string;
  };
};

type NotionFile = FileType | ExternalType;

export async function getProducts(): Promise<Product[]> {
  const databaseId = process.env.NOTION_DATABASE_ID!;

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map((page) => {
    const p = page as PageObjectResponse;
    const properties = p.properties;
    return {
      id: p.id,
      product:
        properties.product?.type === "title"
          ? properties.product.title[0]?.plain_text ?? "Sin nombre"
          : "Sin nombre",
      porcentaje:
        properties.porcentaje?.type === "number"
          ? properties.porcentaje.number ?? 0
          : 0,
      precio_oferta:
        properties.precio_oferta?.type === "number"
          ? properties.precio_oferta.number ?? 0
          : 0,
      precio:
        properties.precio?.type === "number"
          ? properties.precio.number ?? 0
          : 0,
      fotos:
        properties.fotos?.type === "files"
          ? (properties.fotos.files as NotionFile[]).map((f) =>
              f.type === "file" ? f.file.url : f.external.url
            )
          : [],

      categoria:
        properties.categoria?.type === "select"
          ? properties.categoria.select?.name ?? "Sin categoría"
          : "Sin categoría",
      marca:
        properties.marca?.type === "select"
          ? properties.marca.select?.name ?? "Sin marca"
          : "Sin marca",
      bateria:
        properties.bateria?.type === "number"
          ? properties.bateria.number ?? 0
          : 0,
      color:
        properties.color?.type === "select"
          ? properties.color.select?.name ?? "Sin color"
          : "Sin color",
      capacidad:
        properties.capacidad?.type === "select"
          ? properties.capacidad.select?.name?.replace("GB", "") ?? "0"
          : "0",
    };
  });
}
