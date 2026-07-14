import { Pressable, Text, StyleSheet } from "react-native";
import { wp, hp, rf, rr, isTablet } from "../../utils/responsive";

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
padding:wp(20),
borderRadius:rr(12),
marginBottom:hp(15),
elevation:2,
minHeight:isTablet ? hp(70) : hp(60),
justifyContent:"center"
},

text:{
fontSize:isTablet ? rf(22) : rf(18),
fontWeight:"600"
}

});