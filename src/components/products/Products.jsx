import React from "react";
import { useProducts } from "../../hooks/useProducts";

export default function Products() {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <h2>Loading products...</h2>;
  }

  if (isError) {
    return <h2>Error: {error?.message}</h2>;
  }

  return (
    <div>
      <h1>Products</h1>

      {products?.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>ID: {product.id}</p>
        </div>
      ))}
    </div>
  );
}