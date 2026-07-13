import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
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

    <View style={styles.container}>

      <Text style={styles.title}>
        Billing
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 15 }}
        renderItem={({ item }) => (

          <Pressable
            style={styles.product}
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

      <View style={styles.cart}>

        <Text style={styles.heading}>
          Cart
        </Text>

        {
          cart.map((item: any) => (

            <View
              key={item.id}
              style={styles.row}
            >

              <Text
                style={styles.itemName}
              >
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

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
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

  heading: {
    fontSize: 20,
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
  },

  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

});