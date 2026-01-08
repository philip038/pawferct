"use client";

import { useState } from "react";
import { products } from "./data/products";
import ProductCard from "./component/ProductCard";

const categories = [
  "all",
  "Soaps and Shampoos",
  "Toys and Accessories",
  "Fur Cats",
  "Fur Dogs",
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <main className="max-w-6xl mx-auto px-4 space-y-6">
      {/* CATEGORY BAR */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
