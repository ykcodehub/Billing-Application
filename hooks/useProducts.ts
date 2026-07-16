import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "expo-router";

import { ProductService } from "../services/productService";

export default function useProducts() {

  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("A-Z");

  const loadProducts = () => {
    setProducts(ProductService.getAll());
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const categories = useMemo(() => {

    const data = ProductService.getCategories();

    return [
      "All",
      ...data.map((x: any) => x.category),
    ];

  }, [products]);

  const filteredProducts = useMemo(() => {

    let list = [...products];

    //--------------------------------
    // Search
    //--------------------------------

    if (search.trim()) {

      const key = search.toLowerCase();

      list = list.filter((item: any) =>

        item.name?.toLowerCase().includes(key) ||

        item.category?.toLowerCase().includes(key) ||

        item.price?.toString().includes(key) ||

        item.stock?.toString().includes(key)

      );

    }

    //--------------------------------
    // Category
    //--------------------------------

    if (category !== "All") {

      list = list.filter(
        (item: any) =>
          item.category === category
      );

    }

    //--------------------------------
    // Sorting
    //--------------------------------

    switch (sortBy) {

      case "Price":

        list.sort(
          (a: any, b: any) =>
            a.price - b.price
        );

        break;

      case "Stock":

        list.sort(
          (a: any, b: any) =>
            b.stock - a.stock
        );

        break;

      default:

        list.sort(
          (a: any, b: any) =>
            a.name.localeCompare(b.name)
        );

    }

    return list;

  }, [
    products,
    search,
    category,
    sortBy,
  ]);

  return {

    products: filteredProducts,

    refresh: loadProducts,

    search,
    setSearch,

    category,
    setCategory,

    categories,

    sortBy,
    setSortBy,

  };

}