import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { wp, hp, rf, isTablet } from "../../utils/responsive";

interface Props {
  title: string;
  subtitle?: string;
}

export default function AppHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: hp(20),
  },

  subtitle: {
    color: "#777",
    fontSize: rf(14),
  },

  title: {
    fontSize: isTablet ? rf(34) : rf(28),
    fontWeight: "700",
    color: Colors.text,
    marginTop: hp(2),
  },

});