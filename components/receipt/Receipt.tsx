import { View, Text, StyleSheet } from "react-native";

export default function Receipt({
  store,
  bill,
  items,
}: any) {
  return (
    <View style={styles.container}>

      <Text style={styles.store}>
        {store?.storeName || "STORE"}
      </Text>

      <Text>
        {store?.address}
      </Text>

      <Text>
        {store?.phone}
      </Text>

      <Text style={styles.line}>
        ------------------------------
      </Text>

      <Text>
        Bill : {bill.billNo}
      </Text>

      <Text>
        {new Date(bill.createdAt).toLocaleString()}
      </Text>

      <Text style={styles.line}>
        ------------------------------
      </Text>

      {items.map((item: any) => (

        <View
          key={item.id}
          style={styles.row}
        >

          <Text style={{ flex: 1 }}>
            {item.name}
          </Text>

          <Text>
            {item.qty} x {item.price}
          </Text>

        </View>

      ))}

      <Text style={styles.line}>
        ------------------------------
      </Text>

      <View style={styles.totalRow}>

        <Text style={styles.total}>
          TOTAL
        </Text>

        <Text style={styles.total}>
          ₹ {bill.total}
        </Text>

      </View>

      <Text style={styles.footer}>
        Thank You
      </Text>

      <Text style={styles.footer}>
        Visit Again
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

container:{
backgroundColor:"#fff",
padding:15
},

store:{
fontSize:22,
fontWeight:"700",
textAlign:"center"
},

line:{
marginVertical:10,
textAlign:"center"
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:6
},

totalRow:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:12
},

total:{
fontWeight:"700",
fontSize:18
},

footer:{
marginTop:10,
textAlign:"center"
}

});