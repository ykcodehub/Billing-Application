// // import { View, Pressable, Text, StyleSheet } from "react-native";
// // import { router } from "expo-router";

// // const menus = [
// //   { title: "🧾 Normal Billing", path: "/billing" },
// //   { title: "⚡ Quick Billing", path: "/billing/quick" },
// //   { title: "📦 Products", path: "/products" },
// //   { title: "📜 History", path: "/history" },
// //   { title: "📊 Reports", path: "/reports" },
// //   { title: "⚙️ Settings", path: "/settings" },
// // ];

// // export default function Home() {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.heading}>Billing App</Text>

// //       {menus.map((item) => (
// //         <Pressable
// //           key={item.title}
// //           style={styles.card}
// //           onPress={() => router.push(item.path as any)}
// //         >
// //           <Text style={styles.text}>{item.title}</Text>
// //         </Pressable>
// //       ))}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: "#f5f5f5",
// //   },

// //   heading: {
// //     fontSize: 28,
// //     fontWeight: "700",
// //     marginBottom: 25,
// //   },

// //   card: {
// //     backgroundColor: "#fff",
// //     padding: 18,
// //     borderRadius: 12,
// //     marginBottom: 15,
// //     elevation: 2,
// //   },

// //   text: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// // });


// import { View, Text, StyleSheet } from "react-native";
// import { router } from "expo-router";

// import MenuCard from "../components/common/MenuCard";

// export default function Home() {

//   return (

//     <View style={styles.container}>

//       <Text style={styles.title}>
//         Billing App
//       </Text>

//       <MenuCard
//         title="🧾 Normal Billing"
//         onPress={()=>router.push("/billing")}
//       />

//       <MenuCard
//         title="⚡ Quick Billing"
//         onPress={()=>router.push("/billing/quick")}
//       />

//       <MenuCard
//         title="📦 Products"
//         onPress={()=>router.push("/products")}
//       />

//       <MenuCard
//         title="📜 History"
//         onPress={()=>router.push("/history")}
//       />

//       <MenuCard
//         title="📊 Reports"
//         onPress={()=>router.push("/reports")}
//       />

//       <MenuCard
//         title="⚙️ Settings"
//         onPress={()=>router.push("/settings")}
//       />

//     </View>

//   );

// }

// const styles=StyleSheet.create({

// container:{
// flex:1,
// padding:20,
// backgroundColor:"#f5f5f5"
// },

// title:{
// fontSize:28,
// fontWeight:"700",
// marginBottom:25
// }

// });


import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router, useFocusEffect } from "expo-router";

import MenuCard from "../components/common/MenuCard";
import { BillService } from "../services/billService";
import { ProductService } from "../services/productService";

export default function Home() {

  const [sales, setSales] = useState(0);
  const [bills, setBills] = useState(0);
  const [products, setProducts] = useState(0);
  const [recentBills, setRecentBills] = useState<any[]>([]);

  function loadDashboard() {

    setSales(BillService.getTodaySales());

    setBills(BillService.getTodayBillsCount());

    setProducts(ProductService.count());

    setRecentBills(
      BillService.getRecentBills() as any[]
    );

  }

  useFocusEffect(

    useCallback(() => {

      loadDashboard();

    }, [])

  );

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.title}>
        Billing App
      </Text>

      <View style={styles.statsRow}>

        <View style={styles.statCard}>

          <Text style={styles.label}>
            Today Sales
          </Text>

          <Text style={styles.value}>
            ₹ {sales}
          </Text>

        </View>

        <View style={styles.statCard}>

          <Text style={styles.label}>
            Bills
          </Text>

          <Text style={styles.value}>
            {bills}
          </Text>

        </View>

      </View>

      <View style={styles.statsRow}>

        <View style={styles.statCard}>

          <Text style={styles.label}>
            Products
          </Text>

          <Text style={styles.value}>
            {products}
          </Text>

        </View>

      </View>

      <MenuCard
        title="🧾 Normal Billing"
        onPress={() => router.push("/billing")}
      />

      <MenuCard
        title="⚡ Quick Billing"
        onPress={() => router.push("/billing/quick")}
      />

      <MenuCard
        title="📦 Products"
        onPress={() => router.push("/products")}
      />

      <MenuCard
        title="📜 History"
        onPress={() => router.push("/history")}
      />

      <MenuCard
        title="📊 Reports"
        onPress={() => router.push("/reports")}
      />

      <MenuCard
        title="⚙️ Settings"
        onPress={() => router.push("/settings")}
      />

      <Text style={styles.recent}>
        Recent Bills
      </Text>

      {

        recentBills.map((bill: any) => (

          <View
            key={bill.id}
            style={styles.billCard}
          >

            <Text style={styles.billNo}>
              {bill.billNo}
            </Text>

            <Text>
              ₹ {bill.total}
            </Text>

          </View>

        ))

      }

    </ScrollView>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5",
padding:20
},

title:{
fontSize:28,
fontWeight:"700",
marginBottom:20
},

statsRow:{
flexDirection:"row",
marginBottom:15
},

statCard:{
flex:1,
backgroundColor:"#fff",
padding:18,
borderRadius:12,
marginRight:10,
elevation:2
},

label:{
fontSize:14,
color:"#666"
},

value:{
fontSize:24,
fontWeight:"700",
marginTop:8
},

recent:{
fontSize:22,
fontWeight:"700",
marginTop:20,
marginBottom:12
},

billCard:{
backgroundColor:"#fff",
padding:15,
borderRadius:12,
marginBottom:10
},

billNo:{
fontWeight:"700",
fontSize:16
}

});