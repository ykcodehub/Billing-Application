import { View, Button, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { BillService } from "../../services/billService";
import { PrintService } from "../../services/printService";

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

    await PrintService.printReceipt(
      {
        billNo,
        total,
        paymentMode: mode,
        createdAt: new Date().toISOString(),
      },
      cart
    );

    Alert.alert(
      "Success",
      `${billNo} Saved Successfully`
    );

    router.dismissAll();

  }

  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 15,
      }}
    >

      <Button
        title="Cash"
        onPress={() => pay("Cash")}
      />

      <Button
        title="UPI"
        onPress={() => pay("UPI")}
      />

      <Button
        title="Card"
        onPress={() => pay("Card")}
      />

      <Button
        title="Mixed"
        onPress={() => pay("Mixed")}
      />

    </View>

  );

}