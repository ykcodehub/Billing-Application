import { FlatList, Text, Pressable, StyleSheet } from "react-native";

const demoPrinters=[

{
name:"NIYAMA Printer",
address:"00:11:22:33:44"
}

];

export default function PrinterList(){

return(

<FlatList

style={styles.container}

data={demoPrinters}

keyExtractor={(item)=>item.address}

renderItem={({item})=>(

<Pressable style={styles.card}>

<Text style={styles.name}>
{item.name}
</Text>

<Text>
{item.address}
</Text>

</Pressable>

)}

/>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
padding:15,
backgroundColor:"#f5f5f5"
},

card:{
backgroundColor:"#fff",
padding:15,
borderRadius:12,
marginBottom:12
},

name:{
fontSize:17,
fontWeight:"700"
}

});