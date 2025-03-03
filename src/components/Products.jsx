import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // console.log("📌 Products Data:", products);
  // if (products) {
  //   products.forEach((product, index) => {
  //     console.log(`🔹 Item ${index}:`, product);
  //   });
  // }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
