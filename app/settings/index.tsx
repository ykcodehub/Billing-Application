import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import { SettingsService } from "../../services/settingsService";

export default function Settings() {

  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [printerName, setPrinterName] = useState("");
  const [printerMac, setPrinterMac] = useState("");

  useEffect(() => {

    const data: any = SettingsService.get();

    if (!data) return;

    setStoreName(data.storeName ?? "");
    setAddress(data.address ?? "");
    setPhone(data.phone ?? "");
    setPrinterName(data.printerName ?? "");
    setPrinterMac(data.printerMac ?? "");

  }, []);

  function save() {

    SettingsService.save({

      storeName,
      address,
      phone,

      logo: "",

      printerName,
      printerMac,

      autoPrint: 1,

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
        Appearance
      </Text>

      <Pressable
        style={styles.option}
        onPress={() =>
          Alert.alert(
            "Coming Soon",
            "Theme Settings will be available soon."
          )
        }
      >
        <Text style={styles.optionTitle}>
          Theme
        </Text>

        <Text style={styles.optionSub}>
          Light
        </Text>
      </Pressable>

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

});