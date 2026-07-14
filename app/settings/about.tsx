import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

export default function About() {

  const version =
    Constants.expoConfig?.version ?? "1.0.0";

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return (

    <SafeAreaView style={{ flex:1 }}>

      <ScrollView
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
        contentContainerStyle={{ paddingBottom:35 }}
        showsVerticalScrollIndicator={false}
      >

        <Text style={[
          styles.logo,
          {
            fontSize:isTablet ? 90 : 70,
          }
        ]}>
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
            Billing App is a simple offline POS application designed for restaurants, cafes and small shops.
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.heading}>
            Privacy Policy
          </Text>

          <Text style={styles.text}>
            We do not collect your personal data. All billing data is stored locally on your device.
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.heading}>
            Terms & Conditions
          </Text>

          <Text style={styles.text}>
            The developer is not responsible for any accidental data loss. Please keep regular backups.
          </Text>

        </View>

        <Text style={styles.footer}>
          © 2026 Billing App. All rights reserved.
        </Text>

      </ScrollView>

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

logo:{
textAlign:"center",
marginTop:20,
},

title:{
fontSize:30,
fontWeight:"800",
textAlign:"center",
marginTop:10,
color:"#111",
},

version:{
fontSize:16,
textAlign:"center",
color:"#666",
marginBottom:28,
},

card:{
backgroundColor:"#fff",
padding:20,
borderRadius:16,
marginBottom:16,
elevation:2,
},

heading:{
fontSize:19,
fontWeight:"700",
marginBottom:10,
color:"#111",
},

text:{
fontSize:16,
lineHeight:26,
color:"#444",
},

footer:{
marginTop:30,
marginBottom:25,
textAlign:"center",
fontSize:15,
color:"#666",
},

});