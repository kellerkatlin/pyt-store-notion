import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Phone, Smartphone, Tablet } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    href: "/category/phones",
  },
  {
    name: "Laptops",
    icon: Laptop,
    href: "/category/laptops",
  },
  {
    name: "Tablets",
    icon: Tablet,
    href: "/category/tablets",
  },
  {
    name: "Accesorios",
    icon: Phone,
    href: "/category/accessories",
  },
];

export default function CategoryGrid() {
  return (
    <div className="my-12">
      <h2 className="mb-6 text-2xl font-bold">Categorías</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="transition-all hover:border-green-500 hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <category.icon className="mb-4 h-12 w-12 text-green-500" />
                <span className="text-lg font-medium">{category.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
