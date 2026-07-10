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

  const checkout = () => {

    if (cart.length === 0) return;

    router.push({
      pathname: "/billing/checkout",
      params: {
        cart: JSON.stringify(cart),
        total: total.toString(),
      },
    });

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Billing</Text>

      <FlatList

        data={products}

        keyExtractor={(item: any) => item.id.toString()}

        renderItem={({ item }) => (

          <Pressable
            style={styles.product}
            onPress={() => addItem(item)}
          >

            <View>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text>
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

        {cart.map((item: any) => (

          <View
            key={item.id}
            style={styles.row}
          >

            <Text style={{ flex: 1 }}>
              {item.name}
            </Text>

            <Pressable
              onPress={() => decrease(item.id)}
            >
              <Text style={styles.btn}>-</Text>
            </Pressable>

            <Text style={styles.qty}>
              {item.qty}
            </Text>

            <Pressable
              onPress={() => increase(item.id)}
            >
              <Text style={styles.btn}>+</Text>
            </Pressable>

          </View>

        ))}

        <Text style={styles.total}>
          Total : ₹ {total}
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },

  product: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  name: {
    fontWeight: "700",
    fontSize: 17,
  },

  cart: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  btn: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 10,
  },

  qty: {
    width: 35,
    textAlign: "center",
  },

  total: {
    marginTop: 15,
    fontWeight: "700",
    fontSize: 18,
  },

  checkout: {
    marginTop: 20,
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
  },

  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
  },

});