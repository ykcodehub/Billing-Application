import { View, Text, StyleSheet } from "react-native";

export default function ReportCard({
  title,
  bills,
  sales,
}: any) {

  return (

    <View style={styles.card}>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text>
        Bills : {bills}
      </Text>

      <Text>
        Sales : ₹ {sales}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

card:{
backgroundColor:"#fff",
padding:18,
borderRadius:12,
marginBottom:15,
elevation:2
},

title:{
fontWeight:"700",
fontSize:18,
marginBottom:8
}

});