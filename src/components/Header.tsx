"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function Header() {
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [highlighted, setHighlighted] = useState<Product[]>([]);
  const triggerRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setAllProducts(data);
      if (Array.isArray(data)) {
        const top3 = data.slice(0, 3);
        setHighlighted(top3);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (search.length > 1) {
      const filtered = allProducts
        .filter((p) => p.product.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 3);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [search, allProducts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setIsSearchOpen(false);
      setSuggestions([]);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center ">
          <Image
            src={"/pytstorelogo.png"}
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>

        {/* Desktop Search */}
        <form
          ref={triggerRef}
          onSubmit={handleSubmit}
          className="hidden relative  flex-1 px-8 md:block md:max-w-md lg:max-w-xl"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              value={search}
              onFocus={() => {
                if (search.trim() === "") {
                  setSuggestions(highlighted);
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por productos..."
              className="w-sm pl-10"
            />
          </div>
          {suggestions.length > 0 && (
            <div className="absolute z-50 mt-1 w-sm rounded-md border bg-white shadow-md">
              {suggestions.map((item) => (
                <Link
                  key={item.product}
                  href={`/product/${item.id}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {item.product}
                </Link>
              ))}
            </div>
          )}
        </form>

        {/* Mobile Search Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onFocus={() => {
            if (search.trim() === "") {
              setSuggestions(highlighted);
            }
          }}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Buscar</span>
        </Button>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Menú móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-64 bg-white dark:bg-gray-950"
            >
              <nav className="flex flex-col items-start gap-6 pt-10 px-6">
                <Link
                  href="/"
                  className="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  🏠 Inicio
                </Link>
                <Link
                  href="/products/phones"
                  className="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  📱 Phones
                </Link>
                <Link
                  href="/products/laptops"
                  className="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  💻 Laptops
                </Link>
                <Link
                  href="/products/tablets"
                  className="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  📱 Tablets
                </Link>
                <Link
                  href="/products/accessories"
                  className="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  🎧 Accessories
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar (Expanded) */}
      {isSearchOpen && (
        <form
          ref={triggerRef}
          onSubmit={handleSubmit}
          className="border-t p-4 md:hidden"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por productos..."
              className="w-full pl-10"
              autoFocus
            />
          </div>
          {suggestions.length > 0 && (
            <div className="mt-2 rounded-md border bg-white shadow-md">
              {suggestions.map((item) => (
                <Link
                  key={item.product}
                  href={`/product/${item.id}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setIsSearchOpen(false)} // para cerrar al hacer click
                >
                  {item.product}
                </Link>
              ))}
            </div>
          )}
        </form>
      )}
    </header>
  );
}
