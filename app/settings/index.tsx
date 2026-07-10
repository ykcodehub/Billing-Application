import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";

import { SettingsService } from "../../services/settingsService";

export default function Settings() {

  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [printerName, setPrinterName] = useState("");
  const [printerMac, setPrinterMac] = useState("");

  useEffect(() => {

    const data: any = SettingsService.get();

    if (data) {
      setStoreName(data.storeName ?? "");
      setAddress(data.address ?? "");
      setPhone(data.phone ?? "");
      setPrinterName(data.printerName ?? "");
      setPrinterMac(data.printerMac ?? "");
    }

  }, []);

  function save() {

    SettingsService.save({
      storeName,
      address,
      phone,
      printerName,
      printerMac,
    });

    Alert.alert(
      "Success",
      "Settings Saved"
    );

  }

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.title}>
        Store Settings
      </Text>

      <TextInput
        placeholder="Store Name"
        value={storeName}
        onChangeText={setStoreName}
        style={styles.input}
      />

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        multiline
        style={styles.input}
      />

      <TextInput
        placeholder="Phone"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
        style={styles.input}
      />

      <Text style={styles.heading}>
        Printer
      </Text>

      <TextInput
        placeholder="Printer Name"
        value={printerName}
        onChangeText={setPrinterName}
        style={styles.input}
      />

      <TextInput
        placeholder="Printer MAC Address"
        value={printerMac}
        onChangeText={setPrinterMac}
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={save}
      >

        <Text style={styles.buttonText}>
          Save Settings
        </Text>

      </Pressable>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5",
padding:20
},

title:{
fontSize:28,
fontWeight:"700",
marginBottom:25
},

heading:{
fontSize:20,
fontWeight:"700",
marginBottom:10,
marginTop:15
},

input:{
backgroundColor:"#fff",
padding:15,
borderRadius:10,
marginBottom:15,
fontSize:16
},

button:{
backgroundColor:"#19C37D",
padding:16,
borderRadius:10,
marginTop:10
},

buttonText:{
textAlign:"center",
color:"#fff",
fontSize:17,
fontWeight:"700"
}

});