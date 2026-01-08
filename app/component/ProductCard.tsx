'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export type Product = {
  id: string;
  name: string;
  description: string[];
  images: string[];
  category: string;
  shopUrl: string;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const nextImage = () =>
    setCurrent((prev) => (prev + 1) % product.images.length);

  const prevImage = () =>
    setCurrent((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );

  return (
    <article className="border rounded-2xl bg-white p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition">
      {/* IMAGE */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden">
        <Image
          src={product.images[current]}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />

        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-2 py-1 text-sm"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-2 py-1 text-sm"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* CATEGORY */}
      <span className="text-xs text-gray-500 uppercase tracking-wide">
        {product.category}
      </span>

      {/* TITLE */}
      <h3 className="font-semibold text-base leading-snug">
        {product.name}
      </h3>

      {/* DESCRIPTION */}
      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
        {(expanded ? product.description : product.description.slice(0, 3)).map(
          (item, i) => (
            <li key={i}>{item}</li>
          )
        )}
      </ul>

      {product.description.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-600 w-fit"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}

      {/* ACTIONS */}
      <div className="mt-auto flex gap-2">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 border rounded-full py-2 text-sm text-center hover:bg-gray-100"
        >
          View details
        </Link>

        <a
          href={product.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-orange-500 text-white rounded-full py-2 text-sm text-center hover:bg-orange-600"
        >
          Shop now
        </a>
      </div>
    </article>
  );
}
