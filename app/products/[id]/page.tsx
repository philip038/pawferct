"use client";
import { useState } from "react";
import { products } from "../../data/products";
import ProductCard from "../../component/ProductCard";
import { notFound } from "next/navigation";

const categories = [
  "All",
  "Soaps and Shampoos",
  "Toys and Accessories",
  "Fur Cats",
  "Fur Dogs",
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      {/* CATEGORY BUTTONS */}
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeCategory === category
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="grid gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
