"use client";

import { useState } from "react";
import ProductCard from "@/app/component/ProductCard";

const CATEGORIES = [
  "Soaps and Shampoos",
  "Toys and Accessories",
  "Fur Cats",
  "Fur Dogs",
];

export default function AddProductForm() {
  const [product, setProduct] = useState({
    id: Date.now(),
    name: "",
    category: "",
    description: "",
    images: [] as string[],
    shopeeUrl: "",
  });

  const safeImages =
    product.images.length > 0 && product.images[0].trim() !== ""
      ? product.images
      : ["/placeholder.png"];

  const previewProduct = {
    ...product,
    description: product.description
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean),
    images: safeImages,
  };

  const codeOutput = `{
  id: ${product.id},
  name: "${product.name}",
  category: "${product.category}",
  description: \`${product.description}\`,
  images: ${JSON.stringify(safeImages, null, 2)},
  shopeeUrl: "${product.shopeeUrl}",
},`;

  return (
    <div className="space-y-10">
      {/* FORM */}
      <div className="space-y-4">
        <input
          placeholder="Product name"
          className="w-full border rounded px-3 py-2"
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />

        <select
          className="w-full border rounded px-3 py-2"
          value={product.category}
          onChange={(e) =>
            setProduct({ ...product, category: e.target.value })
          }
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description (each line = bullet)"
          rows={5}
          className="w-full border rounded px-3 py-2"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        <textarea
          placeholder="Image URLs (one per line)"
          rows={4}
          className="w-full border rounded px-3 py-2"
          onChange={(e) =>
            setProduct({
              ...product,
              images: e.target.value
                .split("\n")
                .map((i) => i.trim())
                .filter(Boolean),
            })
          }
        />

        <input
          placeholder="Shopee affiliate URL"
          className="w-full border rounded px-3 py-2"
          value={product.shopeeUrl}
          onChange={(e) =>
            setProduct({ ...product, shopeeUrl: e.target.value })
          }
        />
      </div>

      {/* LIVE PREVIEW */}
      <div>
        <h3 className="font-semibold mb-2">Live Preview</h3>
        {product.name && product.category && product.shopeeUrl && (
          <ProductCard product={previewProduct as any} />
        )}
      </div>

      {/* CODE OUTPUT */}
      <div>
        <h3 className="font-semibold mb-2">Copy into products.ts</h3>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {codeOutput}
        </pre>
      </div>
    </div>
  );
}