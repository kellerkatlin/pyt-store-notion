import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
const testimonials = [
  {
    id: 1,
    name: "María García",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Compré un iPhone reacondicionado y está en perfectas condiciones. Parece nuevo y funciona perfectamente. El servicio al cliente fue excelente.",
    product: "iPhone 11 Pro",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Increíble relación calidad-precio. Mi MacBook Air funciona como nuevo y me ahorré más de 300€. Definitivamente volveré a comprar aquí.",
    product: "MacBook Air",
  },
  {
    id: 3,
    name: "Laura Martínez",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "El iPad que compré está en excelente estado. La batería dura todo el día y la pantalla está perfecta. Muy satisfecha con mi compra.",
    product: "iPad Pro",
  },
];

export default function TestimonialSection() {
  return (
    <div className="my-16">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Lo que dicen nuestros clientes
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="border-green-100 dark:border-green-900"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-1">
                <FaRegUserCircle className="size-6" />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mb-2 text-gray-700 dark:text-gray-300">
                &quot;{testimonial.text}&quot;
              </p>
              <p className="text-sm text-gray-500">
                Producto: {testimonial.product}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
