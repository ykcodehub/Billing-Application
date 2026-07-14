import { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import ProductCard from "../../components/products/ProductCard";
import FloatingButton from "../../components/products/FloatingButton";
import useProducts from "../../hooks/useProducts";
import { ProductService } from "../../services/productService";

export default function ProductsScreen() {
  const { products, refresh } = useProducts();

  const [search, setSearch] = useState("");

  const router = useRouter();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const filtered = products.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
      >
        <TextInput
          placeholder="Search Products..."
          value={search}
          onChangeText={setSearch}
          style={[
            styles.search,
            isTablet && styles.searchTablet,
          ]}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  tabletContainer: {
    width: "70%",
    alignSelf: "center",
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 55,
    marginBottom: 16,
    elevation: 2,
    fontSize: 16,
  },

  searchTablet: {
    height: 60,
    fontSize: 18,
  },
});