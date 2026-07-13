import { View, Alert, Pressable, Text, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { BillService } from "../../services/billService";
import { PrintService } from "../../services/printService";
import { SettingsService } from "../../services/settingsService";

export default function Checkout() {

  const params = useLocalSearchParams();

  const cart = JSON.parse(params.cart as string);

  const total = Number(params.total);

  async function pay(mode: string) {

    const billNo = BillService.save(
      cart,
      total,
      mode
    );

    const settings: any = SettingsService.get();

    if (settings?.autoPrint) {

      await PrintService.autoPrint(
        {
          billNo,
          total,
          paymentMode: mode,
          createdAt: new Date().toISOString(),
        },
        cart
      );

    }

    Alert.alert(
      "Success",
      `${billNo} Saved Successfully`
    );

    router.dismissAll();

  }

  return (

    <View style={styles.container}>

      <Pressable
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={() => pay("Cash")}
      >
        <Text style={styles.text}>Cash</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: "#2196F3" }]}
        onPress={() => pay("UPI")}
      >
        <Text style={styles.text}>UPI</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: "#FF9800" }]}
        onPress={() => pay("Card")}
      >
        <Text style={styles.text}>Card</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: "#9C27B0" }]}
        onPress={() => pay("Mixed")}
      >
        <Text style={styles.text}>Mixed</Text>
      </Pressable>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 18,
    backgroundColor: "#f5f5f5",
  },

  button: {
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    elevation: 4,
  },

  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

});