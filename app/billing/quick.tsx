import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { BillService } from "../../services/billService";
import { PrintService } from "../../services/printService";

export default function QuickBilling() {
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");

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

  // Latest bill nikalo
  const bills = BillService.getBills() as any[];

  if (bills.length > 0) {

    await PrintService.printReceipt(
      bills[0],
      []
    );

  }

  Alert.alert(
    "Success",
    `${billNo} Generated`
  );

  setAmount("");

  router.back();

}

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Quick Billing
      </Text>

      <TextInput
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <View style={styles.row}>

        {["Cash","UPI","Card","Mixed"].map(mode => (

          <Pressable
            key={mode}
            style={[
              styles.mode,
              paymentMode===mode && styles.active
            ]}
            onPress={()=>setPaymentMode(mode)}
          >

            <Text>{mode}</Text>

          </Pressable>

        ))}

      </View>

      <Pressable
        style={styles.button}
        onPress={generateBill}
      >

        <Text style={styles.buttonText}>
          Generate Bill
        </Text>

      </Pressable>

    </View>
  );
}

const styles=StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#fff"
},

heading:{
fontSize:24,
fontWeight:"700",
marginBottom:25
},

input:{
borderWidth:1,
borderColor:"#ccc",
padding:15,
borderRadius:10,
fontSize:20
},

row:{
flexDirection:"row",
gap:10,
marginTop:20,
flexWrap:"wrap"
},

mode:{
padding:12,
backgroundColor:"#eee",
borderRadius:8
},

active:{
backgroundColor:"#cde7ff"
},

button:{
marginTop:40,
backgroundColor:"#111",
padding:16,
borderRadius:10
},

buttonText:{
color:"#fff",
fontSize:18,
fontWeight:"700",
textAlign:"center"
}

});