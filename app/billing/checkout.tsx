import { View, Alert, Pressable, Text, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import { BillService } from "../../services/billService";
import { PrintService } from "../../services/printService";
import { SettingsService } from "../../services/settingsService";

export default function Checkout() {

  const params = useLocalSearchParams();

  const cart = JSON.parse(params.cart as string);

  const total = Number(params.total);

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

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

    <SafeAreaView style={{ flex: 1 }}>

      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
      >

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

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },

  tabletContainer: {
    width: 650,
    alignSelf: "center",
  },

  button: {
    minHeight: 58,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

});