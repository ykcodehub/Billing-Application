import { Pressable, Text, StyleSheet } from "react-native";

export default function MenuCard({ title, onPress }: any) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({

card:{
backgroundColor:"#fff",
padding:20,
borderRadius:12,
marginBottom:15,
elevation:2
},

text:{
fontSize:18,
fontWeight:"600"
}

});