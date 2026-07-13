import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";

export default function About() {

  const version =
    Constants.expoConfig?.version ?? "1.0.0";

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.logo}>
        🧾
      </Text>

      <Text style={styles.title}>
        Billing App
      </Text>

      <Text style={styles.version}>
        Version {version}
      </Text>

      <View style={styles.card}>

        <Text style={styles.heading}>
          About
        </Text>

        <Text style={styles.text}>
          Billing App is a simple offline POS application
          designed for restaurants, cafes and small shops.
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.heading}>
          Privacy Policy
        </Text>

        <Text style={styles.text}>
          We do not collect your personal data.
          All billing data is stored locally
          on your device.
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.heading}>
          Terms & Conditions
        </Text>

        <Text style={styles.text}>
          The developer is not responsible
          for any accidental data loss.
          Please keep regular backups.
        </Text>

      </View>

      <Text style={styles.footer}>
        © 2026 Billing App. All rights reserved.
      </Text>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5",
padding:20
},

logo:{
fontSize:70,
textAlign:"center",
marginTop:20
},

title:{
fontSize:30,
fontWeight:"800",
textAlign:"center",
marginTop:10
},

version:{
fontSize:16,
textAlign:"center",
color:"#666",
marginBottom:25
},

card:{
backgroundColor:"#fff",
padding:18,
borderRadius:15,
marginBottom:15,
elevation:2
},

heading:{
fontSize:18,
fontWeight:"700",
marginBottom:10
},

text:{
fontSize:15,
lineHeight:24,
color:"#444"
},

footer:{
marginTop:30,
marginBottom:30,
textAlign:"center",
color:"#666"
}

});