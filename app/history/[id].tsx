import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Pressable } from "react-native";
// import { ReceiptHtml } from "../../components/receipt/ReceiptHtml";
// import { PdfService } from "../../services/pdfService";

import { BillService } from "../../services/billService";
import { SettingsService } from "../../services/settingsService";
import Receipt from "../../components/receipt/Receipt";
import { PrintService } from "../../services/printService";
import { Alert } from "react-native";


export default function BillDetails() {

  const { id } = useLocalSearchParams();

  const bill = BillService.getBillById(Number(id)) as any;
  const items = BillService.getBillItems(Number(id)) as any[];
  const store = SettingsService.get();

  if (!bill) {
    return (
      <View style={styles.center}>
        <Text>Bill Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text style={styles.heading}>
        Receipt Preview
      </Text>

      <Receipt
        store={store}
        bill={bill}
        items={items}
      />
      <Pressable
  style={styles.pdf}
  onPress={async () => {

    try {

      await PrintService.printReceipt(
        bill,
        items
      );

      Alert.alert(
        "Success",
        "Print command sent."
      );

    } catch (e: any) {

      Alert.alert(
        "Print Failed",
        e.message
      );

    }

  }}
>

  <Text style={styles.pdfText}>
    Print Bill
  </Text>

</Pressable>


    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f5f5f5",
    padding:15
  },

  heading:{
    fontSize:24,
    fontWeight:"700",
    marginBottom:20
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  pdf:{
    marginTop:20,
    backgroundColor:"#111",
    padding:15,
    borderRadius:12,
    alignItems:"center"
    },

    pdfText:{
    color:"#fff",
    fontWeight:"700",
    fontSize:17
    },

});