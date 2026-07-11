import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";

import { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import ReportCard from "../../components/reports/ReportCard";
import { ReportService } from "../../services/reportService";
import { CsvService } from "../../services/csvService";


export default function Reports() {

  const [today, setToday] = useState<any>({});
  const [week, setWeek] = useState<any>({});
  const [month, setMonth] = useState<any>({});
  const [year, setYear] = useState<any>({});

  const [total, setTotal] = useState<any>({});
  const [payments, setPayments] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);


  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());


  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);



  function formatDate(date:Date){

    return date.toISOString().split("T")[0];

  }



  async function exportCsv() {

  const rows = ReportService.reportByDate(
    formatDate(fromDate),
    formatDate(toDate)
  ) as any[];

  if (rows.length === 0) {

    Alert.alert(
      "No Reports",
      "No reports found for selected dates."
    );

    return;

  }

  await CsvService.exportSales(rows);

}

  useFocusEffect(
  useCallback(() => {

    setToday(
      ReportService.today()
    );

    setWeek(
      ReportService.weekly()
    );

    setMonth(
      ReportService.monthly()
    );

    setYear(
      ReportService.yearly()
    );

    setTotal(
      ReportService.totalSales()
    );

    setPayments(
      ReportService.paymentSummary() as any[]
    );

    setTopProducts(
      ReportService.topProducts() as any[]
    );

  }, [])
);

  return (

<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
>


<Text style={styles.title}>
Sales Reports
</Text>



{/* DATE FILTER */}


<View style={styles.dateContainer}>


<Text style={styles.heading}>
From Date
</Text>


<Pressable
style={styles.dateBox}
onPress={()=>setShowFrom(true)}
>

<Text>
{formatDate(fromDate)}
</Text>

</Pressable>



{
showFrom &&
<DateTimePicker

value={fromDate}

mode="date"

onChange={(event,date)=>{

setShowFrom(false);

if(date)
setFromDate(date);

}}

/>
}



<Text style={styles.heading}>
To Date
</Text>


<Pressable
style={styles.dateBox}
onPress={()=>setShowTo(true)}
>

<Text>
{formatDate(toDate)}
</Text>

</Pressable>



{
showTo &&
<DateTimePicker

value={toDate}

mode="date"

onChange={(event,date)=>{

setShowTo(false);

if(date)
setToDate(date);

}}

/>
}



</View>





<ReportCard

title="Today's Report"

bills={today?.bills ?? 0}

sales={today?.sales ?? 0}

/>



<ReportCard

title="Weekly Report"

bills={week?.bills ?? 0}

sales={week?.sales ?? 0}

/>




<ReportCard

title="Monthly Report"

bills={month?.bills ?? 0}

sales={month?.sales ?? 0}

/>




<ReportCard

title="Yearly Report"

bills={year?.bills ?? 0}

sales={year?.sales ?? 0}

/>





<Text style={styles.heading}>
Lifetime Sales
</Text>


<View style={styles.card}>

<Text style={styles.bigValue}>
₹ {total?.sales ?? 0}
</Text>

</View>





<Text style={styles.heading}>
Payment Summary
</Text>



{
payments.map((item:any)=>(


<View
key={item.paymentMode}
style={styles.card}
>


<Text style={styles.label}>
{item.paymentMode}
</Text>


<Text style={styles.amount}>
₹ {item.sales}
</Text>


</View>


))
}






<Text style={styles.heading}>
Top Products
</Text>



{
topProducts.map((item:any)=>(


<View

key={item.name}

style={styles.card}

>


<Text style={styles.label}>
{item.name}
</Text>


<Text style={styles.amount}>
Qty : {item.qty}
</Text>


</View>


))
}





<Pressable

style={styles.export}

onPress={exportCsv}

>


<Text style={styles.exportText}>
Export Reports CSV
</Text>


</Pressable>



</ScrollView>


  );

}





const styles = StyleSheet.create({

container:{

flex:1,

backgroundColor:"#f5f6fa",

padding:16

},


title:{

fontSize:28,

fontWeight:"800",

marginBottom:20

},


dateContainer:{

backgroundColor:"#fff",

padding:15,

borderRadius:15,

marginBottom:15,

elevation:2

},



heading:{

fontSize:20,

fontWeight:"700",

marginTop:15,

marginBottom:10

},



dateBox:{

backgroundColor:"#eee",

padding:15,

borderRadius:10,

fontSize:16

},



card:{

backgroundColor:"#fff",

padding:18,

borderRadius:15,

marginBottom:12,

flexDirection:"row",

justifyContent:"space-between",

alignItems:"center",

elevation:2

},



label:{

fontSize:17,

fontWeight:"600"

},


amount:{

fontSize:18,

fontWeight:"700"

},



bigValue:{

fontSize:28,

fontWeight:"800"

},



export:{

backgroundColor:"#111",

padding:16,

borderRadius:15,

alignItems:"center",

marginTop:20,

marginBottom:30

},



exportText:{

color:"#fff",

fontSize:17,

fontWeight:"700"

}


});