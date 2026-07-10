import { Pressable, View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

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
    borderRadius: 18,
    padding: 18,
    margin: 8,
    elevation: 2,
    justifyContent: "space-between",
    height: 150,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },
});