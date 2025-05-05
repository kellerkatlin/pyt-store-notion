"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterDrawerProps {
  className?: string;
  defaultCategory?: string;
}

// Mock filter data
const filters = {
  brand: ["Apple", "Samsung", "Google", "Dell", "Lenovo", "HP"],
  category: ["Phones", "Laptops", "Tablets", "Accessories"],
  capacity: ["64GB", "128GB", "256GB", "512GB", "1TB"],
  color: ["Black", "White", "Silver", "Gold", "Blue", "Red"],
  condition: ["Excellent", "Good", "Fair"],
};

export default function FilterDrawer({
  className,
  defaultCategory,
}: FilterDrawerProps) {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    brand: [],
    category: defaultCategory ? [defaultCategory] : [],
    capacity: [],
    color: [],
    condition: [],
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const updatedFilters: Record<string, string[]> = {
      brand: params.getAll("brand"),
      capacity: params.getAll("capacity"),
      category: params.getAll("category"),
      color: params.getAll("color"),
      condition: params.getAll("condition"),
    };
    setSelectedFilters((prev) => ({ ...prev, ...updatedFilters }));
  }, []);

  // Actualizar los filtros cuando cambia la categoría por defecto
  // useEffect(() => {
  //   if (defaultCategory) {
  //     setSelectedFilters((prev) => ({
  //       ...prev,
  //       category: [defaultCategory],
  //     }));
  //   }
  // }, [defaultCategory]);

  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilters((prev) => {
      const updated = new Set(prev[type]);
      if (updated.has(value)) {
        updated.delete(value);
      } else {
        updated.add(value);
      }

      const query = new URLSearchParams();

      Object.entries({ ...prev, [type]: Array.from(updated) }).forEach(
        ([key, values]) => {
          values.forEach((v) => query.append(key, v));
        }
      );

      router.push(`/search?${query.toString()}`);

      return {
        ...prev,
        [type]: Array.from(updated),
      };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      brand: [],
      category: defaultCategory ? [defaultCategory] : [],
      capacity: [],
      color: [],
      condition: [],
    });
    setPriceRange([0, 2000]);

    const query = new URLSearchParams();
    if (defaultCategory) {
      query.append("category", defaultCategory);
    }
    router.push(`/search?${query.toString()}`);
  };

  useEffect(() => {
    const min = parseInt(searchParams.get("min") || "0", 10);
    const max = parseInt(searchParams.get("max") || "2000", 10);
    setPriceRange([min, max]);
  }, [searchParams]);

  // Calcular el número de resultados (simulado)
  const resultCount =
    42 - selectedFilters.brand.length * 3 - selectedFilters.color.length * 2;

  // Para desktop sidebar
  const FilterContent = () => (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Restablecer
        </Button>
      </div>

      <div className="mb-6">
        <Label className="mb-2 block">Rango de Precio</Label>
        <Slider
          value={priceRange}
          max={5000}
          step={50}
          onValueChange={(range) => {
            setPriceRange(range);

            const query = new URLSearchParams(window.location.search);

            query.set("min", String(range[0]));
            query.set("max", String(range[1]));

            Object.entries(selectedFilters).forEach(([key, values]) => {
              values.forEach((v) => query.append(key, v));
            });

            router.push(`/search?${query.toString()}`);
          }}
          className="py-4"
        />

        <div className="mt-2 flex items-center justify-between">
          <span>S/.{priceRange[0]}</span>
          <span>S/.{priceRange[1]}</span>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["brand", "condition"]}>
        {Object.entries(filters).map(([key, values]) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger className="py-3 capitalize">
              {key}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 py-2">
                {values.map((value) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`${key}-${value}`}
                      checked={selectedFilters.brand.includes(value)}
                      onCheckedChange={() => handleFilterChange(key, value)}
                    />
                    <Label
                      htmlFor={`${key}-${value}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6 text-sm text-gray-500">
        <span>{resultCount > 0 ? resultCount : 0} resultados</span>
      </div>
    </div>
  );

  // Para mobile drawer
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <FilterContent />
      </div>

      {/* Mobile drawer */}
      <div className="md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filtros</DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <div className="mb-6">
                <Label className="mb-2 block">Rango de Precio</Label>
                <Slider
                  value={priceRange}
                  max={5000}
                  step={50}
                  onValueChange={(range) => {
                    setPriceRange(range);

                    const query = new URLSearchParams(window.location.search);

                    query.set("min", String(range[0]));
                    query.set("max", String(range[1]));

                    Object.entries(selectedFilters).forEach(([key, values]) => {
                      values.forEach((v) => query.append(key, v));
                    });

                    router.push(`/search?${query.toString()}`);
                  }}
                  className="py-4"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span>S/.{priceRange[0]}</span>
                  <span>S/.{priceRange[1]}</span>
                </div>
              </div>

              <Accordion type="multiple" defaultValue={["brand", "condition"]}>
                {Object.entries(filters).map(([key, values]) => (
                  <AccordionItem key={key} value={key}>
                    <AccordionTrigger className="py-3 capitalize">
                      {key}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 py-2">
                        {values.map((value) => (
                          <div key={value} className="flex items-center gap-2">
                            <Checkbox
                              id={`mobile-${key}-${value}`}
                              checked={searchParams
                                .getAll("brand")
                                .includes(value)}
                              onCheckedChange={() =>
                                handleFilterChange(key, value)
                              }
                            />
                            <Label
                              htmlFor={`mobile-${key}-${value}`}
                              className="cursor-pointer text-sm font-normal"
                            >
                              {value}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6 text-sm text-gray-500">
                <span>{resultCount > 0 ? resultCount : 0} resultados</span>
              </div>
            </div>
            <DrawerFooter>
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={() => setOpen(false)}
              >
                Aplicar Filtros
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={resetFilters}>
                  Restablecer
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
