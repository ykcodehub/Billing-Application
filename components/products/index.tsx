import { View, FlatList } from "react-native";
import { router } from "expo-router";

import ProductCard from "../../components/products/ProductCard";
import FloatingButton from "../../components/products/FloatingButton";
import useProducts from "../../hooks/useProducts";

export default function ProductsScreen() {
  const { products } = useProducts();

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/products/edit",
                params: { id: item.id },
              })
            }
          />
        )}
      />

      <FloatingButton
        onPress={() => router.push("/products/add")}
      />
    </View>
  );
}