// // import { FlatList, Text, View, StyleSheet } from "react-native";
// // import { useEffect, useState } from "react";
// // import { BillService } from "../../services/billService";

// // export default function History() {

// // const [bills,setBills]=useState<any[]>([]);

// // useEffect(()=>{

// // setBills(BillService.getBills());

// // },[]);

// // return(

// // <View style={styles.container}>

// // <FlatList

// // data={bills}

// // keyExtractor={(item:any)=>item.id.toString()}

// // ListEmptyComponent={
// // <Text>No Bills Found</Text>
// // }

// // renderItem={({item})=>(

// // <View style={styles.card}>

// // <Text style={styles.bill}>
// // {item.billNo}
// // </Text>

// // <Text>
// // ₹ {item.total}
// // </Text>

// // <Text>
// // {item.paymentMode}
// // </Text>

// // <Text>
// // {item.billType}
// // </Text>

// // </View>

// // )}

// // />

// // </View>

// // );

// // }

// // const styles=StyleSheet.create({

// // container:{
// // flex:1,
// // padding:15,
// // backgroundColor:"#f5f5f5"
// // },

// // card:{
// // backgroundColor:"#fff",
// // padding:15,
// // borderRadius:10,
// // marginBottom:10
// // },

// // bill:{
// // fontSize:17,
// // fontWeight:"700"
// // }

// // });



// //New code
// import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
// import { useFocusEffect, router } from "expo-router";
// import { useCallback, useState } from "react";
// import { BillService } from "../../services/billService";

// export default function History() {
//   const [bills, setBills] = useState<any[]>([]);

//   const loadBills = () => {
//     setBills(BillService.getBills() as any[]);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadBills();
//     }, [])
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={bills}
//         keyExtractor={(item: any) => item.id.toString()}
//         ListEmptyComponent={
//           <Text style={styles.empty}>No Bills Found</Text>
//         }
//         renderItem={({ item }) => (
//           <Pressable
//             style={styles.card}
//             onPress={() =>
//               router.push(`/history/${item.id}` as any)
//             }
//           >
//             <Text style={styles.bill}>{item.billNo}</Text>

//             <Text style={styles.total}>
//               ₹ {Number(item.total).toFixed(2)}
//             </Text>

//             <Text style={styles.info}>
//               {item.paymentMode}
//             </Text>

//             <Text style={styles.info}>
//               {item.billType}
//             </Text>
//           </Pressable>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: "#f5f5f5",
//   },

//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 10,
//     elevation: 2,
//   },

//   bill: {
//     fontSize: 17,
//     fontWeight: "700",
//     marginBottom: 6,
//   },

//   total: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#19C37D",
//   },

//   info: {
//     color: "#666",
//     marginTop: 3,
//   },

//   empty: {
//     marginTop: 40,
//     textAlign: "center",
//     fontSize: 16,
//     color: "#777",
//   },
// });

import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { BillService } from "../../services/billService";

export default function History() {
  const [bills, setBills] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  function loadBills() {
    setBills(BillService.getBills() as any[]);
  }

  function searchBills(text: string) {
    setSearch(text);

    if (text.trim() === "") {
      loadBills();
      return;
    }

    setBills(
      BillService.searchBills(text) as any[]
    );
  }

  useFocusEffect(
    useCallback(() => {
      loadBills();
    }, [])
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Bill History
      </Text>

      <TextInput
        placeholder="Search Bill No / Payment"
        value={search}
        onChangeText={searchBills}
        style={styles.input}
      />

      <FlatList
        data={bills}
        keyExtractor={(item: any) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No Bills Found
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push(`/history/${item.id}` as any)
            }
          >
            <Text style={styles.bill}>
              {item.billNo}
            </Text>

            <Text style={styles.amount}>
              ₹ {Number(item.total).toFixed(2)}
            </Text>

            <Text style={styles.info}>
              {item.paymentMode}
            </Text>

            <Text style={styles.info}>
              {item.billType}
            </Text>
          </Pressable>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5",
padding:15
},

title:{
fontSize:24,
fontWeight:"700",
marginBottom:15
},

input:{
backgroundColor:"#fff",
padding:14,
borderRadius:10,
marginBottom:15
},

card:{
backgroundColor:"#fff",
padding:15,
borderRadius:12,
marginBottom:10,
elevation:2
},

bill:{
fontSize:17,
fontWeight:"700"
},

amount:{
fontSize:18,
fontWeight:"700",
color:"#0a9b4f",
marginTop:5
},

info:{
marginTop:4,
color:"#666"
},

empty:{
marginTop:40,
textAlign:"center"
}

});