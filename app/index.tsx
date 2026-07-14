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
import Screen from "../components/common/Screen";

import { BillService } from "../services/billService";
import { SettingsService } from "../services/settingsService";
import {
  wp,
  hp,
  rf,
  rr,
  isTablet,
} from "../utils/responsive";


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

<Screen>

<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
contentContainerStyle={{ paddingBottom: 35 }}
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

<View style={{ height: hp(25) }} />

</ScrollView>
</Screen>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F4F6F9",
padding:wp(18)
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"flex-start",
marginBottom:hp(22)
},

hello:{
fontSize:rf(17),
color:"#666"
},

store:{
fontSize:isTablet ? rf(36) : rf(30),
fontWeight:"800",
color:"#111",
marginTop:hp(2),
maxWidth:"85%"
},

greeting:{
fontSize:rf(16),
color:"#666",
marginTop:hp(6)
},

date:{
fontSize:rf(15),
fontWeight:"600",
color:"#777"
},

earningCard:{
backgroundColor:"#111827",
padding:wp(22),
borderRadius:rr(18),
marginBottom:hp(18),
elevation:4
},

earningTitle:{
fontSize:rf(16),
color:"#E5E7EB"
},

earning:{
fontSize:isTablet ? rf(42) : rf(34),
fontWeight:"800",
color:"#fff",
marginTop:hp(8)
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:hp(20)
},

smallCard:{
backgroundColor:"#fff",
width:isTablet ? "49%" : "48%",
padding:wp(18),
borderRadius:rr(16),
elevation:2,
minHeight:hp(120)
},

smallTitle:{
fontSize:rf(15),
fontWeight:"700",
color:"#555",
marginBottom:hp(10)
},

bigNumber:{
fontSize:isTablet ? rf(40) : rf(34),
fontWeight:"800",
color:"#111"
},

billNo:{
fontSize:rf(15),
fontWeight:"600",
marginBottom:hp(4)
},

section:{
fontSize:isTablet ? rf(26) : rf(22),
fontWeight:"800",
marginTop:hp(8),
marginBottom:hp(12),
color:"#111"
},

billCard:{
backgroundColor:"#fff",
padding:wp(16),
borderRadius:rr(16),
marginBottom:hp(12),
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
elevation:2
},

billNumber:{
fontSize:rf(17),
fontWeight:"700",
color:"#111"
},

billMode:{
marginTop:hp(4),
fontSize:rf(14),
color:"#777"
},

billAmount:{
fontSize:rf(18),
fontWeight:"800",
color:"#16A34A"
},

emptyCard:{
backgroundColor:"#fff",
padding:wp(22),
borderRadius:rr(16),
alignItems:"center",
elevation:2
},

emptyText:{
fontSize:rf(16),
color:"#777"
}

});