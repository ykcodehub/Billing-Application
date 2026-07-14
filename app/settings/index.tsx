import { useEffect,useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  View,
  Switch,
  Image,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { SettingsService } from "../../services/settingsService";

export default function Settings(){

const {width}=useWindowDimensions();
const isTablet=width>=768;

const [storeName,setStoreName]=useState("");
const [address,setAddress]=useState("");
const [phone,setPhone]=useState("");
const [logo,setLogo]=useState("");

const [printerName,setPrinterName]=useState("");
const [printerMac,setPrinterMac]=useState("");

const [autoPrint,setAutoPrint]=useState(true);

useEffect(()=>{

const data:any=SettingsService.get();

if(!data)return;

setStoreName(data.storeName??"");
setAddress(data.address??"");
setPhone(data.phone??"");
setLogo(data.logo??"");

setPrinterName(data.printerName??"");
setPrinterMac(data.printerMac??"");

setAutoPrint(Boolean(data.autoPrint));

},[]);

async function pickLogo(){

const permission=
await ImagePicker.requestMediaLibraryPermissionsAsync();

if(!permission.granted){

Alert.alert(
"Permission Required",
"Gallery permission is required."
);

return;

}

const result=
await ImagePicker.launchImageLibraryAsync({

mediaTypes:["images"],

allowsEditing:true,

aspect:[1,1],

quality:1,

});

if(!result.canceled){

setLogo(result.assets[0].uri);

}

}

function save(){

SettingsService.save({

storeName,
address,
phone,

logo,

printerName,
printerMac,

autoPrint:autoPrint?1:0,

theme:"Light",

});

Alert.alert(
"Success",
"Settings Saved Successfully"
);

}

return(

<SafeAreaView style={{flex:1}}>

<ScrollView
style={[
styles.container,
isTablet&&styles.tabletContainer
]}
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:35}}
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
style={[styles.input,{height:90}]}
/>

<TextInput
placeholder="Phone Number"
keyboardType="phone-pad"
value={phone}
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
logo?

<Image
source={{uri:logo}}
style={[
styles.logo,
{
width:isTablet?130:80,
height:isTablet?130:80,
}
]}
/>

:

<View
style={[
styles.logoPlaceholder,
{
width:isTablet?130:80,
height:isTablet?130:80,
}
]}
>

<Text>
Logo
</Text>

</View>

}

<Text style={styles.optionTitle}>
{logo?"Change Logo":"Upload Logo"}
</Text>

</Pressable>

<Text style={styles.heading}>
Printer
</Text>

<Pressable
style={styles.option}
onPress={()=>router.push("/settings/printer")}
>

<Text style={styles.optionTitle}>
Bluetooth Printer
</Text>

<Text style={styles.optionSub}>
{printerName||"Not Connected"}
</Text>

</Pressable>

<Text style={styles.heading}>
Printing
</Text>

<View style={styles.option}>

<View
style={{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
}}
>

<View style={{flex:1}}>

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

<Text style={styles.optionSub}>
Coming Soon 🚀
</Text>

</View>

<Text style={styles.heading}>
About
</Text>

<Pressable
style={styles.option}
onPress={()=>router.push("/settings/about")}
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
fontSize:30,
fontWeight:"800",
marginBottom:24,
color:"#111",
},

heading:{
fontSize:19,
fontWeight:"700",
marginTop:18,
marginBottom:10,
color:"#333",
},

input:{
backgroundColor:"#fff",
paddingHorizontal:16,
paddingVertical:16,
borderRadius:14,
marginBottom:15,
fontSize:16,
elevation:2,
},

option:{
backgroundColor:"#fff",
padding:18,
borderRadius:14,
marginBottom:14,
elevation:2,
},

optionTitle:{
fontSize:17,
fontWeight:"700",
color:"#111",
textAlign:"center",
},

optionSub:{
marginTop:6,
fontSize:14,
color:"#777",
textAlign:"center",
},

logo:{
borderRadius:14,
alignSelf:"center",
marginBottom:14,
},

logoPlaceholder:{
borderRadius:14,
backgroundColor:"#ddd",
justifyContent:"center",
alignItems:"center",
alignSelf:"center",
marginBottom:14,
},

saveButton:{
backgroundColor:"#19C37D",
paddingVertical:18,
borderRadius:14,
alignItems:"center",
marginTop:25,
marginBottom:35,
elevation:3,
},

saveText:{
color:"#fff",
fontSize:18,
fontWeight:"700",
},

});