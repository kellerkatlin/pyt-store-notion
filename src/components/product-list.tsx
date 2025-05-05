import ProductCard from "@/components/product-card";
import { Product } from "@/types/product";

interface ProductListProps {
  category?: string;
  limit?: number;
  loading?: boolean;
  products?: Product[];
}

export default function ProductList({ loading, products }: ProductListProps) {
  let content;

  if (loading) {
    content = (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="text-gray-500">Cargando productos...</p>
      </div>
    );
  } else if (products?.length === 0) {
    content = (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="text-gray-500">
          No se encontraron productos en esta categoría.
        </p>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return <>{content}</>;
}
