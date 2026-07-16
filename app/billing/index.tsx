import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useMemo, useState } from "react";

import useProducts from "../../hooks/useProducts";
import useCart from "../../hooks/useCart";

export default function BillingScreen() {

  const {
    products,
    search,
    setSearch,
    category,
    setCategory,
    categories,
    sortBy,
    setSortBy,
  } = useProducts();

  const {
    cart,
    total,
    addItem,
    increase,
    decrease,
  } = useCart();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const numColumns =
    width >= 1100
      ? 4
      : width >= 768
      ? 3
      : 2;

  const [filterVisible, setFilterVisible] =
    useState(false);

  function checkout() {

    if (!cart.length) return;

    router.push({
      pathname: "/billing/checkout",
      params: {
        cart: JSON.stringify(cart),
        total: total.toString(),
      },
    });

  }

  const renderProduct = ({ item }: any) => (

    <Pressable
      style={styles.productCard}
      android_ripple={{ color: "#f1f5f9" }}
      onPress={() => addItem(item)}
    >

      {

        item.image ? (

          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="cover"
          />

        ) : (

          <View
            style={[
              styles.productImage,
              styles.imagePlaceholder,
            ]}
          >

            <Text
              style={styles.placeholderIcon}
            >
              📦
            </Text>

          </View>

        )

      }

      {

        item.category ? (

          <View style={styles.categoryBadge}>

            <Text
              numberOfLines={1}
              style={styles.categoryBadgeText}
            >
              {item.category}
            </Text>

          </View>

        ) : null

      }

      <Text
        numberOfLines={2}
        style={styles.productName}
      >
        {item.name}
      </Text>

      <Text style={styles.productPrice}>
        ₹ {item.price}
      </Text>

    </Pressable>

  );

  return (

  <SafeAreaView style={{ flex: 1 }}>

    <View
      style={[
        styles.container,
        isTablet && styles.tabletContainer,
      ]}
    >

      <Text style={styles.title}>
        Billing
      </Text>

      {/* Search + Filter */}

      <View style={styles.searchRow}>

        <TextInput
          placeholder="Search..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        <Pressable
          style={styles.filterButton}
          onPress={() =>
            setFilterVisible(!filterVisible)
          }
        >
          <Text style={styles.filterIcon}>
            ☰
          </Text>
        </Pressable>

      </View>

      {/* Filter Panel */}

      {

        filterVisible && (

          <View style={styles.filterCard}>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                styles.categoryContainer
              }
            >

              {

                categories.map((item: string) => (

                  <Pressable
                    key={item}
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

                ))

              }

            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                styles.sortContainer
              }
            >

              {

                ["A-Z", "Price", "Stock"].map(
                  (item) => (

                    <Pressable
                      key={item}
                      style={[
                        styles.sortChip,
                        sortBy === item &&
                          styles.sortChipActive,
                      ]}
                      onPress={() =>
                        setSortBy(item)
                      }
                    >

                      <Text
                        style={[
                          styles.sortText,
                          sortBy === item &&
                            styles.sortTextActive,
                        ]}
                      >
                        {item}
                      </Text>

                    </Pressable>

                  )

                )

              }

            </ScrollView>

          </View>

        )

      }

      {/* Products */}

      <FlatList
        data={products}
        key={numColumns}
        numColumns={numColumns}
        renderItem={renderProduct}
        keyExtractor={(item: any) =>
          item.id.toString()
        }
        columnWrapperStyle={
          numColumns > 1
            ? styles.column
            : undefined
        }
        contentContainerStyle={{
          paddingBottom:
            cart.length > 0
              ? 240
              : 20,
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* Cart */}

      {

        cart.length > 0 && (

          <View
  style={[
    styles.cart,
    isTablet && styles.cartTablet,
  ]}
>

  <View style={styles.cartHeader}>

    <Text style={styles.heading}>
      🛒 Cart ({cart.length})
    </Text>

    <Text style={styles.total}>
      ₹ {total.toFixed(2)}
    </Text>

  </View>

  <FlatList
    data={cart}
    keyExtractor={(item: any) =>
      item.id.toString()
    }
    scrollEnabled={cart.length > 3}
    style={{ maxHeight: 180 }}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (

      <View style={styles.row}>

        <View style={{ flex: 1 }}>

          <Text
            numberOfLines={1}
            style={styles.itemName}
          >
            {item.name}
          </Text>

          <Text style={styles.itemPrice}>
            ₹ {item.price}
          </Text>

        </View>

        <View style={styles.qtyBox}>

          <Pressable
            style={styles.circleButton}
            onPress={() =>
              decrease(item.id)
            }
          >

            <Text
              style={styles.buttonText}
            >
              −
            </Text>

          </Pressable>

          <Text style={styles.qty}>
            {item.qty}
          </Text>

          <Pressable
            style={styles.circleButton}
            onPress={() =>
              increase(item.id)
            }
          >

            <Text
              style={styles.buttonText}
            >
              +
            </Text>

          </Pressable>

        </View>

      </View>

    )}
  />

  <Pressable
    style={styles.checkout}
    onPress={checkout}
  >

    <Text
      style={styles.checkoutText}
    >
      Checkout
    </Text>

  </Pressable>

</View>

        )

      }

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

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
    marginBottom: 14,
  },

  /* ---------------- Search ---------------- */

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  search: {
    flex: 1,
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    elevation: 3,
  },

  filterButton: {
    width: 46,
    height: 46,
    marginLeft: 10,
    borderRadius: 14,
    backgroundColor: "#19C37D",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  filterIcon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  /* ---------------- Filter ---------------- */

  filterCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 12,
    marginBottom: 14,
    elevation: 3,
  },

  categoryContainer: {
    paddingHorizontal: 12,
  },

  sortContainer: {
    paddingHorizontal: 12,
    marginTop: 10,
  },

  categoryChip: {
    backgroundColor: "#EEF2F6",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  categoryChipActive: {
    backgroundColor: "#19C37D",
  },

  categoryText: {
    color: "#555",
    fontWeight: "700",
    fontSize: 13,
  },

  categoryTextActive: {
    color: "#fff",
  },

  sortChip: {
    backgroundColor: "#EEF2F6",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  sortChipActive: {
    backgroundColor: "#111",
  },

  sortText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
  },

  sortTextActive: {
    color: "#fff",
  },

  /* ---------------- Products ---------------- */

  column: {
    justifyContent: "space-between",
  },

  productCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 10,
    marginHorizontal: 4,
    padding: 10,
    elevation: 2,
  },

  productImage: {
    width: "100%",
    height: 110,
    borderRadius: 12,
    backgroundColor: "#ECECEC",
  },

  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderIcon: {
    fontSize: 34,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 8,
  },

  categoryBadgeText: {
    fontSize: 11,
    color: "#555",
    fontWeight: "700",
  },

  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    minHeight: 34,
  },

  productPrice: {
    marginTop: 4,
    fontSize: 18,
    color: "#19C37D",
    fontWeight: "800",
  },

  /* ---------------- Cart ---------------- */

  cart: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    elevation: 12,
  },

  cartTablet: {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    left: undefined,
    right: undefined,
  },

  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  heading: {
    fontSize: 19,
    fontWeight: "800",
    color: "#111",
  },

  total: {
    fontSize: 22,
    color: "#19C37D",
    fontWeight: "900",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },

  itemPrice: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  circleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#19C37D",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  qty: {
    width: 32,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  checkout: {
    marginTop: 14,
    height: 48,
    backgroundColor: "#19C37D",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },

});