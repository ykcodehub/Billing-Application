import {
  Pressable,
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

interface Props {
  title: string;
  onPress?: () => void;
}

export default function MenuCard({
  title,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    flex: 1,
    height: isTablet ? hp(150) : hp(120),
    backgroundColor: Colors.white,
    borderRadius: rr(18),
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    margin: wp(6),
    paddingHorizontal: wp(12),
  },

  title: {
    fontWeight: "600",
    fontSize: isTablet ? rf(20) : rf(17),
    textAlign: "center",
  },

});