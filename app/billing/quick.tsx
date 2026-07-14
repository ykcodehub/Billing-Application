import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { BillService } from "../../services/billService";
import { PrintService } from "../../services/printService";

export default function QuickBilling() {

  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  async function generateBill() {

    if (!amount || Number(amount) <= 0) {
      Alert.alert("Enter valid amount");
      return;
    }

    const billNo = BillService.save(
      [],
      Number(amount),
      paymentMode,
      "QUICK"
    );

    try {

      const bills = BillService.getBills() as any[];

      if (bills.length > 0) {

        await PrintService.autoPrint(
          bills[0],
          []
        );

      }

    } catch (error) {

      console.log("Auto Print Failed", error);

    }

    Alert.alert(
      "Success",
      `${billNo} Generated`
    );

    setAmount("");

    router.back();

  }

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
      >

        <Text
          style={[
            styles.heading,
            isTablet && styles.headingTablet,
          ]}
        >
          Quick Billing
        </Text>

        <TextInput
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={[
            styles.input,
            isTablet && styles.inputTablet,
          ]}
        />

        <View style={styles.row}>

          {["Cash", "UPI", "Card", "Mixed"].map((mode) => (

            <Pressable
              key={mode}
              style={[
                styles.mode,
                isTablet && styles.modeTablet,
                paymentMode === mode && styles.active,
              ]}
              onPress={() => setPaymentMode(mode)}
            >

              <Text
                style={[
                  styles.modeText,
                  paymentMode === mode && styles.activeText,
                ]}
              >
                {mode}
              </Text>

            </Pressable>

          ))}

        </View>

        <Pressable
          style={[
            styles.button,
            isTablet && styles.buttonTablet,
          ]}
          onPress={generateBill}
        >

          <Text style={styles.buttonText}>
            Generate Bill
          </Text>

        </Pressable>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  tabletContainer: {
    maxWidth: 650,
    width: "100%",
    alignSelf: "center",
  },

  heading: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 25,
    color: "#111",
  },

  headingTablet: {
    fontSize: 32,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 20,
    elevation: 2,
  },

  inputTablet: {
    padding: 20,
    fontSize: 22,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 22,
  },

  mode: {
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  modeTablet: {
    paddingVertical: 16,
    paddingHorizontal: 26,
  },

  active: {
    backgroundColor: "#19C37D",
  },

  modeText: {
    color: "#111",
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
    fontWeight: "700",
  },

  button: {
    marginTop: 40,
    backgroundColor: "#111",
    minHeight: 58,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonTablet: {
    minHeight: 64,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

});