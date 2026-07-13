import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  View,
  Switch,
} from "react-native";
import { router } from "expo-router";

import { SettingsService } from "../../services/settingsService";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

export default function Settings() {

  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState("");

  const [printerName, setPrinterName] = useState("");
  const [printerMac, setPrinterMac] = useState("");

  const [autoPrint, setAutoPrint] = useState(true);
  const [theme, setTheme] =  useState<"Light" | "Dark">("Light");

  useEffect(() => {

    const data: any = SettingsService.get();

    if (!data) return;

    setStoreName(data.storeName ?? "");
    setAddress(data.address ?? "");
    setPhone(data.phone ?? "");
    setLogo(data.logo ?? "");
    setPrinterName(data.printerName ?? "");
    setPrinterMac(data.printerMac ?? "");
    setAutoPrint(Boolean(data.autoPrint));
    setTheme(data.theme || "Light");

  }, []);

  async function pickLogo() {

  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {

    Alert.alert(
      "Permission Required",
      "Gallery permission is required."
    );

    return;

  }

  const result =
    await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ["images"],

      allowsEditing: true,

      aspect: [1, 1],

      quality: 1,

    });

  if (!result.canceled) {

    setLogo(
      result.assets[0].uri
    );

  }

}
  function save() {

    SettingsService.save({

    storeName,
    address,
    phone,

    logo,

    printerName,
    printerMac,

    autoPrint: autoPrint ? 1 : 0,

    theme,

  });

    Alert.alert(
      "Success",
      "Settings Saved Successfully"
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

      <Text style={styles.heading}>
        Store Information
      </Text>

      <TextInput
        placeholder="Store Name"
        value={storeName}
        onChangeText={setStoreName}
        style={styles.input}
      />

      <TextInput
        placeholder="Store Address"
        value={address}
        onChangeText={setAddress}
        multiline
        style={[styles.input, { height: 90 }]}
      />

      <TextInput
        placeholder="Phone Number"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
        style={styles.input}
      />

      <Text style={styles.heading}>
  Store Logo
</Text>

<Pressable
  style={styles.option}
  onPress={pickLogo}
>

  {
    logo ?

    <Image
      source={{ uri: logo }}
      style={{
        width:80,
        height:80,
        borderRadius:10,
        alignSelf:"center",
        marginBottom:10,
      }}
    />

    :

    <View
      style={{
        width:80,
        height:80,
        borderRadius:10,
        backgroundColor:"#ddd",
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:10,
      }}
    >

      <Text>Logo</Text>

    </View>

  }

  <Text
    style={styles.optionTitle}
  >
    {logo ? "Change Logo" : "Upload Logo"}
  </Text>

</Pressable>

      <Text style={styles.heading}>
        Printer
      </Text>

      <Pressable
        style={styles.option}
        onPress={() => router.push("/settings/printer")}
      >
        <Text style={styles.optionTitle}>
          Bluetooth Printer
        </Text>

        <Text style={styles.optionSub}>
          {printerName || "Not Connected"}
        </Text>
      </Pressable>

      <Text style={styles.heading}>
  Printing
</Text>

<View style={styles.option}>

  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <View>
      <Text style={styles.optionTitle}>
        Auto Print Bill
      </Text>

      <Text style={styles.optionSub}>
        Print receipt automatically after checkout
      </Text>
    </View>

    <Switch
      value={autoPrint}
      onValueChange={setAutoPrint}
    />
  </View>

</View>

<Text style={styles.heading}>
  Appearance
</Text>

<View style={styles.option}>

  <Text style={styles.optionTitle}>
    Theme
  </Text>

  <View
    style={{
      flexDirection: "row",
      marginTop: 15,
    }}
  >

    <Pressable
      style={[
        styles.themeButton,
        theme === "Light" &&
          styles.themeSelected,
      ]}
      onPress={() => setTheme("Light")}
    >
      <Text
        style={{
          color:
            theme === "Light"
              ? "#fff"
              : "#111",
          fontWeight: "700",
        }}
      >
        Light
      </Text>
    </Pressable>

    <Pressable
      style={[
        styles.themeButton,
        theme === "Dark" &&
          styles.themeSelected,
      ]}
      onPress={() => setTheme("Dark")}
    >
      <Text
        style={{
          color:
            theme === "Dark"
              ? "#fff"
              : "#111",
          fontWeight: "700",
        }}
      >
        Dark
      </Text>
    </Pressable>

  </View>

</View>

      <Text style={styles.heading}>
        About
      </Text>

      <Pressable
        style={styles.option}
        onPress={() => router.push("/settings/about")}
      >
        <Text style={styles.optionTitle}>
          About App
        </Text>

        <Text style={styles.optionSub}>
          Version • Privacy Policy • Terms
        </Text>
      </Pressable>

      <Pressable
        style={styles.saveButton}
        onPress={save}
      >
        <Text style={styles.saveText}>
          Save Settings
        </Text>
      </Pressable>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 25,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 15,
    color: "#333",
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },

  option: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  optionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },

  optionSub: {
    marginTop: 4,
    fontSize: 14,
    color: "#777",
  },

  saveButton: {
    backgroundColor: "#19C37D",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },

  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  themeButton: {
  flex: 1,
  backgroundColor: "#eee",
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: "center",
  marginHorizontal: 5,
},

themeSelected: {
  backgroundColor: "#19C37D",
},

});