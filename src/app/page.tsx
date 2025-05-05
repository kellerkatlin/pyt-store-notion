import AboutUs from "@/components/about-us";
import CategoryGrid from "@/components/category-grid";
// import FilterDrawer from "@/components/filter-drawer";
// import ProductList from "@/components/product-list";
import TopDeals from "@/components/top-deals";
// import BestSellers from "@/components/best-sellers";
import SustainabilityInfo from "@/components/sustainability-info";
import TestimonialSection from "@/components/testimonial-section";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <Hero />
      <CategoryGrid />

      {/* Sección Sobre Nosotros */}
      <AboutUs />

      {/* Sección de Ofertas Destacadas */}
      <TopDeals />

      {/* Sección de Más Vendidos */}
      {/* <BestSellers /> */}

      {/* Información de Sostenibilidad */}
      <SustainabilityInfo />

      {/* Sección de Productos Destacados */}
      {/* <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Productos Destacados</h2>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <FilterDrawer className="sticky top-24" />
          </div>
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="mb-6 flex items-center justify-between">
              <div className="md:hidden">
                <FilterDrawer />
              </div>
            </div>
            <ProductList />
          </div>
        </div>
      </div> */}

      {/* Testimonios de Clientes */}
      <TestimonialSection />
    </div>
  );
}
