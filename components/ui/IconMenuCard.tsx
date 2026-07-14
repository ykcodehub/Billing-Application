import {
  Pressable,
  View,
  Text,
  StyleSheet,
} from "react-native";

import Colors from "../../constants/colors";

import {
  wp,
  hp,
  rf,
  rr,
  isTablet,
} from "../../utils/responsive";

export default function IconMenuCard({
  title,
  icon,
  color,
  onPress,
}: any) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        {icon}
      </View>

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: rr(18),
    padding: wp(18),
    margin: wp(8),
    elevation: 2,
    justifyContent: "space-between",
    height: isTablet ? hp(190) : hp(150),
  },

  iconBox: {
    width: isTablet ? wp(60) : wp(52),
    height: isTablet ? wp(60) : wp(52),
    borderRadius: rr(12),
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: isTablet ? rf(24) : rf(20),
    fontWeight: "700",
    color: Colors.text,
  },

});