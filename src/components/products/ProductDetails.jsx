import React from "react";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../../hooks/useProductDetails";

export default function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useProductDetails(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error: {error?.message}</h2>;
  }

  return (
    <div>
      <h1>Product Details</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}