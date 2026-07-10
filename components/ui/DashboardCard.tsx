import { Pressable, Text, StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

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
    borderRadius: 18,
    padding: 18,
    elevation: 2,
    marginBottom: 15,
  },

  title: {
    fontSize: 14,
    color: "#666",
  },

  value: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
    color: Colors.black,
  },

  subtitle: {
    marginTop: 5,
    color: "#888",
  },
});