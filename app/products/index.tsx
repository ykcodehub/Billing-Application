import { View, FlatList, TextInput, StyleSheet } from "react-native";
// import { router } from "expo-router";
import { useState } from "react";
import { useRouter } from "expo-router";

import ProductCard from "../../components/products/ProductCard";
import FloatingButton from "../../components/products/FloatingButton";
import useProducts from "../../hooks/useProducts";
import { ProductService } from "../../services/productService";

export default function ProductsScreen() {

  const { products, refresh } = useProducts();

  const [search, setSearch] = useState("");

  const router = useRouter();

  const filtered = products.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search Products..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filtered}
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
    onDelete={() => {
    ProductService.delete(item.id);
    refresh();
  }}
/>
        )}
      />

      <FloatingButton
        onPress={() => router.push("/products/add")}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    elevation: 2,
  },

});