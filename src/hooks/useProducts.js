import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../items/products";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};