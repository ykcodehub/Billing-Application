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
  value?: string;
  subtitle?: string;
  onPress?: () => void;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>

      {value && <Text style={styles.value}>{value}</Text>}

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: Colors.white,
    borderRadius: rr(18),
    padding: wp(18),
    elevation: 2,
    marginBottom: hp(15),
    minHeight: isTablet ? hp(140) : hp(120),
    justifyContent: "center",
  },

  title: {
    fontSize: rf(14),
    color: "#666",
  },

  value: {
    fontSize: isTablet ? rf(34) : rf(28),
    fontWeight: "700",
    marginTop: hp(10),
    color: Colors.black,
  },

  subtitle: {
    marginTop: hp(5),
    color: "#888",
    fontSize: rf(14),
  },

});