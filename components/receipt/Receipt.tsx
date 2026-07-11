import { View, Text, StyleSheet } from "react-native";

export default function Receipt({

  store,

  bill,

  items

}:any){

return(

<View style={styles.paper}>

<Text style={styles.store}>
{store?.storeName || "Billing Store"}
</Text>

{
store?.address?
<Text style={styles.small}>
{store.address}
</Text>:null
}

{
store?.phone?
<Text style={styles.small}>
{store.phone}
</Text>:null
}

<View style={styles.line}/>

<Text style={styles.small}>
Bill : {bill.billNo}
</Text>

<Text style={styles.small}>
{new Date(bill.createdAt).toLocaleString()}
</Text>

<View style={styles.line}/>

{

items.map((item:any)=>(

<View
key={item.id}
style={styles.row}
>

<Text style={{flex:1}}>
{item.name}
</Text>

<Text>
{item.qty}
</Text>

<Text>
₹ {item.qty*item.price}
</Text>

</View>

))

}

<View style={styles.line}/>

<View style={styles.row}>

<Text style={styles.total}>
TOTAL
</Text>

<Text style={styles.total}>
₹ {bill.total}
</Text>

</View>

<Text style={styles.small}>
Payment : {bill.paymentMode}
</Text>

<View style={styles.line}/>

<Text style={styles.footer}>
THANK YOU
</Text>

<Text style={styles.footer}>
Visit Again
</Text>

</View>

);

}

const styles=StyleSheet.create({

paper:{
backgroundColor:"#fff",
padding:12,
borderRadius:10
},

store:{
fontSize:18,
fontWeight:"700",
textAlign:"center"
},

small:{
fontSize:12,
textAlign:"center",
marginTop:2
},

line:{
borderBottomWidth:1,
borderStyle:"dashed",
marginVertical:8
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:4
},

total:{
fontSize:16,
fontWeight:"700"
},

footer:{
textAlign:"center",
marginTop:3,
fontWeight:"600"
}

});