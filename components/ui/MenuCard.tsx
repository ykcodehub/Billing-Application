import { Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

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
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    margin: 6,
  },

  title: {
    fontWeight: "600",
    fontSize: 17,
  },
});