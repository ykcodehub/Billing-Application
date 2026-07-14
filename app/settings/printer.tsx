
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  BluetoothService,
  PrinterDevice,
} from "../../services/bluetoothService";

import { SettingsService } from "../../services/settingsService";

const PRINTER_KEY = "CONNECTED_PRINTER";

export default function PrinterScreen() {
  const [devices, setDevices] = useState<PrinterDevice[]>([]);
  const [savedPrinter, setSavedPrinter] =
    useState<PrinterDevice | null>(null);
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  useEffect(() => {
    loadSavedPrinter();
  }, []);

  async function loadSavedPrinter() {
    try {
      const data = await AsyncStorage.getItem(PRINTER_KEY);

      if (data) {
        setSavedPrinter(JSON.parse(data));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function requestBluetoothPermissions() {
    if (Platform.OS !== "android") return true;

    if (Platform.Version >= 31) {
      const result =
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

      return (
        result["android.permission.BLUETOOTH_SCAN"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result["android.permission.BLUETOOTH_CONNECT"] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }

    const granted =
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

    return (
      granted === PermissionsAndroid.RESULTS.GRANTED
    );
  }
    async function scanPrinters() {
    try {
      const granted =
        await requestBluetoothPermissions();

      if (!granted) {
        Alert.alert(
          "Permission Required",
          "Please allow Bluetooth permission."
        );
        return;
      }

      setLoading(true);

      const list =
        await BluetoothService.scan();

      setDevices(list);

      Alert.alert(
        "Scan Complete",
        `${list.length} device(s) found`
      );

    } catch (e: any) {

      Alert.alert(
        "Bluetooth Error",
        e.message
      );

    } finally {

      setLoading(false);

    }
  }

  async function connectPrinter(
    device: PrinterDevice
  ) {

    try {

      setLoading(true);

      await BluetoothService.connect(
        device.address
      );

      await AsyncStorage.setItem(
        PRINTER_KEY,
        JSON.stringify(device)
      );

      const settings: any =
        SettingsService.get();

      SettingsService.save({

        ...settings,

        printerName: device.name,

        printerMac: device.address,

      });

      setSavedPrinter(device);

      Alert.alert(
        "Connected",
        `${device.name} connected successfully`
      );

    } catch (e: any) {

      Alert.alert(
        "Connection Failed",
        e.message
      );

    } finally {

      setLoading(false);

    }

  }

  async function disconnectPrinter() {

    try {

      if (!savedPrinter)
        return;

      await BluetoothService.disconnect(
        savedPrinter.address
      );

      await AsyncStorage.removeItem(
        PRINTER_KEY
      );

      const settings: any =
        SettingsService.get();

      SettingsService.save({

        ...settings,

        printerName: "",

        printerMac: "",

      });

      setSavedPrinter(null);

      Alert.alert(
        "Disconnected",
        "Printer disconnected."
      );

    } catch (e: any) {

      Alert.alert(
        "Error",
        e.message
      );

    }

  }

  function renderDevice({
    item,
  }: {
    item: PrinterDevice;
  }) {

    const connected =
      savedPrinter?.address === item.address;

    return (

      <TouchableOpacity
        style={styles.device}
        onPress={() =>
          connectPrinter(item)
        }
      >

        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.address}>
          {item.address}
        </Text>

        {connected && (
          <Text style={styles.connected}>
            ✓ Connected
          </Text>
        )}

      </TouchableOpacity>

    );

  }
    return (

    <SafeAreaView style={{ flex:1 }}>

      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
      >

        <Text style={styles.title}>
          Bluetooth Printer
        </Text>

        {savedPrinter && (

          <View style={styles.savedBox}>

            <Text style={styles.heading}>
              Connected Printer
            </Text>

            <Text style={styles.name}>
              {savedPrinter.name}
            </Text>

            <Text style={styles.address}>
              {savedPrinter.address}
            </Text>

            <TouchableOpacity
              style={styles.disconnect}
              onPress={disconnectPrinter}
            >

              <Text style={styles.buttonText}>
                Disconnect
              </Text>

            </TouchableOpacity>

          </View>

        )}

        <TouchableOpacity
          style={styles.scan}
          onPress={scanPrinters}
        >

          {loading ? (

            <ActivityIndicator
              color="#fff"
            />

          ) : (

            <Text style={styles.buttonText}>
              Scan Bluetooth Devices
            </Text>

          )}

        </TouchableOpacity>

        <FlatList
          data={devices}
          keyExtractor={(item) => item.address}
          renderItem={renderDevice}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom:30 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No Devices Found
            </Text>
          }
        />

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5",
paddingHorizontal:18,
paddingTop:10,
},

tabletContainer:{
width:"70%",
alignSelf:"center",
},

title:{
fontSize:28,
fontWeight:"800",
marginBottom:22,
color:"#111",
},

savedBox:{
backgroundColor:"#fff",
padding:18,
borderRadius:16,
marginBottom:20,
elevation:2,
},

heading:{
fontSize:18,
fontWeight:"700",
marginBottom:10,
color:"#111",
},

scan:{
backgroundColor:"#19C37D",
paddingVertical:16,
borderRadius:14,
alignItems:"center",
marginBottom:20,
elevation:2,
},

device:{
backgroundColor:"#fff",
padding:16,
borderRadius:14,
marginBottom:12,
borderWidth:1,
borderColor:"#e5e5e5",
elevation:2,
},

name:{
fontSize:17,
fontWeight:"700",
color:"#111",
},

address:{
marginTop:6,
fontSize:14,
color:"#666",
},

connected:{
marginTop:8,
fontSize:15,
color:"#16A34A",
fontWeight:"700",
},

disconnect:{
backgroundColor:"#E53935",
marginTop:16,
paddingVertical:14,
borderRadius:12,
alignItems:"center",
},

buttonText:{
color:"#fff",
fontWeight:"700",
fontSize:16,
},

empty:{
textAlign:"center",
marginTop:50,
fontSize:16,
color:"#777",
},

});