import { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import ProductCard from "../../components/products/ProductCard";
import FloatingButton from "../../components/products/FloatingButton";
import useProducts from "../../hooks/useProducts";
import { ProductService } from "../../services/productService";

export default function ProductsScreen() {

  const {
    products,
    refresh,
    search,
    setSearch,
    category,
    setCategory,
    categories,
  } = useProducts();

  const router = useRouter();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const numColumns =
    width >= 1200
      ? 4
      : width >= 768
      ? 3
      : 2;

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
      >

        <TextInput
          placeholder="Search..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={[
            styles.search,
            isTablet && styles.searchTablet,
          ]}
        />

        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({ item }) => (

            <Pressable
              style={[
                styles.categoryChip,
                category === item &&
                  styles.categoryChipActive,
              ]}
              onPress={() =>
                setCategory(item)
              }
            >

              <Text
                style={[
                  styles.categoryText,
                  category === item &&
                    styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>

            </Pressable>

          )}
        />

        <FlatList
          data={products}
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={(item: any) =>
            item.id.toString()
          }
          columnWrapperStyle={
            numColumns > 1
              ? styles.column
              : undefined
          }
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (

            <ProductCard
              item={item}
              onPress={() =>
                router.push({
                  pathname: "/products/edit",
                  params: {
                    id: item.id,
                  },
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
          onPress={() =>
            router.push("/products/add")
          }
        />

      </View>

    </SafeAreaView>

  );

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  tabletContainer: {
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },

  search: {
    backgroundColor: "#fff",
    height: 48,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    elevation: 2,
    marginBottom: 12,
  },

  searchTablet: {
    height: 52,
    fontSize: 15,
  },

  categoryContainer: {
    paddingBottom: 12,
    paddingRight: 10,
  },

  categoryChip: {
    backgroundColor: "#ECEFF3",
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  categoryChipActive: {
    backgroundColor: "#19C37D",
  },

  categoryText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
  },

  categoryTextActive: {
    color: "#fff",
  },

  column: {
    justifyContent: "space-between",
  },

});