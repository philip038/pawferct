"use client";

import Image from "next/image";
import { useState } from "react";

type Product = {
  name: string;
  category: string;
  description: string[] | string;
  image?: string;
  images?: string[];
  shopeeUrl: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);

  const imageSrc =
    product.image && product.image.trim() !== ""
      ? product.image
      : product.images?.[0] && product.images[0].trim() !== ""
      ? product.images[0]
      : "/placeholder.png";

  const descriptionArray =
    Array.isArray(product.description)
      ? product.description
      : product.description
          .split("\n")
          .map((d) => d.trim())
          .filter(Boolean);

  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col">
      {/* IMAGE */}
      <div className="relative w-full h-48 mb-3">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-contain rounded-lg"
        />
      </div>

      {/* TITLE */}
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>

      {/* DESCRIPTION */}
      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1 mt-2">
        {(expanded ? descriptionArray : descriptionArray.slice(0, 3)).map(
          (item, i) => (
            <li key={i}>{item}</li>
          )
        )}
      </ul>

      {descriptionArray.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-blue-600 mt-2 self-start"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}

      {/* CTA */}
      <a
        href={product.shopeeUrl}
        target="_blank"
        className="mt-auto bg-orange-500 text-white text-center py-2 rounded-md text-sm"
      >
        Buy on Shopee
      </a>
    </div>
  );
}
