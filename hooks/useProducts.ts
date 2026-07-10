import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import { ProductService } from "../services/productService";

export default function useProducts() {

  const [products, setProducts] = useState<any[]>([]);

  const loadProducts = () => {
    setProducts(ProductService.getAll());
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  return {
    products,
    refresh: loadProducts,
  };
}