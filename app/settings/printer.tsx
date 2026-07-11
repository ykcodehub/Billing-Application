import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function PrinterSettings() {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Bluetooth Printer
      </Text>

      <Text style={styles.info}>
        No Printer Connected
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/settings/printer-list")}
      >

        <Text style={styles.buttonText}>
          Scan Printers
        </Text>

      </Pressable>

    </View>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#f5f5f5"
},

title:{
fontSize:28,
fontWeight:"700",
marginBottom:20
},

info:{
fontSize:16,
marginBottom:25,
color:"#666"
},

button:{
backgroundColor:"#19C37D",
padding:15,
borderRadius:10
},

buttonText:{
color:"#fff",
fontWeight:"700",
fontSize:17,
textAlign:"center"
}

});