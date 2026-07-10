import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FloatingButton({ onPress }: any) {

  return (

    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Ionicons
        name="add"
        size={28}
        color="#fff"
      />
    </Pressable>

  );
}

const styles=StyleSheet.create({

button:{
position:"absolute",
right:20,
bottom:25,
width:60,
height:60,
borderRadius:30,
backgroundColor:"#111",
justifyContent:"center",
alignItems:"center",
elevation:6
}

});