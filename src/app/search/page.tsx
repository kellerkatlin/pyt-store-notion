import SearchClient from "@/components/SearchClient";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchClient />
    </Suspense>
  );
}
