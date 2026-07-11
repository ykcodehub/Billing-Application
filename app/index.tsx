import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router, useFocusEffect } from "expo-router";

import MenuCard from "../components/common/MenuCard";

import { BillService } from "../services/billService";
import { SettingsService } from "../services/settingsService";


export default function Home() {

  const store = SettingsService.get() as {
    storeName: string;
    address: string;
    phone: string;
  };

  const [sales, setSales] = useState(0);

  const [bills, setBills] = useState(0);

  const [recentBills, setRecentBills] = useState<any[]>([]);



  const fade = useRef(
    new Animated.Value(0)
  ).current;

  const slide = useRef(
    new Animated.Value(-20)
  ).current;



  useEffect(() => {

    Animated.parallel([

      Animated.timing(fade,{

        toValue:1,

        duration:700,

        useNativeDriver:true

      }),

      Animated.timing(slide,{

        toValue:0,

        duration:700,

        useNativeDriver:true

      })

    ]).start();

  },[]);




  function loadDashboard(){

    setSales(
      BillService.getTodaySales()
    );

    setBills(
      BillService.getTodayBillsCount()
    );

    setRecentBills(
      BillService.getRecentBills(3) as any[]
    );

  }



  useFocusEffect(

    useCallback(()=>{

      loadDashboard();

    },[])

  );



  const today=new Date();

  const hour=today.getHours();

  const greeting=

  hour<12

  ? "Good Morning ☀️"

  : hour<17

  ? "Good Afternoon 🌤️"

  : "Good Evening 🌙";



  const date=today.toLocaleDateString(

    "en-IN",

    {

      day:"numeric",

      month:"short",

      year:"numeric"

    }

  );



  return(

<ScrollView

style={styles.container}

showsVerticalScrollIndicator={false}

>



<View style={styles.header}>



<Animated.View

style={{

opacity:fade,

transform:[

{translateY:slide}

]

}}

>

<Text style={styles.hello}>

Hello,

</Text>



<Text style={styles.store}>

{store.storeName || "Billing Store"}

</Text>



<Text style={styles.greeting}>

{greeting}

</Text>

</Animated.View>



<Text style={styles.date}>

{date}

</Text>



</View>





<View style={styles.earningCard}>

<Text style={styles.earningTitle}>

Today Earnings

</Text>



<Text style={styles.earning}>

₹ {sales.toFixed(2)}

</Text>

</View>





<View style={styles.row}>


<View style={styles.smallCard}>

<Text style={styles.smallTitle}>

Today Bills

</Text>

<Text style={styles.bigNumber}>

{bills}

</Text>

</View>




<View style={styles.smallCard}>

<Text style={styles.smallTitle}>

Recent Bills

</Text>

{

recentBills.length===0

?

<Text>

No Bills

</Text>

:

recentBills.map((item:any)=>(

<Text

key={item.id}

style={styles.billNo}

>

{item.billNo}

</Text>

))

}

</View>

</View>




<Text style={styles.section}>

Quick Actions

</Text>

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

<Text style={styles.section}>
Recent Bills
</Text>

{
recentBills.length===0
?
<View style={styles.emptyCard}>

<Text style={styles.emptyText}>
No Bills Available
</Text>

</View>

:
recentBills.map((bill:any)=>(

<View
key={bill.id}
style={styles.billCard}
>

<View>

<Text style={styles.billNumber}>
{bill.billNo}
</Text>

<Text style={styles.billMode}>
{bill.paymentMode}
</Text>

</View>

<Text style={styles.billAmount}>
₹ {Number(bill.total).toFixed(2)}
</Text>

</View>

))
}

<View style={{height:25}}/>

</ScrollView>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F4F6F9",
padding:18
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"flex-start",
marginBottom:22
},

hello:{
fontSize:17,
color:"#666"
},

store:{
fontSize:30,
fontWeight:"800",
color:"#111",
marginTop:2
},

greeting:{
fontSize:16,
color:"#666",
marginTop:6
},

date:{
fontSize:15,
fontWeight:"600",
color:"#777"
},

earningCard:{
backgroundColor:"#111827",
padding:22,
borderRadius:18,
marginBottom:18,
elevation:4
},

earningTitle:{
fontSize:16,
color:"#E5E7EB"
},

earning:{
fontSize:34,
fontWeight:"800",
color:"#fff",
marginTop:8
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:20
},

smallCard:{
backgroundColor:"#fff",
width:"48%",
padding:18,
borderRadius:16,
elevation:2
},

smallTitle:{
fontSize:15,
fontWeight:"700",
color:"#555",
marginBottom:10
},

bigNumber:{
fontSize:34,
fontWeight:"800",
color:"#111"
},

billNo:{
fontSize:15,
fontWeight:"600",
marginBottom:4
},

section:{
fontSize:22,
fontWeight:"800",
marginTop:8,
marginBottom:12,
color:"#111"
},

billCard:{
backgroundColor:"#fff",
padding:16,
borderRadius:16,
marginBottom:12,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
elevation:2
},

billNumber:{
fontSize:17,
fontWeight:"700",
color:"#111"
},

billMode:{
marginTop:4,
fontSize:14,
color:"#777"
},

billAmount:{
fontSize:18,
fontWeight:"800",
color:"#16A34A"
},

emptyCard:{
backgroundColor:"#fff",
padding:22,
borderRadius:16,
alignItems:"center",
elevation:2
},

emptyText:{
fontSize:16,
color:"#777"
}

});