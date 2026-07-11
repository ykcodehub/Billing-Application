import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { BluetoothService, PrinterDevice } from "../../services/bluetoothService";


const PRINTER_KEY = "CONNECTED_PRINTER";


export default function PrinterScreen() {


  const [devices, setDevices] = useState<PrinterDevice[]>([]);
  const [savedPrinter, setSavedPrinter] =
    useState<PrinterDevice | null>(null);

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    loadSavedPrinter();

  }, []);



  async function loadSavedPrinter() {

    try {

      const data =
        await AsyncStorage.getItem(PRINTER_KEY);


      if(data){

        setSavedPrinter(
          JSON.parse(data)
        );

      }

    }
    catch(error){

      console.log(error);

    }

  }



  async function scanPrinters(){

    try {

      setLoading(true);


      const paired =
        await BluetoothService.paired();


      setDevices(paired);


      Alert.alert(
        "Success",
        `${paired.length} paired devices found`
      );


    }
    catch(error:any){

      Alert.alert(
        "Bluetooth Error",
        error.message
      );

    }
    finally{

      setLoading(false);

    }

  }





  async function connectPrinter(
    device: PrinterDevice
  ){

    try {


      setLoading(true);


      await BluetoothService.connect(
        device.address
      );


      await AsyncStorage.setItem(
        PRINTER_KEY,
        JSON.stringify(device)
      );


      setSavedPrinter(device);



      Alert.alert(
        "Connected",
        `${device.name} connected`
      );


    }
    catch(error:any){


      Alert.alert(
        "Connection Failed",
        error.message
      );


    }
    finally{

      setLoading(false);

    }

  }




  async function disconnectPrinter(){


    try{


      if(!savedPrinter)
        return;


      await BluetoothService.disconnect(
        savedPrinter.address
      );


      await AsyncStorage.removeItem(
        PRINTER_KEY
      );


      setSavedPrinter(null);



      Alert.alert(
        "Disconnected",
        "Printer disconnected"
      );


    }
    catch(error:any){

      Alert.alert(
        "Error",
        error.message
      );

    }


  }





  function renderDevice(
    {item}: {item:PrinterDevice}
  ){

    const connected =
      savedPrinter?.address === item.address;


    return (

      <TouchableOpacity
        style={styles.device}
        onPress={()=>connectPrinter(item)}
      >

        <Text style={styles.name}>
          {item.name}
        </Text>


        <Text style={styles.address}>
          {item.address}
        </Text>


        {
          connected &&
          <Text style={styles.connected}>
            Connected
          </Text>
        }


      </TouchableOpacity>

    );

  }





  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        Bluetooth Printer
      </Text>



      {
        savedPrinter &&

        <View style={styles.savedBox}>

          <Text style={styles.heading}>
            Current Printer
          </Text>


          <Text>
            {savedPrinter.name}
          </Text>


          <Text>
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

      }





      <TouchableOpacity
        style={styles.scan}
        onPress={scanPrinters}
      >

        {
          loading ?

          <ActivityIndicator color="white"/>

          :

          <Text style={styles.buttonText}>
            Scan Paired Printers
          </Text>

        }


      </TouchableOpacity>





      <FlatList

        data={devices}

        keyExtractor={
          item=>item.address
        }

        renderItem={renderDevice}

        ListEmptyComponent={

          <Text style={styles.empty}>
            No printer found
          </Text>

        }

      />



    </View>

  );

}




const styles = StyleSheet.create({

container:{
  flex:1,
  padding:20,
  backgroundColor:"#fff",
},


title:{
  fontSize:24,
  fontWeight:"700",
  marginBottom:20,
},


savedBox:{
  padding:15,
  borderRadius:10,
  backgroundColor:"#eee",
  marginBottom:20,
},


heading:{
  fontWeight:"700",
  marginBottom:5,
},


scan:{
  backgroundColor:"#111",
  padding:15,
  borderRadius:10,
  alignItems:"center",
  marginBottom:20,
},


device:{
  padding:15,
  borderBottomWidth:1,
  borderColor:"#ddd",
},


name:{
  fontSize:17,
  fontWeight:"600",
},


address:{
  color:"#666",
  marginTop:5,
},


connected:{
  marginTop:5,
  color:"green",
  fontWeight:"700",
},


disconnect:{
  marginTop:10,
  backgroundColor:"red",
  padding:10,
  borderRadius:8,
  alignItems:"center",
},


buttonText:{
  color:"#fff",
  fontWeight:"700",
},


empty:{
  textAlign:"center",
  marginTop:30,
  color:"#777",
},


});