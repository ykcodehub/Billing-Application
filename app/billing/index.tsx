import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";

import useProducts from "../../hooks/useProducts";
import useCart from "../../hooks/useCart";

export default function BillingScreen() {

  const { products } = useProducts();

  const {
    cart,
    total,
    addItem,
    increase,
    decrease,
  } = useCart();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  function checkout() {

    if (cart.length === 0) return;

    router.push({
      pathname: "/billing/checkout",
      params: {
        cart: JSON.stringify(cart),
        total: total.toString(),
      },
    });

  }

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

        <FlatList
          data={products}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 15 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (

            <Pressable
              style={[
                styles.product,
                isTablet && styles.productTablet,
              ]}
              onPress={() => addItem(item)}
            >

              <View>

                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.price}>
                  ₹ {item.price}
                </Text>

              </View>

            </Pressable>

          )}
        />

        <View
          style={[
            styles.cart,
            isTablet && styles.cartTablet,
          ]}
        >

          <Text style={styles.heading}>
            Cart
          </Text>

          {
            cart.map((item: any) => (

              <View
                key={item.id}
                style={styles.row}
              >

                <Text style={styles.itemName}>
                  {item.name}
                </Text>

                <Pressable
                  style={styles.circleButton}
                  onPress={() => decrease(item.id)}
                >
                  <Text style={styles.buttonText}>
                    −
                  </Text>
                </Pressable>

                <Text style={styles.qty}>
                  {item.qty}
                </Text>

                <Pressable
                  style={styles.circleButton}
                  onPress={() => increase(item.id)}
                >
                  <Text style={styles.buttonText}>
                    +
                  </Text>
                </Pressable>

              </View>

            ))
          }

          <Text style={styles.total}>
            Total : ₹ {total.toFixed(2)}
          </Text>

          <Pressable
            style={styles.checkout}
            onPress={checkout}
          >
            <Text style={styles.checkoutText}>
              Checkout
            </Text>
          </Pressable>

        </View>

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
    paddingBottom: 16,
  },

  tabletContainer: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 15,
    color: "#111",
  },

  product: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  productTablet: {
    padding: 20,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },

  price: {
    marginTop: 4,
    color: "#555",
    fontSize: 15,
  },

  cart: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    elevation: 3,
    marginTop: 10,
  },

  cartTablet: {
    padding: 24,
  },

  heading: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 15,
    color: "#111",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  circleButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  qty: {
    width: 45,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  total: {
    fontSize: 23,
    fontWeight: "800",
    color: "#111",
    marginTop: 10,
    marginBottom: 15,
  },

  checkout: {
    backgroundColor: "#19C37D",
    minHeight: 58,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

});