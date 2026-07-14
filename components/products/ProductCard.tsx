import {
  Alert,
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductCard({
  item,
  onPress,
  onDelete,
}: any) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const confirmDelete = () => {
    Alert.alert(
      "Delete Product",
      `Delete "${item.name}" ?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <SafeAreaView edges={["left", "right"]}>
      <Pressable
        style={[
          styles.card,
          isTablet && styles.cardTablet,
        ]}
        onPress={onPress}
        onLongPress={confirmDelete}
      >
        <View style={styles.row}>
          {item.image !== "" && (
            <Image
              source={{ uri: item.image }}
              style={[
                styles.image,
                isTablet && styles.imageTablet,
              ]}
            />
          )}

          <View style={styles.content}>
            <Text
              style={[
                styles.name,
                isTablet && styles.nameTablet,
              ]}
            >
              {item.name}
            </Text>

            <Text
              style={[
                styles.price,
                isTablet && styles.priceTablet,
              ]}
            >
              ₹ {item.price}
            </Text>

            <Text
              style={[
                styles.stock,
                isTablet && styles.stockTablet,
              ]}
            >
              Stock : {item.stock}
            </Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },

  cardTablet: {
    padding: 22,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },

  imageTablet: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 20,
  },

  content: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  nameTablet: {
    fontSize: 22,
  },

  price: {
    fontSize: 16,
    marginTop: 5,
  },

  priceTablet: {
    fontSize: 19,
  },

  stock: {
    color: "#777",
    marginTop: 4,
  },

  stockTablet: {
    fontSize: 17,
  },
});